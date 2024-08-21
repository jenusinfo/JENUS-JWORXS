import http from "services/http-common"

export const CreateTaskDefinition = async (params: any) => {
    const res = await http.post(`/TaskDefinitions`, params)

    if (res?.status)
        return res?.data
}

export const GetFormDefinitions = async () => {
    const res = await http.get(`/TaskDefinitions`)

    if (res?.status)
        return res.data
}

export const GetFormDefinitionById = async (id: any) => {
    const res = await http.get(`/TaskDefinitions/FullInfo/${id}`)

    if (res?.status)
        return res.data
}

export const UpdateTaskDefinition = async (id: any, params: any) => {
    const res = await http.put(`/TaskDefinitions/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteTaskDefinition = async (id: any) => {
    const res = await http.delete(`/TaskDefinitions/${id}`)

    if (res?.status)
        return res?.data
}