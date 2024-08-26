import http from "services/http-common"

export const CreateGroup = async (params: any) => {
    const res = await http.post(`/interviews/Forms`, params)

    if (res?.status)
        return res?.data
}

export const GetGroups = async () => {
    const res = await http.get(`/interviews/Forms`)

    if (res?.status)
        return res.data
}

export const UpdateGroup = async (id: any, params: any) => {
    const res = await http.put(`/interviews/Forms/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteGroup = async (id: any) => {
    const res = await http.delete(`/interviews/Forms/${id}`)

    if (res?.status)
        return res?.data
}