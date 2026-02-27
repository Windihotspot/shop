<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import UserHeader from '@/layouts/UserHeader.vue'
import AppFooter from '@/layouts/AppFooter.vue'
import { ElNotification } from 'element-plus'

type Product = {
  id: string
  name: string
}

type ProductImage = {
  id: string
  image_url: string
  is_primary: boolean
}

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)

const products = ref<Product[]>([])
const selectedProductId = ref<string | null>(null)
const images = ref<ProductImage[]>([])
const uploading = ref(false)
const loadingImages = ref(false)

/* ---------------- HELPERS ---------------- */
const getPublicUrl = (path: string) =>
  supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl

/* ---------------- FETCH PRODUCTS ---------------- */
const fetchProducts = async () => {
  const { data } = await supabase
    .from('products')
    .select('id, name')
    .order('created_at', { ascending: false })

  products.value = data || []
}

/* ---------------- FETCH IMAGES ---------------- */
const fetchImages = async () => {
  if (!selectedProductId.value) return
  loadingImages.value = true

  const { data } = await supabase
    .from('product_images')
    .select('id, image_url, is_primary')
    .eq('product_id', selectedProductId.value)
    .order('is_primary', { ascending: false })

  images.value = data || []
  loadingImages.value = false
}

/* ---------------- UPLOAD IMAGE ---------------- */
const uploadImage = async (file: File) => {
  if (!selectedProductId.value) return
  uploading.value = true

  const fileExt = file.name.split('.').pop()
  const filePath = `products/${selectedProductId.value}/${crypto.randomUUID()}.${fileExt}`

  await supabase.storage.from('product-images').upload(filePath, file)

  await supabase.from('product_images').insert({
    product_id: selectedProductId.value,
    image_url: filePath,
    is_primary: images.value.length === 0
  })

  uploading.value = false
  await fetchImages()
}

/* ---------------- SET PRIMARY ---------------- */
const setPrimary = async (id: string) => {
  if (!selectedProductId.value) return

  const res = await supabase
    .from('product_images')
    .update({ is_primary: false })
    .eq('product_id', selectedProductId.value)
    console.log("res")
  await supabase.from('product_images').update({ is_primary: true }).eq('id', id)

  await fetchImages()
}

/* ---------------- DELETE IMAGE ---------------- */
const deleteImage = async (img: ProductImage) => {
  if (!confirm('Delete image?')) return

  await supabase.storage.from('product-images').remove([img.image_url])
  await supabase.from('product_images').delete().eq('id', img.id)

  await fetchImages()
}
const onFileSelected = (files: File | File[] | null) => {
  if (!files) return

  const file = Array.isArray(files) ? files[0] : files
  if (!file) return

  if (!file.type.startsWith('image/')) {
    ElNotification({
    
      message: 'Please select an image file',
      type: 'warning'
    })
    return
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)

  console.log('[PREVIEW READY]', {
    name: file.name,
    size: file.size,
    type: file.type
  })
}

const uploadSelectedImage = async () => {
  if (!selectedProductId.value || !selectedFile.value) {
    ElNotification({
     
      message: 'Select a product and an image',
      type: 'warning'
    })
    return
  }

  uploading.value = true

  const file = selectedFile.value
  const fileExt = file.name.split('.').pop()
  const filePath = `products/${selectedProductId.value}/${crypto.randomUUID()}.${fileExt}`

  console.log('[UPLOAD START]', {
    productId: selectedProductId.value,
    filePath
  })

  try {
    // 1️⃣ Clear existing primary
    const { error: clearError } = await supabase
      .from('product_images')
      .update({ is_primary: false })
      .eq('product_id', selectedProductId.value)

    if (clearError) throw clearError

    console.log('[PRIMARY CLEARED]')

    // 2️⃣ Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    console.log('[STORAGE UPLOAD OK]')

    // 3️⃣ Insert DB record as PRIMARY
    const { error: dbError } = await supabase.from('product_images').insert({
      product_id: selectedProductId.value,
      image_url: filePath,
      is_primary: true
    })

    if (dbError) throw dbError

    console.log('[DB INSERT OK]')

    ElNotification({
    
      message: 'Image uploaded and set as primary',
      type: 'success'
    })

    // 4️⃣ Cleanup
    selectedFile.value = null
    previewUrl.value = null

    await fetchImages()
  } catch (err: any) {
    console.error('[UPLOAD ERROR]', err)

    ElNotification({
      
      message: err.message || 'Something went wrong',
      type: 'error'
    })
  } finally {
    uploading.value = false
  }
}

const cancelPreview = () => {
  selectedFile.value = null
  previewUrl.value = null

  ElNotification({
    
    message: 'Image selection cleared',
    type: 'info'
  })
}
onMounted(fetchProducts)
</script>

<template>
  <div class="bg-gradient-to-r min-h-screen from-red-100 via-red-200 to-red-100">
    <user-header />
    <div class="max-w-7xl mx-auto p-6 space-y-6">
      <!-- HEADER -->
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold">Product Image Manager</h1>
      </div>

      <!-- PRODUCT SELECT -->
      <div>
        <v-select
          color="red"
          label="Select Product"
          :items="products"
          item-title="name"
          item-value="id"
          v-model="selectedProductId"
          variant="outlined"
          density="comfortable"
          @update:modelValue="fetchImages"
        />
      </div>

      <!-- UPLOAD -->
      <!-- UPLOAD -->
<div v-if="selectedProductId" class="p-4 space-y-4">

  <!-- File input -->
  <v-file-input
    v-if="!previewUrl"
    color="red"
    label="Select Product Image"
    accept="image/*"
    prepend-icon="mdi-image-plus"
    variant="outlined"
    density="comfortable"
    @update:modelValue="onFileSelected"
  />

  <!-- PREVIEW -->
  <v-card v-if="previewUrl" elevation="1" class="pa-4 max-w-sm">
    <v-img
      :src="previewUrl"
      aspect-ratio="1"
      cover
      class="rounded mb-4"
    />

    <div class="flex justify-between gap-2">
      <v-btn
        color="red"
        variant="outlined"
        size="small"
        @click="cancelPreview"
      >
        Cancel
      </v-btn>

      <v-btn
        color="grey"
        variant="outlined"
        size="small"
        @click="cancelPreview"
      >
        Remove
      </v-btn>

      <v-btn
        color="green"
        size="small"
        :loading="uploading"
        @click="uploadSelectedImage"
      >
        Upload
      </v-btn>
    </div>
  </v-card>

</div>

      <!-- IMAGES -->
      <div v-if="selectedProductId"  class="p-4">
        <div v-if="loadingImages" class="flex flex-col items-center justify-center py-10 space-y-3">
          <v-progress-circular indeterminate color="red" size="12" width="2" />
          <span class="text-sm text-gray-500">Loading images…</span>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="img in images" :key="img.id" class="relative" elevation="1">
            <v-img :src="getPublicUrl(img.image_url)" aspect-ratio="1" cover />

            <v-chip v-if="img.is_primary" color="green" size="small" class="absolute top-2 left-2">
              Primary
            </v-chip>

            <div class="justify-between flex">
              <v-btn size="small" variant="text" color="primary" @click="setPrimary(img.id)">
                Set Primary
              </v-btn>

              <v-btn size="small" variant="text" color="red" @click="deleteImage(img)">
                Delete
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>
