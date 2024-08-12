import http from "services/http-common"

export const GetSearchApplications = async () => {
    const res = await http.get(`/dm/rest/v1/applications/document-search`)

    if (res?.status)
        return res.data
}

export const GetAssociatedImport = async () => {
    const res = await http.get(`/dm/rest/v1/applications/document-import-v2`)

    if (res?.status)
        return res.data
}