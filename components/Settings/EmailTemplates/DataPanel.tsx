import { IEmailTemplates, useEmailTemplates } from "providers/settings/EmailTemplatesProvider"
import { useState } from "react"
import { CiEdit } from "react-icons/ci"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoEllipsisVerticalSharp, IoRefresh } from "react-icons/io5"
import { MdOutlineDelete } from "react-icons/md"
import DropDown from "shared/core/ui/Dropdown"
import Text from "shared/core/ui/Text"

const DataPanel = () => {
	const { emailTemplates: data, curPageNumber, setCurPageNumber, handleDelete, setInfo, setCurIndex } = useEmailTemplates()
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

			<div className="overflow-auto">
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
									DOCUMENT DEFINITION
								</div>
							</th>
							<th className="py-3">
								<div className="px-2 border-l border-gray-200 text-center">
									EMAIL FROM
								</div>
							</th>
							<th className="py-3">
								<div className="px-2 border-l border-gray-200 text-left">
									EMAILCC
								</div>
							</th>
							<th className="py-3">
								<div className="px-2 border-l border-gray-200 text-left">
									EMAILBCC
								</div>
							</th>
							<th className="py-3">
								<div className="px-2 border-l border-gray-200 text-left">
									EMAIL SUBJECT
								</div>
							</th>
							<th className="py-3">
								<div className="px-2 border-l border-gray-200 text-left">
									EMAIL ATTACHMENT NAME
								</div>
							</th>
							<th className="py-3">
								<div className="px-2 border-l border-gray-200 text-left">
									EMAIL BODY
								</div>
							</th>
							<th className="py-3">
								<div className="px-2 border-l border-gray-200 text-left">
									STATUS
								</div>
							</th>
						</tr>
					</thead>
					<tbody className="text-sm">
						{
							data
								?.slice((curPageNumber - 1) * 10, curPageNumber * 10)
								.map((event: IEmailTemplates, index: number) => (
									<tr key={index} className="border-b border-gray-200">
										<td className="py-5">
											<div className="flex justify-center">
												<DropDown
													target={<IoEllipsisVerticalSharp className="hover:cursor-pointer" />}
													left={15}
													top={-5}
												>
													<div className="shadow-md border border-gray-100 rounded-[4px] bg-white">
														<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setIsOpen(true); setInfo(event); setCurIndex(index); }}>
															<CiEdit color="#2454DE" size={18} />
															<Text text="Update" size={12} weight="500" />
														</div>
														<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleDelete(event.Id, index)}>
															<MdOutlineDelete color="red" size={18} />
															<Text text="Delete" size={12} weight="500" />
														</div>
													</div>
												</DropDown>
											</div>
										</td>
										<td className="px-2">{event.Id}</td>
										<td className="px-2">{event.DocumentDefinition}</td>
										<td className="px-2">{event.EmailFrom}</td>
										{/* <td className="px-2">
										<div className="flex items-center gap-1 font-semibold">
											<div className={"border-2 w-2 h-2 rounded-full " + (event.IsActive ? 'border-[#1ed6bb]' : 'border-[#fb5656]')} />
											<Text text={event.IsActive ? 'Active' : 'Inactive'} weight="500" />
										</div>
									</td> */}
										<td className="px-2 text-right">{event.EmailCC}</td>
										<td className="px-2">{event.EmailBCC}</td>
										<td className="px-2">{event.EmailSubject}</td>
										<td className="px-2">{event.EmailAttachmentName}</td>
										<td className="px-2">{event.EmailBody}</td>
									</tr>
								))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default DataPanel