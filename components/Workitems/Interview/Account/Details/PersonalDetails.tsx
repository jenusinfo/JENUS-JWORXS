import axios from "axios"
import { GetByGolbalParamId, GetGlobalParams } from "lib/settings/parameters"
import { useInterview } from "providers/dashboard/InterviewProvider"
import { useEffect, useRef, useState } from "react"
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

	const { info, info: fullInfo, setInfo, handleChange, isEditMode, formStructure, errors, initialValues, checked, setChecked, handleRemoveField } = useInterview()
	const [selectedFiles, setSelectedFiles] = useState<any>()

	if (!formStructure || !info) {
		return <></>
	}

	return (
		<div className="space-y-10">
			{
				formStructure.controls.map((control: any, index: number) => {

					return (
						!control.isHidden &&
						<div className="border-l border-blue-600 pl-2" id={control.uniqueId + index}>
							<Text text={control.label} size={18} weight="700" className="capitalize" />
							<InputPanel
								controls={control.controls}
								isEditMode={isEditMode}
								info={control.globalId ? info[control.globalId] : info}
								handleChange={handleChange}
								handleRemoveField={handleRemoveField}
								errors={errors}
								setInfo={setInfo}
								selectedFiles={selectedFiles}
								setSelectedFiles={setSelectedFiles}
								isRepeatable={false}
								keyArray={control.globalId ?? ""}
								fullInfo={fullInfo}
								initialValues={initialValues}
								parentIndex={index.toString()}
							/>
						</div>
					)
				}
				)
			}
		</div>
	)
}

const InputObject = ({ control, isEditMode, info, i, handleChange, handleRemoveField, errors, setInfo, selectedFiles, setSelectedFiles, keyArray, fullInfo }: {
	control: any
	isEditMode: boolean
	info: any
	i: number
	handleChange: any
	handleRemoveField: any
	errors: any
	setInfo: any
	selectedFiles: any
	setSelectedFiles: any
	keyArray: string
	fullInfo: any
}) => {

	const { nextClicked, checked, setChecked, formStructure } = useInterview()

	if (!keyArray) {
		return (<></>)
	}

	const checkRule = () => {
		let ruleSetId = control.ruleSetId
		let ruleSets = formStructure.ruleSets
		let globalId, ruleId: any, value

		const getGlobalId = (controls: any) => {
			controls.forEach((control: any) => {
				control.dependentRules?.forEach((dependentRule: any) => {
					if (dependentRule.ruleSetId == ruleSetId) {
						globalId = control.globalId
						ruleId = dependentRule.ruleId
						return;
					}
				})

				if (control.controls)
					getGlobalId(control.controls)
			})
		}

		getGlobalId(formStructure.controls)

		value = getValueFromGlobalId(fullInfo, globalId)

		let valueToCheck
		ruleSets.forEach((ruleSet: any) => {
			ruleSet.rules.forEach((rule: any) => {
				if (rule.id == ruleId)
					valueToCheck = rule.valueToCheck
			})
		})

		return value == valueToCheck
	}

	function getValueFromGlobalId(data: any, targetKey: any) {
		if (typeof data === 'object' && data !== null) {
			if (Object.prototype.hasOwnProperty.call(data, targetKey)) {
				return data[targetKey];
			}

			// Recursively search through all values
			for (const value of Object.values(data)) {
				const result: any = getValueFromGlobalId(value, targetKey);
				if (result !== undefined) {
					return result;
				}
			}
		}

		return undefined
	}

	useEffect(() => {
		setChecked((prev: boolean) => prev && (!control.isRequired || (control.isRequired && info[control.globalId] != "")))
	}, [info])

	return (
		<>
			{
				!control.isHidden &&
				(isEditMode
					? <>
						{checkRule() && control.varType == "text" && <FormInput
							label={control.label}
							name={control.globalId}
							info={info}
							handleChange={(e: any) => handleChange(e, keyArray)}
							isFormatIcon={true}
							handleRemove={(e: any) => handleRemoveField(control.globalId, keyArray)}
							isError={nextClicked > 0 && control.isRequired && info[control.globalId] == ""}
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
							handleRemoveField={handleRemoveField}
							keyArray={keyArray}
						/>}
						{checkRule() && control.varType == "file" && (
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
					: <div className="flex items-center justify-between">
						<Text
							text={control.label}
						/>
						<Text
							text={
								info && info[control.globalId] ?
									info[control.globalId] : "-"
							}
							size={14}
							weight="600"
							color="#000"
						/>
					</div>
				)
			}
		</>
	)
}

const InputPanel = ({ controls, isEditMode, info, handleChange, handleRemoveField, errors, setInfo, selectedFiles, setSelectedFiles, isRepeatable, keyArray, fullInfo, initialValues, parentIndex }: {
	controls: any
	isEditMode: boolean
	info: any
	handleChange: any
	handleRemoveField: any
	errors: any
	setInfo: any
	selectedFiles: any
	setSelectedFiles: any
	isRepeatable: boolean
	keyArray: string
	fullInfo: any
	initialValues: any
	parentIndex: string
}) => {

	const { formStructure } = useInterview()

	const handleAddRepeatSection = async (sectionId: number, keyArray: string) => {
		setInfo((prevInfo: any) => {
			// Deep clone function to create a completely new object
			const deepClone = (obj: any): any => {
				if (obj === null || typeof obj !== 'object') return obj;

				if (Array.isArray(obj)) {
					return obj.map(item => deepClone(item));
				}

				const clonedObj: any = {};
				for (const key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) {
						clonedObj[key] = deepClone(obj[key]);
					}
				}

				return clonedObj;
			};

			// Create a deep clone of the previous info
			const updatedInfo = deepClone(prevInfo);

			// Recursive function to update nested value
			const updateNestedValue = (
				currentObj: any,
				initialValuesObj: any,
				keys: string[],
				sectionId: number
			) => {
				// Base case: if we've reached the end of the key array
				if (keys.length === 0) {
					// Determine whether to use the current or initial values based on key
					const NumberRegx = /^[0-9]$/;
					const targetArray = currentObj[sectionId];
					const newItem = initialValuesObj[NumberRegx.test(sectionId.toString()) ? 0 : sectionId][0];

					targetArray.push(newItem);
					return currentObj;
				}

				// Recursive case
				const [currentKey, ...remainingKeys] = keys;

				// Determine the appropriate initialValues object
				const NumberRegx = /^[0-9]$/;
				const initialValuesSubObj = NumberRegx.test(currentKey)
					? initialValuesObj[0]
					: initialValuesObj[currentKey];

				// Recursively update the nested object
				updateNestedValue(
					currentObj[currentKey],
					initialValuesSubObj,
					remainingKeys,
					sectionId
				);

				return currentObj;
			};

			// Prepare key array
			const keyArr = keyArray.split("#");

			// If there are keys, use recursive update
			if (keyArr.length > 1 || (keyArr.length === 1 && keyArr[0] !== '')) {
				updateNestedValue(updatedInfo, initialValues, keyArr, sectionId);
			} else {
				// Simple case: directly push to the section
				updatedInfo[sectionId].push(initialValues[sectionId][0]);
			}

			return updatedInfo;
		});
	};

	const handleRemoveRepeatSection = (sectionId: number, i: number) => {
	}

	const getValue = (tagName: string, i: number, gId: string) => {
		let globalId = ""

		const getGlobalId = (controls: any) => {
			controls.forEach((control: any) => {
				if (control.tagName == tagName) {
					globalId = control.globalId
					return;
				}

				if (control.controls)
					getGlobalId(control.controls)
			})
		}

		getGlobalId(formStructure.controls)

		return globalId ? info[gId][i][globalId] : ""
	}

	const setRepeatedLabel = (label: string, i: number, gId: string) => {
		let devidedString = "{{"
		let index = label.indexOf(devidedString)
		let defaultString = index != -1 ? label.substring(0, index) : label

		if (index == -1) {
			return defaultString + " - " + (i + 1)
		} else {
			const regex = /{{(.*?)}}/;
			const match = label.match(regex);
			return defaultString + getValue(match ? match[1] : "", i, gId)
		}
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
										<div className="border-l border-gray-500 pl-2" id={control.uniqueId + parentIndex + i}>
											<Text text={
												control.type == 'section' && control.repeatLabel
													? setRepeatedLabel(control.repeatLabel, i, control.globalId)
													: control.label
											} size={16} weight="600" />
											<InputPanel
												controls={control.controls}
												isEditMode={isEditMode}
												isRepeatable={control.isRepeatable}
												info={control.isRepeatable ? info[control.globalId][i] : control.globalId ? info[control.globalId] : info}
												handleChange={handleChange}
												errors={errors}
												setInfo={setInfo}
												selectedFiles={selectedFiles}
												setSelectedFiles={setSelectedFiles}
												keyArray={control.type == 'repeater' ? keyArray : keyArray + (keyArray ? "#" : "") + (control.globalId + (control.isRepeatable ? "#" + i : ""))}
												fullInfo={fullInfo}
												initialValues={initialValues}
												parentIndex={parentIndex + "" + i}
												handleRemoveField={handleRemoveField}
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
							fullInfo={fullInfo}
							handleRemoveField={handleRemoveField}
						/>
				))
			}
		</div>
	)
}

const SelectInput = ({ que, info, handleChange, handleRemoveField, isRepeatable, i, selectOptions, keyArray }: {
	que: any,
	info: any,
	handleChange: any,
	handleRemoveField: any,
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
			isFormatIcon={true}
			handleRemove={() => handleRemoveField(que.globalId, keyArray)}
		/>
	)
}

export default PersonalDetails