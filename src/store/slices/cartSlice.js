import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  promoCode: null,
  discount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...newItem, quantity: 1 })
      }

      state.totalQuantity += 1
      state.totalAmount += newItem.price
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= existingItem.price * existingItem.quantity
        state.items = state.items.filter((item) => item.id !== id)
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)

      if (item) {
        const quantityDifference = quantity - item.quantity
        item.quantity = quantity
        state.totalQuantity += quantityDifference
        state.totalAmount += quantityDifference * item.price
      }
    },
    applyPromoCode: (state, action) => {
      const { code, discountPercentage } = action.payload
      state.promoCode = code
      state.discount = (state.totalAmount * discountPercentage) / 100
    },
    clearPromoCode: (state) => {
      state.promoCode = null
      state.discount = 0
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
      state.promoCode = null
      state.discount = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, applyPromoCode, clearPromoCode, clearCart } =
  cartSlice.actions

export default cartSlice.reducer

