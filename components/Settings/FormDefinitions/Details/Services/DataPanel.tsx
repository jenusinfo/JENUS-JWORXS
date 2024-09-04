import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import DropDown from "shared/core/ui/Dropdown";
import Text from "shared/core/ui/Text";
import { getFormattedDate } from "shared/helper/common";
import FormDefinitionsServiceModal from "./Modal";
import { useService } from "providers/settings/FormDefinitions/Details/ServiceProvider";

const ServicesDataPanel = () => {

	const { interviewServices: data, setInfo, setCurIndex, handleDelete } = useService()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="p-4 bg-white shadow-md">
			<div className="flex justify-between items-center">
				<Text text="Services Mappings" size={16} weight="600" color="#275E93" className="border-b-2 border-blue-500" />
				<button
					className="text-white bg-[#2454de] hover:bg-blue-500 transition-all duration-400 rounded-[4px] px-5 py-2.5 h-fit"
					onClick={() => { setIsOpen(true); setInfo({}); setCurIndex(-1); }}
				>
					+ Create a Service Mapping
				</button>
			</div>
			<table className="w-full mt-4">
				<thead>
					<tr className="text-xs text-[#A4A7B0] border-b border-gray-200">
						<th className="py-3">
							<div className="flex justify-center">
								<IoEllipsisVerticalSharp />
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								#
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								EVENT NAME
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								DESCRIPTION
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								SERVICE NAME
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								CREATED ON
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								CREATED BY
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-right">
								MODIFIED ON
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-right">
								MODIFIED BY
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-right">
								STATUS
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{
						data &&
						data.map((que: any, index: number) => (
							<tr key={index} className="border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 transition-all duration-500">
								<td className="py-5">
									<div className="flex justify-center">
										<DropDown
											target={<IoEllipsisVerticalSharp className="hover:cursor-pointer" />}
											left={15}
											top={-5}
										>
											<div className="shadow-md border border-gray-100 rounded-[4px] bg-white">
												<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setIsOpen(true); setInfo(que); setCurIndex(index); }}>
													<CiEdit color="#2454DE" size={18} />
													<Text text="Update" size={12} weight="500" />
												</div>
												<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleDelete(que.Id, index)}>
													<MdOutlineDelete color="red" size={18} />
													<Text text="Delete" size={12} weight="500" />
												</div>
											</div>
										</DropDown>
									</div>
								</td>
								<td className="px-2">{que.Id}</td>
								<td className="px-2">{que.EventName}</td>
								<td className="px-2">{que.Description}</td>
								<td className="px-2">{que.ServiceName}</td>
								<td className="px-2 text-right">{getFormattedDate(que.CreatedOn)}</td>
								<td className="px-2 text-right">{que.CreatedBy}</td>
								<td className="px-2 text-right">{getFormattedDate(que.ModifiedOn)}</td>
								<td className="px-2 text-right">{que.ModifiedBy}</td>
								<td className="px-2">
									<div className="flex items-center gap-1 font-semibold">
										<div className={"border-2 w-2 h-2 rounded-full " + (que.IsActive ? 'border-[#1ed6bb]' : 'border-[#fb5656]')} />
										<Text text={que.IsActive ? 'Active' : 'Inactive'} weight="500" />
									</div>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
			<FormDefinitionsServiceModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
		</div>
	)
}

export default ServicesDataPanel