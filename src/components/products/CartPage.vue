<script setup lang="ts">
import UserHeader from '@/layouts/UserHeader.vue'
import { ref, computed } from 'vue'

const quantity = ref(1)
const price = 350
const discount = 0.4
const shipping = 6

const subtotal = computed(() => price * quantity.value - discount)
const total = computed(() => subtotal.value + shipping)

const increase = () => quantity.value++
const decrease = () => quantity.value > 1 && quantity.value--
</script>

<template>
  <user-header />
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Title -->
    <h1 class="text-2xl font-semibold mb-6">Your cart</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT: Cart Item -->
      <div class="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Image -->
          <div class="w-full sm:w-32 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Details -->
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <h2 class="font-medium text-gray-900">Short Straight Blazer</h2>
              <p class="text-xl font-semibold">${{ price.toFixed(2) }}</p>
            </div>

            <!-- Options -->
            <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <span>Size</span>
                <span class="border rounded-full px-3 py-0.5 text-sm">36</span>
              </div>

              <div class="flex items-center gap-2">
                <span>Select Color</span>
                <span class="w-4 h-4 rounded-full bg-gray-300 border"></span>
              </div>
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-4 mt-4">
              <span class="text-sm text-gray-600">Quantity</span>

              <div class="flex items-center border rounded-full">
                <button @click="decrease" class="w-9 h-9 flex items-center justify-center">
                  <v-icon icon="mdi-minus" size="18" />
                </button>

                <span class="w-8 text-center text-sm">
                  {{ quantity }}
                </span>

                <button @click="increase" class="w-9 h-9 flex items-center justify-center">
                  <v-icon icon="mdi-plus" size="18" />
                </button>
              </div>

              <button class="text-sm text-gray-500 underline">Edit</button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Summary -->
      <div class="bg-white rounded-xl p-5 shadow-sm h-fit">
        <h3 class="font-medium mb-4">How you'll pay</h3>

        <!-- Payment methods -->
        <div class="space-y-3 mb-6">
          <label class="flex items-center gap-3 text-sm">
            <input type="radio" checked />
            <span class="flex gap-2"> Bank Transfer </span>
          </label>

          <label class="flex items-center gap-3 text-sm">
            <input type="radio" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-4" />
          </label>
        </div>

        <!-- Totals -->
        <div class="space-y-2 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>Item(s) total</span>
            <span>${{ price.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shop discount</span>
            <span>- ${{ discount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-medium text-gray-900">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>
        </div>

        <hr class="my-4" />

        <div class="flex justify-between font-semibold text-gray-900 mb-4">
          <span>Total (1 item)</span>
          <span>${{ total.toFixed(2) }}</span>
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
</template>
