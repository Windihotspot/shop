<script setup lang="ts">
import UserHeader from '@/layouts/UserHeader.vue'
import AppFooter from '@/layouts/AppFooter.vue'
import { ref, computed, onMounted } from 'vue'

import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

onMounted(() => cart.load())

const shipping = 6
const subtotal = computed(() => cart.subtotal)
const total = computed(() => subtotal.value + shipping)

const quantity = ref(1)
const price = 350
const discount = 0.4

const increase = () => quantity.value++
const decrease = () => quantity.value > 1 && quantity.value--
</script>

<template>
  <div class="bg-gradient-to-r from-red-100 via-red-200 to-red-100">
    <user-header />
    <section class="max-w-7xl mx-auto px-4 py-8">
      <!-- Title -->
      <h1 class="text-xl font-semibold m-4">Your cart</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- LEFT: Cart Item -->
        <div class="lg:col-span-2 rounded-xl p-5 shadow-sm">
          <div v-for="item in cart.items" :key="item.id" class="flex gap-4 py-4">
  <img :src="item.image" class="w-32 h-40 object-cover rounded" />

  <div class="flex-1">
    <h2 class="font-medium">{{ item.name }}</h2>
    <p class="font-semibold">£{{ (item.price * item.quantity).toFixed(2) }}</p>

    <div class="flex items-center gap-3 mt-3">
      <button @click="cart.updateQuantity(item.id, item.quantity - 1)">−</button>
      <span>{{ item.quantity }}</span>
      <button @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>

      <button class="text-red-500" @click="cart.remove(item.id)">
        Remove
      </button>
    </div>
  </div>
</div>
        </div>

        <!-- RIGHT: Summary -->
        <div class="rounded-xl p-5 shadow-sm h-fit">
          <h3 class="font-medium mb-4">How you'll pay</h3>

          <!-- Payment methods -->
          <div class="space-y-3 mb-6">
            <label class="flex items-center gap-3 text-sm">
              <input type="radio" checked />
              <span class="flex gap-2"> Bank Transfer </span>
            </label>

            <label class="flex items-center gap-3 text-sm">
              <input type="radio" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                class="h-4"
              />
            </label>
          </div>

          <!-- Totals -->
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex justify-between">
              <span>Item(s) total</span>
              <span>£{{ price.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shop discount</span>
              <span>- £{{ discount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-medium text-gray-900">
              <span>Subtotal</span>
              <span>£{{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>£{{ shipping.toFixed(2) }}</span>
            </div>
          </div>

          <hr class="my-4" />

          <div class="flex justify-between font-semibold text-gray-900 mb-4">
            <span>Total (1 item)</span>
            <span>£{{ total.toFixed(2) }}</span>
          </div>

          <!-- CTA -->
          <button
            class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-full flex items-center justify-center gap-2"
          >
            Process to Check Out
            <v-icon icon="mdi-arrow-right" size="18" />
          </button>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
