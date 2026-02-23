export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[]
  }),

  getters: {
    total: (state) =>
      state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  }
})