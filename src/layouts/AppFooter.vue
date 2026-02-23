<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[#eef3f3] rounded-t-2xl mt-20">
    <div
      class="max-w-7xl mx-auto px-6 py-10
             grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
    >

      <!-- LEFT -->
      <div>
        <h3 class="font-semibold text-gray-900 mb-3">
          Help & information
        </h3>

        <ul class="space-y-2 text-sm text-gray-600">
          <li class="hover:text-gray-900 cursor-pointer">Help</li>
          <li class="hover:text-gray-900 cursor-pointer">Track order</li>
          <li class="hover:text-gray-900 cursor-pointer">Delivery & Return</li>
        </ul>

        <p class="text-xs text-gray-500 mt-6">
          Copyright © {{ year }}
        </p>
      </div>

      <!-- CENTER -->
      <div class="flex flex-col items-center text-center">
        <!-- Logo -->
        <div class="flex items-center gap-2 mb-4">
          <!-- <v-icon icon="mdi-leaf" size="26" class="text-teal-700" /> -->
          <span class="text-xl font-semibold text-gray-900">
            Shop
          </span>
        </div>

        <!-- Socials -->
        <div class="flex gap-4">
          <button class="text-teal-700 hover:text-teal-900">
            <v-icon icon="mdi-facebook" size="22" />
          </button>
          <button class="text-teal-700 hover:text-teal-900">
            <v-icon icon="mdi-youtube" size="22" />
          </button>
          <button class="text-teal-700 hover:text-teal-900">
            <v-icon icon="mdi-instagram" size="22" />
          </button>
          <button class="text-teal-700 hover:text-teal-900">
            <v-icon icon="mdi-linkedin" size="22" />
          </button>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="md:text-right">
        <h3 class="font-semibold text-gray-900 mb-3">
          More details
        </h3>

        <ul class="space-y-2 text-sm text-gray-600">
          <li class="hover:text-gray-900 cursor-pointer">About us</li>
          <li class="hover:text-gray-900 cursor-pointer">Career</li>
          <li class="hover:text-gray-900 cursor-pointer">Our Business</li>
        </ul>

        <p class="text-xs text-gray-500 mt-6">
          Privacy policy
        </p>
      </div>

    </div>
  </footer>
</template>