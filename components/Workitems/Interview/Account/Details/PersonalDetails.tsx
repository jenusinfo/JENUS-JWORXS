import axios from "axios"
import { GetByGolbalParamId, GetGlobalParams } from "lib/settings/parameters"
import { useInterview } from "providers/dashboard/InterviewProvider"
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa6"
import { IoDocumentText } from "react-icons/io5"
import { TbTrash } from "react-icons/tb"
import FileUploader from "shared/core/components/FileUploader"
import FormDate from "shared/core/components/FormDate"
import FormInput from "shared/core/components/FormInput"
import FormNumber from "shared/core/components/FormNumber"
import FormSelect from "shared/core/components/FormSelect"
import Text from "shared/core/ui/Text"

const PersonalDetails = () => {

	const { info, info: fullInfo, setInfo, handleChange, formFullInfo, curForm, isEditMode, formStructure, clearSection, errors } = useInterview()
	const [selectedFiles, setSelectedFiles] = useState<any>()

	if (!formStructure || !info) {
		return <></>
	}

	return (
		<div className="space-y-10">
			{
				formStructure.controls.map((control: any, index: number) => (
					!control.isHidden &&
					<div className="border-l border-blue-600 pl-2">
						<Text text={control.label} size={18} weight="700" className="capitalize" />
						<InputPanel
							controls={control.controls}
							isEditMode={isEditMode}
							info={control.globalId ? info[control.globalId] : info}
							handleChange={handleChange}
							errors={errors}
							setInfo={setInfo}
							selectedFiles={selectedFiles}
							setSelectedFiles={setSelectedFiles}
							isRepeatable={false}
							keyArray={control.globalId ?? ""}
							fullInfo={fullInfo}
						/>
					</div>
				))
			}
		</div>
	)
}

const InputObject = ({ control, isEditMode, info, i, handleChange, errors, setInfo, selectedFiles, setSelectedFiles, keyArray }: {
	control: any
	isEditMode: boolean
	info: any
	i: number
	handleChange: any
	errors: any
	setInfo: any
	selectedFiles: any
	setSelectedFiles: any
	keyArray: string
}) => {

	if (!keyArray) {
		return (<></>)
	}

	return (
		<>
			{
				isEditMode
					? <>
						{control.varType == "text" && <FormInput
							label={control.label}
							name={control.globalId}
							info={info}
							handleChange={(e: any) => handleChange(e, keyArray)}
							isError={control.IsRequired && errors && errors[`${control.parentUniqueId}-${i}-${control.globalId}`] == false}
						/>}
						{control.varType == "integer" && <FormNumber
							label={control.label}
							name={control.globalId}
							info={info}
							handleChange={(e: any) => handleChange(e, keyArray)}
						/>}
						{control.varType == "date" && <FormDate
							label={control.label}
							name={control.globalId}
							info={info}
							handleChange={(e: any) => handleChange(e, keyArray)}
						/>}
						{control.varType == "select" && control.selectOptions && <SelectInput
							que={control}
							selectOptions={control.selectOptions}
							info={info}
							isRepeatable={control.isRepeatable}
							i={i}
							handleChange={handleChange}
							keyArray={keyArray}
						/>}
						{control.varType == "file" && (
							info && info[control.parentUniqueId] && (
								!control.isRepeatable
									? info[control.parentUniqueId][control.globalId]
									: info[control.parentUniqueId][i] && info[control.parentUniqueId][i][control.globalId]
							)
								? <div className="flex gap-2 items-center">
									<IoDocumentText color='#2B8BE9' size={40} />
									<div className="flex flex-col gap-1">
										<Text
											text={control.isRepeatable
												? info[control.parentUniqueId][i][control.globalId].FileName
												: info[control.parentUniqueId][control.globalId].FileName
											}
											className="truncate"
											size={12}
										/>
										<FaTrash color='red' className='hover:cursor-pointer' size={14} onClick={() => {
											let temp = { ...info }
											if (control.isRepeatable) {
												temp[control.parentUniqueId][i] = {}
											} else {
												temp[control.parentUniqueId] = {}
											}
											setInfo(temp)
										}} />
									</div>
								</div>
								: <FileUploader
									name={control.globalId}
									selectedFiles={selectedFiles}
									setSelectedFiles={setSelectedFiles}
									allowedMultiple={false}
									info={info}
									setInfo={setInfo}
									isRepeatable={control.isRepeatable}
									parentUniqueId={control.parentUniqueId}
									index={i}
								/>
						)}
					</>
					: <Text
						text={
							info && info[control.parentUniqueId] &&
							(control.isRepeatable
								? info[control.parentUniqueId][i] ? info[control.parentUniqueId][i][control.globalId] : ""
								: info[control.parentUniqueId][control.globalId]
							)
						}
						size={14}
						weight="600"
						color="#000"
					/>
			}
		</>
	)
}

const InputPanel = ({ controls, isEditMode, info, handleChange, errors, setInfo, selectedFiles, setSelectedFiles, isRepeatable, keyArray, fullInfo }: {
	controls: any
	isEditMode: boolean
	info: any
	handleChange: any
	errors: any
	setInfo: any
	selectedFiles: any
	setSelectedFiles: any
	isRepeatable: boolean
	keyArray: string
	fullInfo: any
}) => {

	const {initialValues} = useInterview()

	const handleAddRepeatSection = (sectionId: number, keyArray: string) => {

		let NumberRegx = /^[0-9]$/
		let keyArr = keyArray.split("#")

		let tmp = {...fullInfo}
		
		const func = (tmp: any, initialValues: any, keyArr: Array<string>, index: number) => {
			if (index == keyArray.split("#").length) {
				tmp[sectionId].push(initialValues[sectionId][0])
				return;
			}
			func(tmp[keyArr[0]], initialValues[NumberRegx.test(keyArr[0]) ? 0 : keyArr[0]], keyArr.slice(index+1, keyArr.length), index+1)
		}

		if ((keyArr.length > 1) || (keyArr.length == 1 && keyArr[0] != ''))
			func(tmp, initialValues, keyArr, 0)
		else {
			tmp[sectionId].push(initialValues[sectionId][0])
		}

		setInfo(tmp)
	}

	const handleRemoveRepeatSection = (sectionId: number, i: number) => {
		let temp = { ...info }
		temp[sectionId].splice(i, 1)
		setInfo(temp)
	}

	return (
		<div className="space-y-4 mt-6">
			{
				controls.map((control: any, index: number) => (
					control.type == 'section' || control.type == 'repeater'
						? <>
							<div className="space-y-4">
								{
									(control.isRepeatable
										? [...Array(control.repeatLimit
											? control.repeatLimit
											: info[control.globalId]
												? info[control.globalId].length
												: 0
										)]
										: [...Array(1)]
									).map((_, i: number) => (
										<div className="border-l border-gray-500 pl-2">
											<Text text={
												control.type == 'section' && control.repeatLabel
													? control.repeatLabel
													: control.label
											} size={16} weight="600" />
											<InputPanel
												controls={control.controls}
												isEditMode={isEditMode}
												isRepeatable={control.isRepeatable}
												info={control.isRepeatable ? info[control.globalId][i] : control.globalId ? info[control.globalId]: info}
												handleChange={handleChange}
												errors={errors}
												setInfo={setInfo}
												selectedFiles={selectedFiles}
												setSelectedFiles={setSelectedFiles}
												keyArray={control.type == 'repeater' ? keyArray : keyArray+(keyArray ? "#" : "")+(control.globalId + (control.isRepeatable ? "#" + i : ""))}
												fullInfo={fullInfo}
											/>
										</div>
									))
								}
							</div>
							{
								control.type == 'section' && control.repeatLabel &&
								<button 
									className="text-xs text-blue-500 underline" 
									onClick={() => handleAddRepeatSection(control.globalId, keyArray)}
								>
									{control.questionToRepeatSection ?? "Add another"}
								</button>
							}
						</>
						: <InputObject
							control={control}
							isEditMode={isEditMode}
							info={info}
							i={index}
							handleChange={handleChange}
							errors={errors}
							setInfo={setInfo}
							selectedFiles={selectedFiles}
							setSelectedFiles={setSelectedFiles}
							keyArray={keyArray}
						/>
				))
			}
		</div>
	)
}

const SelectInput = ({ que, info, handleChange, isRepeatable, i, selectOptions, keyArray }: {
	que: any,
	info: any,
	handleChange: any,
	isRepeatable: any,
	i: any,
	selectOptions: any,
	keyArray: string
}) => {

	return (
		<FormSelect
			label={que.label}
			name={que.globalId}
			optionList={[
				{ name: "--Select--" },
				...selectOptions?.map((option: any) => ({ name: option.label, value: option.value }))
			]}
			info={info}
			handleChange={(e: any) => handleChange(e, keyArray)}
		/>
	)
}

export default PersonalDetails