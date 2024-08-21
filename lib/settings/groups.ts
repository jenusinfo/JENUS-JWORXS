import http from "services/http-common"

export const CreateGroup = async (params: any) => {
    const res = await http.post(`/Org/Groups`, params)

    if (res?.status)
        return res?.data
}

export const GetGroups = async () => {
    const res = await http.get(`/Org/Groups`)

    if (res?.status)
        return res.data
}

export const UpdateGroup = async (id: any, params: any) => {
    const res = await http.put(`/Org/Groups/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteGroup = async (id: any) => {
    const res = await http.delete(`/Org/Groups/${id}`)

    if (res?.status)
        return res?.data
}