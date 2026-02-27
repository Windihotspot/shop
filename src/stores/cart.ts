import { defineStore } from 'pinia'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, i) => sum + i.quantity, 0),

    subtotal: (state) =>
      state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find(i => i.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    load() {
      const saved = localStorage.getItem('cart')
      if (saved) this.items = JSON.parse(saved)
    },

    updateQuantity(id: string, qty: number) {
      const item = this.items.find(i => i.id === id)
      if (!item) return
      item.quantity = Math.max(1, qty)
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    remove(id: string) {
      this.items = this.items.filter(i => i.id !== id)
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  }
})