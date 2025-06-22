import { data } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const cartApi = {
    addToCart: (data) => {
        return axiosInstance.post(`/cart/add-item`, data)
    },

    removeCartItem: (productId) => {
        return axiosInstance.delete(`/cart/delete-item/${productId}`)
    },

    clearCart: () => {
        return axiosInstance.delete('/cart/clear');
    },

    getCart: () => {
        return axiosInstance.get(`/cart`)
    },

    updateItemQuantity: (data) => {
        return axiosInstance.put(`/cart/update-item`, data)
    },
}
export default cartApi;