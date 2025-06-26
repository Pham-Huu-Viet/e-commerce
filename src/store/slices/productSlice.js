import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,
  currentProduct: null,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchFeaturedProductsSuccess: (state, action) => {
      state.featuredProducts = action.payload
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload
    },
    fetchProductByIdStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductByIdSuccess: (state, action) => {
      state.loading = false
      state.currentProduct = action.payload
    },
    fetchProductByIdFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchFeaturedProductsSuccess,
  fetchCategoriesSuccess,
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} = productSlice.actions

export default productSlice.reducer

