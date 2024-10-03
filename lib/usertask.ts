import http from "services/http-common"

export const CreateUserTask = async (params: any) => {
    let fn = new FormData()
    fn.append("payload", JSON.stringify(params));

    let config = {
        headers: {
            //"DM-API-KEY": DM_API_KEY,
            "Content-Type": "multipart/form-data"
        },
    };

    const res = await http.post(`/UserTasks`, fn, config)

    return res
}

export const UpdateUserTask = async (id: any, params: any) => {
    let fn = new FormData()
    fn.append("payload", JSON.stringify(params));

    let config = {
        headers: {
            //"DM-API-KEY": DM_API_KEY,
            "Content-Type": "multipart/form-data"
        },
    };

    const res = await http.put(`/UserTasks/${id}`, fn, config)

    return res
}

export const GetCurrentUserTask = async (id: any) => {
    const res = await http.get(`/UserTasks/${id}/CurrentActivity`)

    return res
}