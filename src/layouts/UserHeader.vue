<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

// make sure cart loads on refresh
onMounted(() => {
  cart.load()
})

// reactive cart count
const cartCount = computed(() => cart.totalItems)
</script>

<template>
  <header class="w-full bg-gradient-to-r from-red-100 via-red-200 to-red-100  border-b">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- LEFT: Logo + Search -->
      <div class="flex items-center gap-6 flex-1">
        <!-- Logo -->
        <img src="../assets/annie.png" class="w-20 h-20" alt="">

        
      </div>

      <!-- RIGHT: Actions -->
      <div class="flex items-center gap-6">
        <!-- Orders -->
        <button class="flex items-center gap-2 text-sm text-gray-700 hover:text-black">
          <v-icon icon="mdi-cube-outline" size="22" />
          <span class="hidden md:inline">Orders</span>
        </button>

        <!-- Favourites -->
        <button class="flex items-center gap-2 text-sm text-gray-700 hover:text-black">
          <v-icon icon="mdi-heart-outline" size="22" />
          <span class="hidden md:inline">Favourites</span>
        </button>

        <!-- Cart -->
        <button class="relative flex items-center gap-2 text-sm text-gray-700 hover:text-black">
          <v-icon icon="mdi-cart-outline" size="22" />

          <!-- Badge -->
          <span
            v-if="cartCount > 0"
            class="absolute -top-4 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold"
          >
            {{ cartCount }}
          </span>

          <span class="hidden md:inline">Cart</span>
        </button>

        <!-- Profile -->
        <button class="ml-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            class="w-9 h-9 rounded-full object-cover"
          />
        </button>
      </div>
    </div>
  </header>
</template>
