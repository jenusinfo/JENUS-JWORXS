import http from "services/http-common"

export const CreateFlowDefinition = async (params: any) => {
    const res = await http.post(`/Interviews/Forms`, params)

    if (res?.status)
        return res?.data
}

export const GetFlowDefinitions = async () => {
    const res = await http.get(`/Interviews/Forms`)

    if (res?.status)
        return res.data
}

export const UpdateFlowDefinition = async (id: any, params: any) => {
    const res = await http.put(`/Interviews/Forms/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteFlowDefinition = async (id: any) => {
    const res = await http.delete(`/Interviews/Forms/${id}`)

    if (res?.status)
        return res?.data
}