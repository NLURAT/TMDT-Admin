import axiosInstance from './axiosInstance'

const userApi = {

    getAllUser: () => {
        return axiosInstance.get(`/users/all`)
    },

    deleteUser: (userId) => {
        return axiosInstance.delete(`/users/${userId}`)
    },

}
export default userApi;