import { useUnits } from "providers/settings/UnitsProvider"
import { useUsers } from "providers/settings/UsersProvider"
import { toast } from "react-toastify"
import FormInput from "shared/core/components/FormInput"
import FormMultiSelect from "shared/core/components/FormMultiSelect"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const UsersModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { info, handleChange, handleCreate, curIndex, handleUpdate, roles, targets, documentCategories, units, groups, handleMultiChange } = useUsers()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Users Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="First Name" name="FirstName" info={info} handleChange={handleChange} />
					<FormInput label="Last Name" name="LastName" info={info} handleChange={handleChange} />
					<FormInput label="UserName" name="UserName" info={info} handleChange={handleChange} />
					<FormSelect
						label="Unit"
						name="BankUnitId"
						info={info}
						handleChange={handleChange}
						optionList={units.map((item: any) => ({
							value: item.Id, name: item.UnitName
						}))}
					/>
					<FormMultiSelect
						label="Select Group"
						name="UserGroups"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={53}
						optionList={groups.map((item: any) => ({
							value: item.Id, name: item.Name
						}))}
					/>
					<FormMultiSelect
						label="Roles"
						name="Roles"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={52}
						optionList={roles.map((item: any) => ({
							value: item.Id, name: item.Name
						}))}
					/>
					<FormMultiSelect
						label="Targets"
						name="UserTargets"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={51}
						optionList={targets.map((item: any) => ({
							value: item.Id, name: item.Name
						}))}
					/>
					<FormMultiSelect
						label="Document Categories"
						name="UserDocumentDefinitions"
						info={info}
						handleMultiChange={handleMultiChange}
						zIndex={50}
						optionList={documentCategories.map((item: any) => ({
							value: item.Id, name: item.Name
						}))}
					/>
					<FormInput label="Email" name="Email" info={info} handleChange={handleChange} />
					<FormInput label="Phone Number" name="PhoneNumber" info={info} handleChange={handleChange} />
				</div>
				<div className="flex mt-4 px-[34px]">
					<button
						className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs"
						onClick={async () => {
							let res: any
							if (curIndex != -1) {
								res = await handleUpdate()
							} else {
								res = await handleCreate()
							}
							if (res) {
								toast.success("Record has been updated successfully")
								handleClose()
							}
						}}
					>Save</button>
				</div>
			</div>
		</RightSide>
	)
}

export default UsersModal