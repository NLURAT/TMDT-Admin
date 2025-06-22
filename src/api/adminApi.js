import axiosInstance from "./axiosInstance";

const adminApi = {

    getAllVoucher:()=>{
        return axiosInstance.get('/vouchers/all')
    },

    addVoucher:(data)=>{
        return axiosInstance.post('/vouchers/add',data)
    },

    updateVoucher:(id,data)=>{
        return axiosInstance.put(`/vouchers/update/${id}`,data)
    },
    
    deleteVoucher:(id)=>{
        return axiosInstance.delete(`/vouchers/delete/${id}`)
    },

}
export default adminApi;