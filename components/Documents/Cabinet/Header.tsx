import { useRouter } from "next/router";
import Text from "shared/core/ui/Text";
import { convertToTitleCase } from "shared/helper/common";
import { LuSearch } from "react-icons/lu";
import { useCabinet } from "providers/documents/CabinetProvider";
import NewDocumentModal from "./Modals/NewDocument";
import { useState } from "react";

export function DocumentCabinetHeader() {

	const { title } = useRouter().query
	const { selectedOptions, handleAddFilter, handleRemoveFilter, handleChange, fetchDocuments, filterOptions } = useCabinet()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="flex justify-between">
			<Text text={convertToTitleCase(String(title))} size={16} weight="700" />
			<div className="flex gap-1.5">
				<div className="flex flex-col gap-3">
				{
					filterOptions.length > 0 &&
					filterOptions.map((each: any, index: number) => (
						<div key={index} className="flex">
							{(index == 0 && filterOptions.length > 1) ? <select className="border border-blue-200 rounded-[4px] px-3.5 py-2.5 bg-transparent text-sm focus:outline-none mr-2">
								<option>AND</option>
								<option>OR</option>
							</select> : <div className="w-[91px]" />}
							<select
								className="border border-blue-200 rounded-[4px] px-3.5 py-2.5 w-[234px] bg-transparent text-sm focus:outline-none"
								name="option"
								value={each.option || ""}
								onChange={(e) => handleChange(e, index)}
							>
								{
									selectedOptions.length > 0
										? selectedOptions.map((option: any, index: number) => (
											<option key={index} value={option.value}>{option.label}</option>
										))
										: <option>Filter: Select Filter</option>
								}
							</select>
							<input 
								className="border border-blue-200 rounded-[4px] px-3.5 py-2.5 w-[212px] text-sm focus:outline-none bg-transparent ml-2" 
								placeholder="Search Value"
								name="value"
								value={each.value || ""}
								onChange={(e) => handleChange(e, index)}
							/>
							<button 
								className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-3.5 py-2.5 h-fit text-sm ml-2" 
								onClick={index == 0 ? () => handleAddFilter() : () => handleRemoveFilter(index)}
							>
								{index == 0 ? '+' : '-'}
							</button>
						</div>
					))
				}
				</div>
				<button className="text-white bg-[#2454de] rounded-[4px] px-3.5 py-2.5 h-fit text-sm" onClick={fetchDocuments}><LuSearch size={18} /></button>
				<button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit text-sm">Export As</button>
				<button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm" onClick={() => setIsOpen(true)}>New Document+</button>
			</div>
			<NewDocumentModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
		</div>
	)
}