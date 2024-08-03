import { useHookEvents } from "hooks/Settings/EventsHook";
import { CreateEvent, DeleteEvent, UpdateEvent } from "lib/settings/events";
import { ChangeEvent, createContext, useContext, useMemo, useState } from "react";

const EventsContext: any = createContext(null)

export interface ISettingUser {
}

const EventsProvider = ({ children }: any) => {

    const WIDTH = ["4%", "3%", "27%", "27%", "13%", "15%", "11%"]
    const Headers = ["", "", "EVENT SERVICES", "DESCRIPTION", "STATUS", "MODIFIED BY", "MODIFIED ON"]
    const { events, setEvents } = useHookEvents()
    const [curPageNumber, setCurPageNumber] = useState(1)
    const [curIndex, setCurIndex] = useState(-1)
	const [info, setInfo] = useState<any>({})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateEvent(info)

		if (res.Data != null)
			setEvents([...events, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteEvent(id)
		let res = [...events]
		res.splice(index, 1)
		setEvents(res)
	}

	const handleUpdate = async () => {
		const res = await UpdateEvent(info.Id, info)
		let temp = [...events]
		temp[curIndex] = res.Data
		setEvents(temp)
	}

    const value = useMemo(
        () => ({
            events,
            curPageNumber,
            setCurPageNumber,
            WIDTH,
            Headers,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate
        }),
        [
            events,
            curPageNumber,
            setCurPageNumber,
            WIDTH,
            Headers,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate
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