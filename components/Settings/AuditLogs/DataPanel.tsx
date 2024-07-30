import { IAuditLogs, useAuditLogs } from "providers/settings/AuditLogsProvider"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoEllipsisVerticalSharp, IoRefresh } from "react-icons/io5"
import Text from "shared/core/ui/Text"

const DataPanel = () => {
	const { auditLogs: data, curPageNumber, setCurPageNumber } = useAuditLogs()

	return (
		<div className="border border-gray-200 rounded-[5px] mt-2 bg-white">
			<div className="pl-6 pr-2 py-2 flex items-center justify-between border-b border-gray-200">
				<IoRefresh />
				<div className="flex items-center gap-2">
					<Text text={`${(curPageNumber - 1) * 10 + 1}-${curPageNumber * 10} of ${data.length}`} />
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
								EVENT SERVICES
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								DESCRIPTION
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-center">
								STATUS
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								MODIFIED BY
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								MODIFIED ON
							</div>
						</th>
					</tr>
				</thead>
				{/* <tbody className="text-sm">
					{
						auditLogs
							.slice((curPageNumber - 1) * 10, curPageNumber * 10)
							.map((event: IAuditLogs, index: number) => (
								<tr key={index} className="border-b border-gray-200">
									<td className="py-5">
										<div className="flex justify-center">
											<IoEllipsisVerticalSharp />
										</div>
									</td>
									<td className="px-2">{event.Name}</td>
									<td className="px-2">{event.Description}</td>
									<td className="px-2">
										<div className="flex items-center gap-1 font-semibold">
											<div className={"border-2 w-2 h-2 rounded-full " + (event.IsActive ? 'border-[#1ed6bb]' : 'border-[#fb5656]')} />
											<Text text={event.IsActive ? 'Active' : 'Inactive'} weight="500" />
										</div>
									</td>
									<td className="px-2 text-right">{event.ModifiedBy}</td>
									<td className="px-2">{event.ModifiedOn}</td>
								</tr>
							))
					}
				</tbody> */}
			</table>
		</div>
	)
}

export default DataPanel