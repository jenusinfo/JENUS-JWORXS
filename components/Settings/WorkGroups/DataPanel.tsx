import { useState } from "react"
import { CiEdit } from "react-icons/ci"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoEllipsisVerticalSharp, IoRefresh } from "react-icons/io5"
import { MdOutlineDelete } from "react-icons/md"
import DropDown from "shared/core/ui/Dropdown"
import Text from "shared/core/ui/Text"
import UsersModal from "./Modal"
import { useWorkGroups } from "providers/settings/WorkGroupsProvider"
import { getFormattedDate } from '../../../shared/helper/common';

const WorkGroupsDataPanel = () => {
	const { data, curPageNumber, setCurPageNumber, handleDelete, setInfo, setCurIndex } = useWorkGroups()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="border border-gray-200 rounded-[5px] mt-2 bg-white">
			<div className="pl-6 pr-2 py-2 flex items-center justify-between border-b border-gray-200">
				<IoRefresh />
				<div className="flex items-center gap-2">
					<Text text={`${(curPageNumber - 1) * 10 + 1}-${curPageNumber * 10} of ${data?.length}`} />
					<IoIosArrowBack className="hover:cursor-pointer" onClick={curPageNumber > 1 ? () => setCurPageNumber(curPageNumber - 1) : () => { }} />
					<IoIosArrowForward className="hover:cursor-pointer" onClick={() => setCurPageNumber(curPageNumber + 1)} />
				</div>
			</div>

			<table className="w-full">
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
								Name
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								STATUS
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								Created By
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								Created On
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								Modified By
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								Modified On
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{
						data &&
						data
							.slice((curPageNumber - 1) * 10, curPageNumber * 10)
							.map((inbox: any, index: number) => (
								<tr key={index} className="border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 transition-all duration-500">
									<td className="py-5">
										<div className="flex justify-center">
											<DropDown
												target={<IoEllipsisVerticalSharp className="hover:cursor-pointer" />}
												left={15}
												top={-5}
											>
												<div className="shadow-md border border-gray-100 rounded-[4px] bg-white">
													<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setIsOpen(true); setInfo(inbox); setCurIndex(curPageNumber * 10 + index - 10); }}>
														<CiEdit color="#2454DE" size={18} />
														<Text text="Update" size={12} weight="500" />
													</div>
													<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleDelete(inbox.Id, index)}>
														<MdOutlineDelete color="red" size={18} />
														<Text text="Delete" size={12} weight="500" />
													</div>
												</div>
											</DropDown>
										</div>
									</td>
									<td className="px-2">{inbox.Id}</td>
									<td className="px-2">{inbox.Tag}</td>
									<td className="px-2">
										<div className="flex items-center gap-1 font-semibold">
											<div className={"border-2 w-2 h-2 rounded-full " + (inbox.IsActive ? 'border-[#1ed6bb]' : 'border-[#fb5656]')} />
											<Text text={inbox.IsActive ? 'Active' : 'Inactive'} weight="500" />
										</div>
									</td>
									<td className="px-2">{inbox.CreatedById}</td>
									<td className="px-2">{getFormattedDate(inbox.CreatedOn)}</td>
									<td className="px-2">{inbox.ModifiedById}</td>
									<td className="px-2">{getFormattedDate(inbox.ModifiedOn)}</td>
								</tr>
							))
					}
				</tbody>
			</table>
			<UsersModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
		</div>
	)
}

export default WorkGroupsDataPanel