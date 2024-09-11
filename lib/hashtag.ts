import http from "services/http-common"

export const GetHashTags = async () => {
    const res = await http.get(`/HashTags`)

    if (res?.status)
        return res.data
}

export const CreateHashTag = async (info: any) => {
    const res = await http.post(`/HashTags`, info)

    if (res?.status)
        return res.data
}