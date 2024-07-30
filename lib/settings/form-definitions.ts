import http from "services/http-common"

export const GetFormDefinitions = async () => {
    const res = await http.get(`/TaskDefinitions`)

    if (res?.status)
        return res.data
}