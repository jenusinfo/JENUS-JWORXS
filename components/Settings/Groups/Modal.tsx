import { useGroups } from "providers/settings/GroupsProvider"
import { toast } from "react-toastify"
import FormInput from "shared/core/components/FormInput"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const GroupsModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate } = useGroups()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Group Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Name" name="Name" info={info} handleChange={handleChange} />
					<FormInput label="Description" name="Description" info={info} handleChange={handleChange} />
					<FormInput label="Abbreviation" name="Abbreviation" info={info} handleChange={handleChange} />
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
						label="Is Unit Sensitive"
						name="IsUnitSensitive"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
					<FormSelect
						label="Is Target Senitive"
						name="IsTargetSensitive"
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

export default GroupsModal