import { GetGroupItemsById } from "lib/group"
import { useEffect, useState } from "react"
import { IGroupItem } from "types/dashboard"

export const useGroupItemHook = (id: number) => {

    const [groupItems, setGroupItems] = useState<Array<IGroupItem>>([])

    const getGroupItemsById = async (id: number) => {
        const data = await GetGroupItemsById(id)

        setGroupItems([data.Data])
    }

    useEffect(() => {
        getGroupItemsById(id)
    }, [])

    return {
        groupItems,
        setGroupItems
    }
}