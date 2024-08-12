import http from "services/http-common"

export const CreateTarget = async (params: any) => {
    const res = await http.post(`/Org/Targets`, params)

    if (res?.status)
        return res?.data
}

export const GetTargets = async () => {
    const res = await http.get(`/Org/Targets`)

    if (res?.status)
        return res.data
}

export const UpdateTarget = async (id: any, params: any) => {
    const res = await http.put(`/Org/Targets/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteTarget = async (id: any) => {
    const res = await http.delete(`/Org/Targets/${id}`)

    if (res?.status)
        return res?.data
}