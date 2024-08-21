import { useEffect, useState } from "react"
import { GetRoles } from "lib/roles"

export const useHookRole = () => {
    const [roles, setRoles] = useState<any[]>([])

    const getRoles = async () => {
        const data = await GetRoles()

        if (data)
            setRoles(data.Data)
    }

    useEffect(() => {
        getRoles()
    }, [])

    return {
        roles, setRoles
    }
}
