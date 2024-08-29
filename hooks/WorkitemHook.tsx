import { GetInbox } from "lib/workitem"
import { useEffect, useState } from "react"
import { IInbox } from "types/dashboard"

export const useHookWorkitem = () => {
    const [inboxList, setInboxList] = useState<IInbox[]>([])
    const [loading, setLoading] = useState(false)

    const getInbox = async () => {
        setLoading(true)
        const data = await GetInbox()

        if (data)
            setInboxList(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getInbox()
    }, [])

    return {
        inboxList, setInboxList, getInbox, loading
    }
}
