import http from "services/http-common"

export const GetRoles = async () => {
    const res = await http.get(`/Org/Roles`)

    if (res?.status)
        return res.data
}