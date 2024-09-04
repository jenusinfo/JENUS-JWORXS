import http from "services/http-common"

export const CreateEvent = async (params: any) => {
    const res = await http.post(`/Events`, params)

    if (res?.status)
        return res?.data
}

export const GetEvents = async () => {
    const res = await http.get(`/Events`)

    if (res?.status)
        return res.data
}

export const GetEventServices = async (id: any) => {
    const res = await http.get(`/Events/${id}/services`)

    if (res?.status)
        return res.data
}

export const GetEventAttributes = async (id: any) => {
    const res = await http.get(`/Events/${id}/Attributes`)

    if (res?.status)
        return res.data
}
export const UpdateEvent = async (id: any, params: any) => {
    const res = await http.put(`/Events/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteEvent = async (id: any) => {
    const res = await http.delete(`/Events/${id}`)

    if (res?.status)
        return res?.data
}

// Evnets Services Mappings
export const GetEventServiceMapping = async (id: any) => {
    const res = await http.get(`/Events/Services/InterviewMappings/${id}`)

    if (res?.status)
        return res.data
}

export const CreateEventServiceMapping = async (params: any) => {
    const res = await http.post(`/Events/Services/Mappings`, params)

    if (res?.status)
        return res.data
}

export const UpdateEventServiceMapping = async (id: any, params: any) => {
    const res = await http.put(`/Events/Services/Mappings/${id}`, params)

    if (res?.status)
        return res.data
}

export const DeleteEventServiceMapping = async (id: any) => {
    const res = await http.delete(`/Events/Services/Mappings/${id}`)

    if (res?.status)
        return res?.data
}

//Events Services Mapping