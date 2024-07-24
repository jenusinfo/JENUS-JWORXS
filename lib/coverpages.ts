import http from "services/http-common"

export const GetCoverPages = async () => {
    const res = await http.get(`/BoxCoverPage`)

    if (res?.status)
        return res.data
}