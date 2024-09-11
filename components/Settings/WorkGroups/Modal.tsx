import { useWorkGroups } from "providers/settings/WorkGroupsProvider"
import FormInput from "shared/core/components/FormInput"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const WorkGroupsModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate } = useWorkGroups()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Work Group Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="HashTag" name="HashTag" info={info} handleChange={handleChange} />
				</div>
				<div className="flex mt-4 px-[34px]">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={curIndex != -1 ? () => handleUpdate() : () => handleCreate()}>Save</button>
				</div>
			</div>
		</RightSide>
	)
}

export default WorkGroupsModal