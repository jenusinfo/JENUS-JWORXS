import { useHookFormDefinitionsDetail } from "hooks/Settings/FormDefinitionsDetailHook";
import { CreateEventServiceMapping, DeleteEventServiceMapping, UpdateEventServiceMapping } from "lib/settings/events";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const ServiceContext: any = createContext(null)

const ServiceProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
		interviewServices, setInterviewServices, getInterviewServices,
		events, setEvents, getEvents,
		eventServices, setEventServices, getEventServices,
		eventAttributes, setEventAttributes, getEventAttributes,
		formFullInfo, getFullInfoFormDefinitions
	} = useHookFormDefinitionsDetail()
	const [info, setInfo] = useState<any>({})
	const [curIndex, setCurIndex] = useState(-1)
	const [requestParameters, setRequestParameters] = useState<any>([])
	const [responseParameters, setResponseParameters] = useState<any>([])

	const handleChange = (e: any) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateEventServiceMapping({
			...info,
			InterviewFormId: id
		})

		if (res.Data != null) {
			setInterviewServices([...interviewServices, res.Data])
			return true
		}

		if (res.ModelErrors) {
			Object.entries(res.ModelErrors).map(([key, value]: any, index: number) => {
				toast.error(value[0])
			})
			return false
		}
	}

	const handleDelete = async (ServiceId: any) => {
		await DeleteEventServiceMapping(ServiceId)
		await getInterviewServices(id)
		toast.success("Record has been updated successfully")
	}

	const handleUpdate = async () => {
		const res = await UpdateEventServiceMapping(info.Id, info)
		let temp = [...interviewServices]
		temp[curIndex] = res.Data
		setInterviewServices(temp)
		return true
	}

	const isOptionSelected = (list: any, id: any) => {
		let flag = 0

		list?.forEach((item: any) => {
			if (item.ServiceAttributeId == id) {
				flag = 1
			}
		})

		if (flag == 0)
			return false
		else if (flag == 1)
			return true
	}

	const handleMultiChange = (name: string, value: any) => {
		let temp = {...info}

		let tmp: any = []
		if (temp[`${name}`] == undefined) {
			temp[`${name}`] = []
			tmp.push({
				attributeName: value.name,
				ServiceAttributeId: value.value
			})
		} else {
			temp[`${name}`].forEach((item: any) => {
				if (item.ServiceAttributeId != value.value) {
					tmp.push({
						attributeName: item.attributeName,
						ServiceAttributeId: item.ServiceAttributeId
					})
				}
			})

			if (!isOptionSelected(temp[`${name}`], value.value)) {
				tmp.push({
					attributeName: value.name,
					ServiceAttributeId: value.value
				})
			}
		}
		temp[`${name}`] = tmp

		setInfo(temp)
	}

	const handleParameterChange = (e: any, i: any, name: string) => {
		let temp: any = {...info}
		temp[name][i] = {
			...temp[name][i],
			[e.target.name]: e.target.value
		}
		setInfo(temp)
	}

	useEffect(() => {
		if (id) {
			getEvents()
			getFullInfoFormDefinitions(id)
			getInterviewServices(id)
		}
	}, [id])

	useEffect(() => {
		if (info && info.EventId) {
			getEventServices(info.EventId)
			getEventAttributes(info.EventId)
		}
		if (info && info.ServiceId) {
			let curService: any = eventServices.filter((each: any) => each.Id == info?.ServiceId)[0]
			let temp = eventAttributes.filter((each: any) => curService?.RequestParameters.includes(each.Id))
			setRequestParameters(temp)
			temp = eventAttributes.filter((each: any) => curService?.ResponseParameters.includes(each.Id))
			setResponseParameters(temp)
		}
		// setInfo({
		// 	...info,
		// 	RequestParameterMapping: [],
		// 	ResponseParameterMapping: []
		// })
	}, [info.EventId, info.ServiceId])

	console.log(info)

	const value = useMemo(
		() => ({
			formFullInfo,
			interviewServices,
			events,
			eventServices,
			eventAttributes,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
			requestParameters,
			responseParameters,
			handleMultiChange,
			handleParameterChange
		}),
		[
			formFullInfo,
			interviewServices,
			events,
			eventServices,
			eventAttributes,
			info, setInfo,
			curIndex, setCurIndex,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleChange,
			requestParameters,
			responseParameters,
			handleMultiChange,
			handleParameterChange
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