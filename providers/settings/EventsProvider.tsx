import { useHookEvents } from "hooks/Settings/EventsHook";
import { createContext, useContext, useMemo, useState } from "react";

const EventsContext: any = createContext(null)

export interface ISettingUser {
}

const EventsProvider = ({ children }: any) => {

    const WIDTH = ["4%", "3%", "27%", "27%", "13%", "15%", "11%"]
    const Headers = ["", "", "EVENT SERVICES", "DESCRIPTION", "STATUS", "MODIFIED BY", "MODIFIED ON"]
    const { events } = useHookEvents()
    const [curPageNumber, setCurPageNumber] = useState(1)

    const value = useMemo(
        () => ({
            events,
            curPageNumber,
            setCurPageNumber,
            WIDTH,
            Headers
        }),
        [
            events,
            curPageNumber,
            setCurPageNumber,
            WIDTH,
            Headers
        ]
    )

    return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export const useEvents = () => {
    const context: any = useContext(EventsContext)
    if (!context) {
        throw new Error("useEvents must be used within EventsProvider")
    }
    return context
}

export default EventsProvider