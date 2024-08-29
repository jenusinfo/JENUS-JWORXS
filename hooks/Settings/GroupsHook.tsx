import { GetGroups } from "lib/settings/groups"
import { useApp } from "providers/AppProvider"
import { useEffect, useState } from "react"

export const useHookGroups = () => {
    const {setLoading} = useApp()
    const [groups, setGroups] = useState<any[]>([])

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
        groups, setGroups, getGroups
    }
}
