import { useHookEvents } from "hooks/Settings/EventsHook";
import { CreateEvent, DeleteEvent, UpdateEvent } from "lib/settings/events";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";
import { IEvent } from "types/settings/events";

const EventsContext: any = createContext(null)

const EventsProvider = ({ children }: any) => {

	const WIDTH = ["4%", "3%", "27%", "27%", "13%", "15%", "11%"]
	const Headers = ["", "", "EVENT SERVICES", "DESCRIPTION", "STATUS", "MODIFIED BY", "MODIFIED ON"]
	const { events, setEvents, getEvents } = useHookEvents()
	const [curPageNumber, setCurPageNumber] = useState(1)
	const [curIndex, setCurIndex] = useState(-1)
	const [info, setInfo] = useState<any>({})
	const [search, setSearch] = useState("")
	const [data, setData] = useState<any>([])

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
		getEvents()
	}

	const handleUpdate = async () => {
		const res = await UpdateEvent(info.Id, info)
		let temp = [...events]
		temp[curIndex] = res.Data
		setEvents(temp)
	}

	useEffect(() => {
		if (search) {
			const filteredData = events.filter((item: IEvent) =>
				item.Name.toLowerCase().includes(search.toLowerCase()) ||
				item.Description?.toLowerCase().includes(search.toLowerCase())
			);
			setData(filteredData);
		} else {
			setData(events)
		}
	}, [search])

	useEffect(() => { setData(events) }, [events])

	const value = useMemo(
		() => ({
			events, data,
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
			handleUpdate,
			search,
			setSearch
		}),
		[
			events, data,
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
			handleUpdate,
			search,
			setSearch
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