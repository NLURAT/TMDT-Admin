import axiosInstance from "./axiosInstance";

const voucherApi = {

    getVoucher: (code) => {
        return axiosInstance.get(`vouchers/find/${code}`)
    }
}
export default voucherApi;