import { GetUsers } from "lib/settings/users"
import { useApp } from "providers/AppProvider"
import { useEffect, useState } from "react"

export const useHookUsers = () => {
    const {setLoading} = useApp()
    const [users, setUsers] = useState<any[]>([])

    const getUsers = async () => {
        setLoading(true)
        const data = await GetUsers()

        if (data)
            setUsers(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return {
        users, setUsers, getUsers
    }
}
