import { useService } from "providers/settings/FormDefinitions/Details/ServiceProvider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import FormInput from "shared/core/components/FormInput"
import FormMultiSelect from "shared/core/components/FormMultiSelect"
import FormNumber from "shared/core/components/FormNumber"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const FormDefinitionsServiceModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate, events, eventServices, requestParameters, responseParameters, formFullInfo, handleMultiChange, handleParameterChange } = useService()
	const [triggers, setTriggers] = useState<any>([])

	useEffect(() => {
		if (formFullInfo) {
			let temp: any = []
			formFullInfo.forEach((form: any) => {
				form.Sections.forEach((section: any) => {
					section.Questions.forEach((que: any) => {
						temp.push(que)
					})
				})
			})
			setTriggers(temp)
		}
	}, [formFullInfo])

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Form Definition Question Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormSelect
						label="Select Event"
						name="EventId"
						info={info}
						handleChange={handleChange}
						optionList={events && events.length > 0
							? [{ name: "Select Event" }, ...events.map((each: any) => ({
								name: each.Name, value: each.Id
							}))]
							: []
						}
					/>
					<FormSelect
						label="Select Service"
						name="ServiceId"
						info={info}
						handleChange={handleChange}
						optionList={eventServices && eventServices.length > 0
							? [{ name: "Select Service" }, ...eventServices.map((each: any) => ({
								name: each.Name, value: each.Id
							}))]
							: []
						}
					/>
					<FormMultiSelect
						label="Request Parameters"
						name="RequestParameterMapping"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={53}
						optionList={
							requestParameters && requestParameters.length > 0
								? requestParameters.map((each: any) => ({
									name: each.Name, value: each.Id
								}))
								: []
						}
					/>
					{
						info?.RequestParameterMapping && info?.RequestParameterMapping.length > 0 &&
						<div className="flex flex-col gap-2 my-4">
							{
								info?.RequestParameterMapping.map((each: any, i: number) => (
									<div key={i} className="flex flex-col">
										<div className="basis-1/3">
											<Text text={requestParameters.filter((item: any) => item.Id == each.ServiceAttributeId)[0]?.Name} />
										</div>
										<div className="basis-2/3">
											<FormSelect
												label=""
												name="QuestionId"
												info={each}
												handleChange={(e: any) => handleParameterChange(e, i, 'RequestParameterMapping')}
												optionList={[{ name: "Choose Trigger" }, ...triggers.map((each: any) => ({
													name: each.Question, value: each.Id
												}))]}
											/>
										</div>
									</div>
								))
							}
						</div>
					}
					<FormMultiSelect
						label="Response Parameters"
						name="ResponseParameterMapping"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={52}
						optionList={
							responseParameters && responseParameters.length > 0
								? responseParameters.map((each: any) => ({
									name: each.Name, value: each.Id
								}))
								: []
						}
					/>
					{
						info?.ResponseParameterMapping && info?.ResponseParameterMapping.length > 0 &&
						<div className="flex flex-col gap-2 my-4">
							{
								info?.ResponseParameterMapping.map((each: any, i: number) => (
									<div key={i} className="flex flex-col">
										<div className="basis-1/3">
											<Text text={responseParameters.filter((item: any) => item.Id == each.ServiceAttributeId)[0]?.Name} />
										</div>
										<div className="basis-2/3">
											<FormSelect
												label=""
												name="QuestionId"
												info={each}
												handleChange={(e: any) => handleParameterChange(e, i, 'ResponseParameterMapping')}
												optionList={[{ name: "Choose Trigger" }, ...triggers.map((each: any) => ({
													name: each.Question, value: each.Id
												}))]}
											/>
										</div>
									</div>
								))
							}
						</div>
					}
					<FormSelect
						label="Trigger Type"
						name="TriggerType"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: 'PRE', name: 'OnEnter' },
							{ value: 'POST', name: 'OnExit' }
						]}
					/>
					<FormSelect
						label="Choose Trigger"
						name="TriggerObjectId"
						info={info}
						handleChange={handleChange}
						optionList={[{ name: "Choose Trigger" }, ...triggers.map((each: any) => ({
							name: each.Question, value: each.Id
						}))]}
					/>
					<FormInput label="Description" name="Description" info={info} handleChange={handleChange} />
					<FormSelect
						label="Is Active"
						name="IsActive"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
				</div>
				<div className="flex mt-4 px-[34px]">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={async () => {
						let res;
						if (curIndex != -1) {
							res = await handleUpdate()
						} else {
							res = await handleCreate()
						}
						if (res) {
							toast.success("Record has been updated successfully")
							handleClose()
						}
					}}>Save</button>
				</div>
			</div>
		</RightSide>
	)
}

export default FormDefinitionsServiceModal