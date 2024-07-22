import http from "services/http-common"

export const LogInUser = async (username: string, password: string) => {
    const res = await http.post(`/Org/Account/Login`, {
        "grant_type": "password",
        "username": username,
        "password": password
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
    })

    if (res)
        return res.data
}