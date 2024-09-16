import { GetInbox } from "lib/workitem"
import { useApp } from "providers/AppProvider"
import { useEffect, useState } from "react"
import { IInbox } from "types/dashboard"

export const useHookWorkitem = () => {
    const [inboxList, setInboxList] = useState<IInbox[]>([])
    const {loading, setLoading} = useApp()

    const getInbox = async (assignedTo?: string) => {
        setLoading(true)
        const data = await GetInbox(assignedTo)

        if (data)
            setInboxList(data.Data == null ? [] : data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getInbox()
    }, [])

    return {
        inboxList, setInboxList, getInbox
    }
}
