import { useSection } from "providers/settings/FormDefinitions/Details/SectionProvider"
import { toast } from "react-toastify"
import FormInput from "shared/core/components/FormInput"
import FormNumber from "shared/core/components/FormNumber"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const FormDefinitionsSectionModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate, parentSectionOptions } = useSection()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Form Definition Section Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Section Label" name="Label" info={info} handleChange={handleChange} />
					<FormInput label="Description" name="Description" info={info} handleChange={handleChange} />
					<FormInput label="Tag Name" name="TagName" info={info} handleChange={handleChange} />
					<FormSelect
						label="Parent Section Id"
						name="ParentSectionId"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ vlaue: "--Select--", name: "--Select" },
							...parentSectionOptions.map((each: any) => ({
								value: each.Id, name: each.Label
							}))
						]}
					/>
					<FormInput label="Group Heading" name="GroupHeading" info={info} handleChange={handleChange} />
					<FormSelect
						label="Enable section repeatable"
						name="IsRepeatable"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
					{
						(info?.IsRepeatable == true || info?.IsRepeatable == 'true') && <div className="mt-4 flex flex-col gap-3 px-4">
							<FormInput label="Repeating Section Label" name="RepeatSectionLabel" info={info} handleChange={handleChange} />
							<FormInput label="Question To Repeating Section" name="QuestionToRepeatSection" info={info} handleChange={handleChange} />
							<FormInput label="Tag Name for Repeating Section" name="RepeatSectionTagName" info={info} handleChange={handleChange} />
							<FormNumber label="Repeat Section Limit" name="RepeatSectionLimit" info={info} handleChange={handleChange} min={2} />
						</div>
					}
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
					<FormSelect
						label="Is Hidden"
						name="IsHidden"
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

export default FormDefinitionsSectionModal