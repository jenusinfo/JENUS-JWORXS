import { IApplicationSettings, useApplicationSettings } from "providers/settings/ApplicationSettingsProvider"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { IoEllipsisVerticalSharp, IoRefresh } from "react-icons/io5"
import Text from "shared/core/ui/Text"

const DataPanel = () => {
	const { applicationSettings: data, curPageNumber, setCurPageNumber } = useApplicationSettings()

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
								KEY
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								VALUE
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{
						data
							.slice((curPageNumber - 1) * 10, curPageNumber * 10)
							.map((inbox: IApplicationSettings, index: number) => (
								<tr key={index} className="border-b border-gray-200">
									<td className="py-5">
										<div className="flex justify-center">
											<IoEllipsisVerticalSharp />
										</div>
									</td>
									<td className="px-2 text-right">{inbox.key}</td>
									<td className="px-2 text-[#FB5656]">{inbox.value}</td>
								</tr>
							))
					}
				</tbody>
			</table>
		</div>
	)
}

export default DataPanel