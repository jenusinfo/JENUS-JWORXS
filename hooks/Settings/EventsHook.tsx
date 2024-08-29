import { GetEvents } from "lib/settings/events"
import { useApp } from "providers/AppProvider"
import { useEffect, useState } from "react"
import { IEvent } from "types/settings/events"

export const useHookEvents = () => {
    const {setLoading} = useApp()
    const [events, setEvents] = useState<IEvent[]>([])

    const getEvents = async () => {
        setLoading(true)
        const data = await GetEvents()

        if (data)
            setEvents(data.Data)
        setLoading(false)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return {
        events, setEvents, getEvents
    }
}
