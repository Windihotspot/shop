<script setup lang="ts">
const products = [
  {
    id: 1,
    name: 'Urban Classic Hoodie',
    price: 45.0,
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38',
    rating: 5,
    isNew: true
  },
  {
    id: 2,
    name: 'Premium Denim Jacket',
    price: 82.0,
    image: 'https://images.unsplash.com/photo-1542060748-10c28b62716f',
    rating: 5,
    isNew: true
  },
  {
    id: 3,
    name: 'Essential Cotton T-Shirt',
    price: 25.0,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
    rating: 4,
    isNew: true
  },
  {
    id: 4,
    name: 'Slim Fit Cargo Pants',
    price: 55.0,
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0',
    rating: 5,
    isNew: true
  }
]
</script>

<template>
  <section class="max-w-7xl py-4 px-6 mx-auto justify-center rounded-xl">
    <!-- Section title -->
    <h2 class="text-lg font-semibold mt-4 mb-6">Available Products</h2>

    <!-- Product grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-[#e8eef0] rounded-xl p-4 relative group"
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
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center text-gray-300 hover:text-red-500"
        >
          <v-icon icon="mdi-heart-outline" size="18" />
        </button>

        <!-- Image -->
        <div class="flex justify-center mt-6 mb-4">
          <img :src="product.image" :alt="product.name" class="h-36 object-contain" />
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
       

          <v-btn to="cart" size="small" color="red" class="text-white normal-case custom-btn" elevation="0">
            Add to cart
          </v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v-btn{
    text-transform: none;
}
</style>
