import http from "services/http-common"

export const GetTargets = async () => {
    const res = await http.get(`/Org/Targets`)

    if (res?.status)
        return res.data
}