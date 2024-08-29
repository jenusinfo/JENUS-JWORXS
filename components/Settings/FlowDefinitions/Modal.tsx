import FormInput from "shared/core/components/FormInput"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"
import Activities from "./Activities"
import { useFlowDefinitions } from "providers/settings/FlowDefinitionsProvider"
import { toast } from "react-toastify"

const FlowDefinitionsModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate, activities } = useFlowDefinitions()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Form Definition Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Name" name="name" info={info} handleChange={handleChange} />
					<FormInput label="Description" name="description" info={info} handleChange={handleChange} />
					<FormInput label="Comments" name="comments" info={info} handleChange={handleChange} />
                    <FormSelect
						label="Select Default Activity *"
						name="defaultActivityName"
						info={info}
						handleChange={handleChange}
						optionList={[{value: "", name: "Choose"}, ...activities.map((each: any) => ({
                            value: each, name: each
                        }))]}
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
						label="Allow Multiple Tasks Per Interview"
						name="allowMultipleTasksPerInterview"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
                    <FormSelect
						label="Allow Multiple Tasks Per Document"
						name="allowMultipleTasksPerDocument"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
				</div>
                <Activities />
				<div className="flex mt-4 px-[34px]">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={async () => {
						toast.success("Record has been updated successfully")
						if (curIndex != -1) {
							await handleUpdate()
						} else {
							await handleCreate()
						}
						handleClose()
					}}>Save</button>
				</div>
			</div>
		</RightSide>
	)
}

export default FlowDefinitionsModal