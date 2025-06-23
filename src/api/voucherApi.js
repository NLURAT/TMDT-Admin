import axiosInstance from "./axiosInstance";

const voucherApi = {

    getAllVoucher:()=>{
        return axiosInstance.get('/vouchers')
    },

    addVoucher:(data)=>{
        return axiosInstance.post('/vouchers/create',data)
    },

    updateVoucher:(id,data)=>{
        return axiosInstance.put(`/vouchers/update/${id}`,data)
    },
    
    deleteVoucher:(id)=>{
        return axiosInstance.delete(`/vouchers/delete/${id}`)
    },

}
export default voucherApi;