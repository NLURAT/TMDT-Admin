import axiosInstance from "./axiosInstance";

const orderApi = {
    // createOrder: (data) => {
    //     return axiosInstance.post(`/order/create`, data)
    // },
    createVNPayPayment: (orderId, amount) => {
        return axiosInstance.get(`/payment/vnpay`, {
            params: { orderId, amount }
        });
    },
    getOrderById: (orderId) => {
        return axiosInstance.get(`/order/${orderId}`)
    },

    createOrderFromCart: (data) => {
        return axiosInstance.post(`/order/from-cart`, data);
    },

    cancelOrder: (id) => {
        return axiosInstance.delete(`/order/delete/${id}`)
    },

    getOrderByUserId: (userId) => {
        return axiosInstance.get(`/order/get-order/${userId}`)
    },

    updateOrder: (orderId, data) => {
        return axiosInstance.put(`/order/update/${orderId}`, data)
    },

    getAllOrder: () => {
        return axiosInstance.get(`/order/all`)
    },

    bestSellingProduct: (date) => {
        return axiosInstance.get(`order/week-best-selling/${date}`)
    },

    weekTotalOrder: (date) => {
        return axiosInstance.get(`order/week-total/${date}`)
    },

    weekTotalRevenue: (date) => {
        return axiosInstance.get(`order/week-sale/${date}`)
    },

    weekCancelledOrder: (date) => {
        return axiosInstance.get(`order/week-cancelled/${date}`)
    },

    getWeeklySales: (date) => {
        return axiosInstance.get(`order/revenue/weekly/${date}`)
    },

    getMonthlySales: (date) => {
        return axiosInstance.get(`order/revenue/monthly/${date}`)
    },

    getYearlySales: (date) => {
        return axiosInstance.get(`order/revenue/yearly/${date}`)
    },




}
export default orderApi;