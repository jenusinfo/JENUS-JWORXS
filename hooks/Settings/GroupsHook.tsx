import { GetGroups } from "lib/settings/groups"
import { useEffect, useState } from "react"

export const useHookGroups = () => {
    const [groups, setGroups] = useState<any[]>([])

    const getGroups = async () => {
        const data = await GetGroups()

        if (data)
            setGroups(data.Data)
    }

    useEffect(() => {
        getGroups()
    }, [])

    return {
        groups, setGroups
    }
}
