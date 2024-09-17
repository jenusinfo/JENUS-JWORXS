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

	const { info, handleChange, formFullInfo, curForm } = useInterview()

	if (!formFullInfo) {
		return <></>
	}

	return (
		<div className="space-y-10">
			{
				formFullInfo[0].Sections.map((section: any, index: number) => (
					<div key={index} className="flex flex-col gap-5 w-[440px]">
						<Text text={section.Label} size={14} weight="500" />
						<div className="flex justify-between items-end">
							<Text text={section.Description} size={20} weight="700" />
							<Text text="Clear section" size={14} weight="500" color="#2454DE" />
						</div>
						<div className="flex flex-col gap-4">
							{
								section.Questions.map((que: any, j: number) => (
									<div key={j} className="flex flex-col gap-1">
										<Text text={que.TagName} size={11} weight="500" />
										{que.VarType == "TEXT" && <FormInput
											label={que.Description}
											name={que.TagName}
											info={info[que.InterviewSectionId] || {}}
											handleChange={(e: any) => handleChange(e, que.InterviewSectionId)}
										/>}
										{que.VarType == "INTEGER" && <FormNumber
											label={que.Description}
											name={que.TagName}
											info={info[que.InterviewSectionId] || {}}
											handleChange={(e: any) => handleChange(e, que.InterviewSectionId)}
										/>}
										{que.VarType == "DATE" && <FormDate
											label={que.Description}
											name={que.TagName}
											info={info[que.InterviewSectionId] || {}}
											handleChange={(e: any) => handleChange(e, que.InterviewSectionId)}
										/>}
										{que.VarType == "SELECT" && <SelectInput que={que} globalParamId={que.GlobalParamId} info={info} handleChange={handleChange} />}
									</div>
								))
							}
						</div>
					</div>
				))
			}
		</div>
	)
}

const SelectInput = ({ que, globalParamId, info, handleChange }: { 
	que: any, 
	globalParamId: number,
	info: any, 
	handleChange: any 
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
			info={info[que.InterviewSectionId] || {}}
			handleChange={(e: any) => handleChange(e, que.InterviewSectionId)}
		/>
	)
}

export default PersonalDetails