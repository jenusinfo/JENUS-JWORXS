import http from "services/http-common"

export const GetUsers = async () => {
    const res = await http.get(`/Org/Users`)

    if (res?.status)
        return res.data
}