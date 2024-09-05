import { useHookEvents } from "hooks/Settings/EventsHook";
import { CreateInterviewSection, DeleteInterviewSection, UpdateInterviewSection } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IEvent } from "types/settings/events";

const EventItemContext: any = createContext(null)

const EventItemProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        events
	} = useHookEvents()
    const [eventItem, setEventItem] = useState<IEvent>()

	useEffect(() => {
		if (id && events) {
            let temp = events.filter((each: IEvent) => each.Id == Number(id))[0]
            setEventItem(temp)
		}
	}, [id, events])

	const value = useMemo(
		() => ({
            eventItem
		}),
		[
            eventItem
		]
	)

	return <EventItemContext.Provider value={value}>{children}</EventItemContext.Provider>
}

export const useEventItem = () => {
	const context: any = useContext(EventItemContext)
	if (!context) {
		throw new Error("useEventItem must be used within EventItemProvider")
	}
	return context
}

export default EventItemProvider