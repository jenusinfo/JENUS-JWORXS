import { useRule } from "providers/settings/FormDefinitions/Details/RuleProvider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import FormInput from "shared/core/components/FormInput"
import FormNumber from "shared/core/components/FormNumber"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const FormDefinitionsRulesModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const OperatorList = [
		{ name: "Choose Operator" },
		{ name: "EQUAL", value: "EQUAL" },
		{ name: "NOT EQUAL", value: "NOT_EQUAL" },
		{ name: "GREATER THAN", value: "GREATER" },
		{ name: "LESSER THAN", value: "LESSER" },
		{ name: "GREATER THAN OR EQUAL", value: "GREATER_OR_EQUAL" },
		{ name: "LESSER THAN OR EQUAL", value: "LESSER_OR_EQUAL" },
	]
	const { info, handleChange, handleCreate, curIndex, handleUpdate, formFullInfo, ruleSets } = useRule()
	const [sourceSections, setSourceSections] = useState<any>([])

	useEffect(() => {
		if (formFullInfo) {
			let tmp: any = []
			formFullInfo.forEach((form: any) => {
				form.Sections.forEach((section: any) => {
					tmp.push(section)
				})
			})
			setSourceSections(tmp)
		}
	}, [formFullInfo])

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Form Definition Rule Details" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<FormSelect
						label="Rule Set"
						name="RuleSetId"
						info={info}
						handleChange={handleChange}
						optionList={[{ name: "Select Rule Set" }, ...ruleSets.map((section: any) => ({
							name: section.Name, value: section.Id
						}))]}
					/>
					<FormInput label="Rule Name" name="Name" info={info} handleChange={handleChange} />
					<FormSelect
						label="Source Section"
						name="InterviewSectionId"
						info={info}
						handleChange={handleChange}
						optionList={[{ name: "Select Source Section" }, ...sourceSections.map((section: any) => ({
							name: section.Label, value: section.Id
						}))]}
					/>
					<FormSelect
						label="Source Question"
						name="InterviewQuestionId"
						info={info}
						handleChange={handleChange}
						optionList={
							info?.InterviewSectionId && sourceSections
								? [{ name: "Select Source Question" },
								...sourceSections.filter((item: any) => item.Id == info.InterviewSectionId)[0]?.Questions.map((section: any) => ({
									name: section.Question, value: section.Id
								}))] : []}
					/>
					<FormSelect
						label="Operator"
						name="Operator"
						info={info}
						handleChange={handleChange}
						optionList={OperatorList}
					/>
					<FormInput label="Value to Check" name="ValueToCheck" info={info} handleChange={handleChange} />
					<FormSelect
						label="Conjuction"
						name="Conjuction"
						info={info}
						handleChange={handleChange}
						optionList={[
							{ name: "AND", value: "AND" },
							{ name: "OR", value: "OR" }
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

export default FormDefinitionsRulesModal