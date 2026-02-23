<script setup lang="ts">
import PopularProducts from '@/components/products/PopularProducts.vue'
import AppFooter from '@/layouts/AppFooter.vue';
import UserHeader from '@/layouts/UserHeader.vue'

</script>

<template>
  <UserHeader />

  <!-- Search -->
  <!-- <div class="m-4 relative w-full max-w-md">
    <v-text-field
      placeholder="Search for anything"
      density="compact"
      hide-details
      variant="outlined"
      class="w-64"
      color="blue"
      prepend-inner-icon="mdi-magnify text-blue"
    >
    </v-text-field>
  </div> -->
  <PopularProducts />

  <!-- Footer -->
   <AppFooter/>
</template>
