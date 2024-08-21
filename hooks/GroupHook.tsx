import { useEffect, useState } from "react"
import { GetGroups } from "lib/group"
import { IGroup } from "types/dashboard"

export const useHookGroup = () => {
    const [groups, setGroups] = useState<IGroup[]>([])

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
