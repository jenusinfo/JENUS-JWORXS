import http from "services/http-common"

export const GetDocumentCabinets = async () => {
    const res = await http.get(`/Org/DocumentDefinitions`)

    if (res?.status)
        return res.data
}