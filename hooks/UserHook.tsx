import { GetUsers } from "lib/users"
import { useEffect, useState } from "react"

export const useHookUser = () => {
    const [users, setUsers] = useState<any[]>([])

    const getUsers = async () => {
        const data = await GetUsers()

        if (data)
            setUsers(data.Data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return {
        users, setUsers
    }
}
