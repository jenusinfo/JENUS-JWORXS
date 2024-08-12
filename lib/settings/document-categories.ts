import http from "services/http-common"

export const CreateDocumentCategory = async (params: any) => {
    const res = await http.post(`/Org/DocumentDefinitions`, params)

    if (res?.status)
        return res?.data
}

export const GetDocumentCategories = async () => {
    const res = await http.get(`/Org/DocumentDefinitions`)

    if (res?.status)
        return res.data
}

export const UpdateDocumentCategory = async (id: any, params: any) => {
    const res = await http.put(`/Org/DocumentDefinitions/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteDocumentCategory = async (id: any) => {
    const res = await http.delete(`/Org/DocumentDefinitions/${id}`)

    if (res?.status)
        return res?.data
}