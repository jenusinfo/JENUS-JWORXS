import http from "services/http-common"

export const CreateUser = async (params: any) => {
    const res = await http.post(`/Org/Users`, params)

    if (res?.status)
        return res?.data
}

export const GetUsers = async () => {
    const res = await http.get(`/Org/Users`)

    if (res?.status)
        return res.data
}

export const UpdateUser = async (id: any, params: any) => {
    const res = await http.put(`/Org/Users/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteUser = async (id: any) => {
    const res = await http.delete(`/Org/Users/${id}`)

    if (res?.status)
        return res?.data
}