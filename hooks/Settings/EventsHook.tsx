import { GetEvents } from "lib/settings/events"
import { useEffect, useState } from "react"
import { IEvent } from "types/settings/events"

export const useHookEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([])

    const getEvents = async () => {
        const data = await GetEvents()

        if (data)
            setEvents(data.Data)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return {
        events, setEvents
    }
}
