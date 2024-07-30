import http from "services/http-common"

export const GetAuditLogs = async () => {
    const res = await http.get(`/AuditLogs`)

    if (res?.status)
        return res.data
}