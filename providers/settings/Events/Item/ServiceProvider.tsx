import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateService, UpdateService, DeleteService } from "lib/settings/events";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const ServiceContext: any = createContext(null)

const ServiceProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        eventServices, setEventServices, getEventServices,
        eventAttributes, getEventAttributes
	} = useHookFormDefinitionsDetail()
	const [info, setInfo] = useState<any>({})
	const [curIndex, setCurIndex] = useState(-1)

	const handleChange = (e: any) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateService({
			...info,
            EventId: id
		})

		if (res.Data != null) {
			setEventServices([...eventServices, res.Data])
			return true
		}

		if (res.ModelErrors) {
			Object.entries(res.ModelErrors).map(([key, value]: any, index: number) => {
				toast.error(value[0])
			})
			return false
		}
	}

	const handleDelete = async (sectionId: any) => {
		await DeleteService(sectionId)
		await getEventServices(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateService(info.Id, info)
		let temp = [...eventServices]
		temp[curIndex] = res.Data
		setEventServices(temp)
		return true
	}

    const isOptionSelected = (list: any, id: any) => {
		let flag = 0

		list?.forEach((item: any) => {
			if (item == id) {
				flag = 1
			}
		})

		if (flag == 0)
			return false
		else if (flag == 1)
			return true
	}

    console.log(info)

    const handleMultiChange = (name: string, value: any) => {
		let temp = {...info}

		let tmp: any = []
		if (temp[`${name}`] == undefined) {
			temp[`${name}`] = []
			tmp.push(value.value)
		} else {
			temp[`${name}`].forEach((item: any) => {
				if (item != value.value) {
					tmp.push(item)
				}
			})

			if (!isOptionSelected(temp[`${name}`], value.value)) {
				tmp.push(value.value)
			}
		}
		temp[`${name}`] = tmp

		setInfo(temp)
	}

	useEffect(() => {
		if (id) {
            getEventServices(id)
            getEventAttributes(id)
		}
	}, [id])

	const value = useMemo(
		() => ({
			eventServices,
            eventAttributes,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
            handleMultiChange
		}),
		[
			eventServices,
            eventAttributes,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
            handleMultiChange
		]
	)

	return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
}

export const useService = () => {
	const context: any = useContext(ServiceContext)
	if (!context) {
		throw new Error("useService must be used within ServiceProvider")
	}
	return context
}

export default ServiceProvider