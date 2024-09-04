import { useQuestion } from "providers/settings/FormDefinitions/Details/QuestionProvider"
import { useFormDefinitionsDetail } from "providers/settings/FormDefinitions/FormDefinitionsDetailProvider"
import { toast } from "react-toastify"
import FormInput from "shared/core/components/FormInput"
import FormNumber from "shared/core/components/FormNumber"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const FormDefinitionsQuestionModal = ({ isOpen, handleClose }: {
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
	const { info, handleChange, handleCreate, curIndex, handleUpdate, interviewSections: sections, globalParams, ruleSets } = useQuestion()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Form Definition Question Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormInput label="Question" name="Question" info={info} handleChange={handleChange} />
					<FormInput label="Description" name="Description" info={info} handleChange={handleChange} />
					<FormSelect
						label="Interview Section Id"
						name="InterviewSectionId"
						info={info}
						handleChange={handleChange}
						optionList={[{name: "Select Interview Section"}, ...sections.map((section: any) => ({
							name: section.Label, value: section.Id
						}))]}
					/>
					<FormInput label="Tag Name" name="TagName" info={info} handleChange={handleChange} />
					<FormInput label="Var Name" name="VarName" info={info} handleChange={handleChange} />
					<FormSelect
						label="Var Type"
						name="VarType"
						info={info}
						handleChange={handleChange}
						optionList={VarTypes}
					/>
					{(info?.VarType == "CURRENCY" || info?.VarType == "INTEGER" || info?.VarType == "FLOAT") && <FormNumber
						label="Max Value"
						name="MaxValue"
						info={info}
						handleChange={handleChange}
					/>}
					{info?.VarType == "TEXT" && <FormNumber
						label="Max Length"
						name="MaxLength"
						info={info}
						handleChange={handleChange}
					/>}
					{info?.VarType == "SELECT" && <FormSelect
						label="Global Param"
						name="GlobalParam"
						info={info}
						handleChange={handleChange}
						optionList={[{name: "Select Var Type"}, ...globalParams.map((param: any) => ({
							name: param.Name, value: param.Id
						}))]}
					/>}
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
					<FormInput label="Autofill" name="Autofill" info={info} handleChange={handleChange} />
					<FormSelect
						label="Is Visible"
						name="Visibility"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
					{info?.Visibility == 'true'
					? <FormSelect
						label="Visible When True"
						name="RuleSetId"
						info={info}
						handleChange={handleChange}
						optionList={[{name: "Select Rule Set"}, ...ruleSets.map((each: any) => ({
							name: each.Name, value: each.Id
						}))]}
					/>
					: <FormSelect
						label="Hide When True"
						name="RuleSetId"
						info={info}
						handleChange={handleChange}
						optionList={[{name: "Select Rule Set"}, ...ruleSets.map((each: any) => ({
							name: each.Name, value: each.Id
						}))]}
					/>}
					<FormSelect
						label="Is Required"
						name="IsRequired"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
					<FormSelect
						label="Is Searchable"
						name="IsSearchable"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ value: false, name: 'No' },
							{ value: true, name: 'Yes' }
						]}
					/>
					<FormSelect
						label="Is ReadOnly"
						name="IsReadOnly"
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

export default FormDefinitionsQuestionModal