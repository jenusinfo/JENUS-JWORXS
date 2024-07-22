import http from "services/http-common"

export const GetForm = async () => {
    const res = await http.get(`/Interviews/Forms`)

    if (res?.status)
        return res.data
}