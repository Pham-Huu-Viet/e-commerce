import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isUserMenuOpen: false,
  notification: null,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    toggleUserMenu: (state) => {
      state.isUserMenuOpen = !state.isUserMenuOpen
    },
    closeAllMenus: (state) => {
      state.isSearchOpen = false
      state.isMobileMenuOpen = false
      state.isUserMenuOpen = false
    },
    showNotification: (state, action) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        id: new Date().getTime(),
      }
    },
    clearNotification: (state) => {
      state.notification = null
    },
  },
})

export const { toggleSearch, toggleMobileMenu, toggleUserMenu, closeAllMenus, showNotification, clearNotification } =
  uiSlice.actions

export default uiSlice.reducer

