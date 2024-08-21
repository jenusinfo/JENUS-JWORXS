import http from "services/http-common"

export const CreateEvent = async (params: any) => {
    const res = await http.post(`/Events`, params)

    if (res?.status)
        return res?.data
}

export const GetEvents = async () => {
    const res = await http.get(`/Events`)

    if (res?.status)
        return res.data
}

export const UpdateEvent = async (id: any, params: any) => {
    const res = await http.put(`/Events/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteEvent = async (id: any) => {
    const res = await http.delete(`/Events/${id}`)

    if (res?.status)
        return res?.data
}