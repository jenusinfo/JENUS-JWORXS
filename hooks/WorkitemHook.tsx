import { GetInbox } from "lib/workitem"
import { useEffect, useState } from "react"
import { IInbox } from "types/dashboard"

export const useHookWorkitem = () => {
    const [inboxList, setInboxList] = useState<IInbox[]>([])

    const getInbox = async () => {
        const data = await GetInbox()

        if (data)
            setInboxList(data.Data)
    }

    useEffect(() => {
        getInbox()
    }, [])

    return {
        inboxList, setInboxList
    }
}
