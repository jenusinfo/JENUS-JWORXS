import { useRouter } from "next/router"
import { useCabinet } from "providers/documents/CabinetProvider"
import FormInput from "shared/core/components/FormInput"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"
import { convertToTitleCase } from "shared/helper/common"
import { Icon } from "shared/icons"
import { useDropzone, Accept } from 'react-dropzone'
import { MdDelete } from "react-icons/md";
import FormDate from "shared/core/components/FormDate"

const NewDocumentModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { title } = useRouter().query
	const { importKeys, values,
		showDocumentBranch, showDocumentEventDate, showDocumentUser,
		info, handleValueChange: handleChange, handleImport,
		onDrop, selectedFiles, handleRemoveFile
	} = useCabinet()
	const {
		getRootProps,
		getInputProps,
		isDragAccept,
		isDragReject
	} = useDropzone({
		onDrop,
		multiple: true,
		accept: {
			"application/pdf": [".pdf"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
		}
	})

	// console.log(importKeys, values)

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="px-[29px] pb-4 border-b border-gray-100">
					<Text text="Import Document(s)" size={16} weight="700" color="black" />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-[34px]">
					<div className={'flex flex-col gap-[2px]'}>
						<Text text={"Document Cabinet"} color="#84858c" />
						<Text text={convertToTitleCase(String(title))} weight="500" />
					</div>
					{
						importKeys.map((key: any, index: number) => (
							key.defInputType == "STRING"
								? <FormInput
									key={index}
									label={convertToTitleCase(key.keyDef)}
									name={key.keyDef}
									info={info}
									handleChange={handleChange}
								/>
								: key.defInputType == "DROPDOWN"
									? <FormSelect
										key={index}
										label={convertToTitleCase(key.keyDef)}
										name={key.keyDef}
										info={info}
										handleChange={handleChange}
										optionList={key.updatedSelectOptions.map((each: any) => ({ name: each.label, value: each.value }))}
									/>
									: key.defInputType == "DATE"
										? <FormDate
											key={index}
											label={convertToTitleCase(key.keyDef)}
											name={key.keyDef}
											info={info}
											handleChange={handleChange}
										/>
										: <></>
						))
					}
				</div>
				<div className="px-[34px] mt-2">
					<div
						className="border border-dashed border-blue-200 bg-blue-100 bg-opacity-60 py-8 rounded-[4px]"
					>
						<div
							{...getRootProps()}
						>
							<input {...getInputProps()} />
							<div className="flex justify-center gap-4">
								<Icon type="doc" />
								<div>
									<Text text="Drag & Drop Files Here" size={14} weight="700" color="#071B55" />
									<Text text="Only .pdf documents acceptable" size={12} color="#071B55" />
								</div>
							</div>
						</div>
						<div className="flex justify-center items-center gap-2 mt-2">
							{
								selectedFiles.map((file: any, index: number) => (
									<div key={index} className="bg-blue-400 px-2 py-1 rounded-[4px] flex items-center gap-2">
										<Text text={file.name} size={12} color="#fff" />
										<MdDelete color="#e00" size={18} className="hover:cursor-pointer" onClick={() => handleRemoveFile(index)} />
									</div>
								))
							}
						</div>
					</div>
				</div>
				<div className="px-[34px] mt-4">
					<div className="flex flex-col gap-2">
						<Text text="Preserve Key data" size={14} weight="600" color="#000" />
						<div className="flex items-center gap-3">
							<input type="checkbox" />
							<Text text="Check this box to prevent data being reset after each file is uploaded." size={12} color="#071B55" />
						</div>
					</div>
				</div>
				<div className="px-[34px] flex justify-end mt-8">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={handleImport}>Import</button>
				</div>
			</div>
		</RightSide>
	)
}

export default NewDocumentModal