import http from "services/http-common"

export const GetParameters = async () => {
    const res = await http.get(`/Org/GlobalParams/All`)

    if (res?.status)
        return res.data
}