import { useUnits } from "providers/settings/UnitsProvider"
import FormInput from "shared/core/components/FormInput"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const UnitsModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, parentBankList, handleCreate, curIndex, handleUpdate } = useUnits()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Unit Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Code" name="UnitCode" info={info} handleChange={handleChange} />
					<FormInput label="Name" name="UnitName" info={info} handleChange={handleChange} />
					<FormSelect
						label="Parent Unit"
						name="ParentBankUnitId"
						info={info}
						handleChange={handleChange}
						optionList={parentBankList.map((item: any) => ({
							value: item.Id, name: item.UnitName
						}))}
					/>
					<FormInput label="Email" name="Email" info={info} handleChange={handleChange} />
					<FormInput label="Phone" name="Telephone" info={info} handleChange={handleChange} />
					<FormInput label="Fax" name="Fax" info={info} handleChange={handleChange} />
					<FormInput label="Address" name="Address" info={info} handleChange={handleChange} />
					<FormInput label="P.O.Box" name="POBox" info={info} handleChange={handleChange} />
					<FormSelect
						label="Is Global Unit?"
						name="IsGlobal"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
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
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={curIndex != -1 ? () => handleUpdate() : () => handleCreate()}>Save</button>
				</div>
			</div>
		</RightSide>
	)
}

export default UnitsModal