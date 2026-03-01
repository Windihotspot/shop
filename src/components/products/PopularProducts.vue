<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase' // adjust path if needed
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

type Product = {
  id: string
  name: string
  price: number
  image: string
  rating: number
  isNew: boolean
}

const products = ref<Product[]>([])
const loading = ref(false)

const fetchProducts = async () => {
  loading.value = true

  const { data, error } = await supabase
    .from('products')
    .select(
      `
      id,
      name,
      price,
      created_at,
      product_images (
        image_url,
        is_primary
      )
    `
    )
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch products:', error)
    loading.value = false
    return
  }

  products.value = data.map((product) => {
    const primaryImage =
      product.product_images?.find((img: any) => img.is_primary)?.image_url ||
      'https://via.placeholder.com/300x300?text=No+Image'

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: primaryImage,
      rating: 5, // static for now (can come from reviews later)
      isNew: true // or based on created_at
    }
  })

  loading.value = false
}

const addToCart = (product: Product) => {
  cart.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  })

  router.push('/cart')
}
onMounted(fetchProducts)
</script>

<template>
  <section class="max-w-7xl py-4 px-6 mx-auto justify-center rounded-xl">
    <!-- Section title -->
    <h2 class="text-lg font-semibold mt-4 mb-6">Available Products</h2>

    <div v-if="loading" class="flex flex-col items-center justify-center py-10 space-y-3">
          <v-progress-circular indeterminate color="red" size="12" width="2" />
          <span class="text-sm text-gray-500">Loading products</span>
        </div>

    <!-- Product grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
      
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-xl p-4 relative group"
      >
        <!-- New badge -->
        <span
          v-if="product.isNew"
          class="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-0.5 rounded-md"
        >
          New
        </span>

        <!-- Wishlist -->
        <button
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:text-red-500"
        >
          <v-icon icon="mdi-heart-outline" size="18" />
        </button>

        <!-- Image -->
        <div class="flex justify-center mt-6 mb-4">
          <img src="" alt="product.name" class="h-36 object-contain" />
        </div>

        <!-- Product name -->
        <h3 class="text-sm font-normal mb-1 truncate">
          {{ product.name }}
        </h3>

        <!-- Price -->
        <p class="font-semibold text-sm mb-2">£{{ product.price.toFixed(2) }}</p>

        <!-- Rating -->
        <div class="flex items-center justify-between">
          <div>
            <v-icon
              v-for="i in 5"
              :key="i"
              icon="mdi-star"
              size="24"
              :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-600'"
            />
          </div>

          <v-btn
              @click="addToCart(product)"
            size="small"
            color="red"
            class="text-white normal-case custom-btn"
            elevation="0"
          >
            Add to cart
          </v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
