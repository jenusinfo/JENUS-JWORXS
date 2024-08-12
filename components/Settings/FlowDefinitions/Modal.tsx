import { useFlowDefinitions } from "providers/settings/FlowDefinitionsProvider"
import FormInput from "shared/core/components/FormInput"
import FormMultiSelect from "shared/core/components/FormMultiSelect"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const FlowDefinitionsModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate, formDefinitions, groups, hashTags, handleMultiChange} = useFlowDefinitions()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Flow Definition Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Name" name="Name" info={info} handleChange={handleChange} />
					<FormInput label="Description" name="Description" info={info} handleChange={handleChange} />
					<FormInput label="Subject" name="Subject" info={info} handleChange={handleChange} />
					<FormInput label="Root Tag Name" name="RootTagName" info={info} handleChange={handleChange} />
					<FormMultiSelect
						label="Available to Group(s)"
						name="InterviewFormPermit"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={53}
						optionList={groups.map((item: any) => ({
							value: item.Id, name: item.Name
						}))}
						list={groups}
					/>
					<FormMultiSelect
						label="Hash Tag"
						name="HashTags"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={52}
						optionList={hashTags.map((item: any) => ({
							value: item, name: item
						}))}
					/>
					<FormSelect
						label="Task Type"
						name="TaskDefinitionId"
						info={info}
						optionList={[{value: "", name: ""}, ...formDefinitions.map((each: any) => ({
							value: each.Id,
							name: each.Name
						}))]}
						handleChange={handleChange}
					/>
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
						label="Checker Required"
						name="CheckerRequired"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
					<FormSelect
						label="CoverPageForm"
						name="CoverPageForm"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
				</div>
				<div className="flex mt-4 px-[34px]">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={curIndex != -1 ? () => handleUpdate() : () => handleCreate()}>Save</button>
				</div>
			</div>
		</RightSide>
	)
}

export default FlowDefinitionsModal