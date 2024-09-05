import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateAttribute, UpdateAttribute, DeleteAttribute } from "lib/settings/events";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const AttributeContext: any = createContext(null)

const AttributeProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        eventAttributes, setEventAttributes, getEventAttributes
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
		const res = await CreateAttribute({
			...info,
            EventId: id
		})

		if (res.Data != null) {
			setEventAttributes([...eventAttributes, res.Data])
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
		await DeleteAttribute(sectionId)
		await getEventAttributes(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateAttribute(info.Id, info)
		let temp = [...eventAttributes]
		temp[curIndex] = res.Data
		setEventAttributes(temp)
		return true
	}

	useEffect(() => {
		if (id) {
            getEventAttributes(id)
		}
	}, [id])

	const value = useMemo(
		() => ({
			eventAttributes,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange
		}),
		[
			eventAttributes,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
		]
	)

	return <AttributeContext.Provider value={value}>{children}</AttributeContext.Provider>
}

export const useAttribute = () => {
	const context: any = useContext(AttributeContext)
	if (!context) {
		throw new Error("useAttribute must be used within AttributeProvider")
	}
	return context
}

export default AttributeProvider