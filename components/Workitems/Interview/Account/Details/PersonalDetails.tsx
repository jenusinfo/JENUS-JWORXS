import axios from "axios"
import { GetByGolbalParamId, GetGlobalParams } from "lib/settings/parameters"
import { useInterview } from "providers/dashboard/InterviewProvider"
import { useEffect, useState } from "react"
import FormDate from "shared/core/components/FormDate"
import FormInput from "shared/core/components/FormInput"
import FormNumber from "shared/core/components/FormNumber"
import FormSelect from "shared/core/components/FormSelect"
import Text from "shared/core/ui/Text"

const PersonalDetails = () => {

	const { info, handleChange, formFullInfo, curForm, isEditMode } = useInterview()

	if (!formFullInfo) {
		return <></>
	}

	return (
		<div className="space-y-10">
			{
				formFullInfo[0].Sections.map((section: any, index: number) => (
					<div key={index} className="flex flex-col gap-5 w-[448px]">
						<Text text={section.Label} size={14} weight="500" />
						<div className="flex justify-between items-end">
							<Text text={section.Description} size={20} weight="700" />
							{isEditMode && <Text text="Clear section" size={14} weight="500" color="#2454DE" />}
						</div>
						{
							(section.IsRepeatable ? [...Array(section.RepeatSectionLimit)] : [...Array(1)]).map((_, i: number) => (
								<div key={i} className="flex flex-col gap-4">
									{
										section.Questions.map((que: any, j: number) => (
											<div key={j} className={isEditMode ? "flex flex-col gap-1" : "flex justify-between"}>
												<Text text={que.TagName} size={isEditMode ? 11 : 14} weight="500" />
												{
													isEditMode
														? <>
															{que.VarType == "TEXT" && <FormInput
																label={que.Description}
																name={que.TagName}
																info={(info && (section.IsRepeatable ? info[que.InterviewSectionId][i] : info[que.InterviewSectionId])) || {}}
																handleChange={(e: any) => handleChange(e, que.InterviewSectionId, section.IsRepeatable, i)}
															/>}
															{que.VarType == "INTEGER" && <FormNumber
																label={que.Description}
																name={que.TagName}
																info={(info && (section.IsRepeatable ? info[que.InterviewSectionId][i] : info[que.InterviewSectionId])) || {}}
																handleChange={(e: any) => handleChange(e, que.InterviewSectionId, section.IsRepeatable, i)}
															/>}
															{que.VarType == "DATE" && <FormDate
																label={que.Description}
																name={que.TagName}
																info={(info && (section.IsRepeatable ? info[que.InterviewSectionId][i] : info[que.InterviewSectionId])) || {}}
																handleChange={(e: any) => handleChange(e, que.InterviewSectionId, section.IsRepeatable, i)}
															/>}
															{que.VarType == "SELECT" && <SelectInput 
																que={que} 
																globalParamId={que.GlobalParamId} 
																info={info} 
																isRepeatable={section.IsRepeatable} 
																i={i} 
																handleChange={handleChange} 
															/>}
														</>
														: <Text 
																text={
																	info && info[que.InterviewSectionId] && 
																	(section.IsRepeatable 
																		? info[que.InterviewSectionId][i] ? info[que.InterviewSectionId][i][que.TagName] : "" 
																		: info[que.InterviewSectionId][que.TagName]
																	)
																} 
																size={14} 
																weight="600" 
																color="#000" 
															/>
												}
											</div>
										))
									}
								</div>
							))
						}
					</div>
				))
			}
		</div>
	)
}

const SelectInput = ({ que, globalParamId, info, handleChange, isRepeatable, i }: {
	que: any,
	globalParamId: number,
	info: any,
	handleChange: any,
	isRepeatable: any,
	i: any
}) => {

	const [optionList, setOptionList] = useState<any>([])

	useEffect(() => {
		const getOptionList = async () => {
			const res = await GetByGolbalParamId(globalParamId)

			setOptionList(res.Data)
		}

		if (globalParamId) {
			getOptionList()
		}
	}, [globalParamId])

	return (
		<FormSelect
			label={que.Description}
			name={que.TagName}
			optionList={[
				{ name: que.Question },
				...optionList.map((option: any) => ({ name: option.Text, value: option.Id }))
			]}
			info={(info && (isRepeatable ? info[que.InterviewSectionId][i] : info[que.InterviewSectionId])) || {}}
			handleChange={(e: any) => handleChange(e, que.InterviewSectionId, isRepeatable, i)}
		/>
	)
}

export default PersonalDetails