import http from "services/http-common"

export const GetHashTags = async () => {
    const res = await http.get(`/HashTags`)

    if (res?.status)
        return res.data
}