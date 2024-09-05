import { useAttribute } from "providers/settings/Events/Item/AttributeProvider"
import { toast } from "react-toastify"
import FormInput from "shared/core/components/FormInput"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const EventAttributeModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

    const VarTypes = [
		{ name: "Choose Var Type"},
		{ name: "CURRENCY", value: "CURRENCY"},
		{ name: "DATE", value: "DATE"},
		{ name: "INTEGER", value: "INTEGER"},
		{ name: "FLOAT", value: "FLOAT"},
		{ name: "SELECT", value: "SELECT"},
		{ name: "TEXT", value: "TEXT"},
		{ name: "FILE", value: "FILE"},
	]
	const { info, handleChange, handleCreate, curIndex, handleUpdate } = useAttribute()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Attribute Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Name" name="Name" info={info} handleChange={handleChange} />
					<FormSelect
						label="Type"
						name="Type"
						info={info}
						handleChange={handleChange}
						optionList={VarTypes}
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

export default EventAttributeModal