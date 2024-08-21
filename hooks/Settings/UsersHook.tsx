import { GetUsers } from "lib/settings/users"
import { useEffect, useState } from "react"

export const useHookUsers = () => {
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
