import http from "services/http-common"

export const CreateParameter = async (params: any) => {
    const res = await http.post(`/Org/GlobalParams`, params)

    if (res?.status)
        return res?.data
}

export const GetParameters = async () => {
    const res = await http.get(`/Org/GlobalParams/All`)

    if (res?.status)
        return res.data
}

export const UpdateParameter = async (id: any, params: any) => {
    const res = await http.put(`/Org/GlobalParams/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteParameter = async (id: any) => {
    const res = await http.delete(`/Org/GlobalParams/${id}`)

    if (res?.status)
        return res?.data
}