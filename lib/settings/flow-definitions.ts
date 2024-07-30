import http from "services/http-common"

export const GetFlowDefinitions = async () => {
    const res = await http.get(`/Interviews/Forms`)

    if (res?.status)
        return res.data
}