import { useEffect, useState } from "react"
import { GetGroups } from "lib/group"
import { IGroup } from "types/dashboard"

export const useHookGroup = () => {
    const [loading, setLoading] = useState(false)
    const [groups, setGroups] = useState<IGroup[]>([])

    const getGroups = async () => {
        setLoading(true)
        const data = await GetGroups()

        if (data)
            setGroups(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getGroups()
    }, [])

    return {
        groups, setGroups,
        loading
    }
}
