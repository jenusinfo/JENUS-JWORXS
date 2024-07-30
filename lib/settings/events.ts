import http from "services/http-common"

export const GetEvents = async () => {
    const res = await http.get(`/Events`)

    if (res?.status)
        return res.data
}