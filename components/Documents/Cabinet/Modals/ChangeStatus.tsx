import { useCabinet } from "providers/documents/CabinetProvider"
import { useEffect, useState } from "react"
import RadioButton, { RADIO_STATUS } from "shared/core/ui/RadioButton"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"
import { getNextStatuses } from "shared/helper/common"
import DOCSTATUS from 'shared/static/DOCSTATUS.json';

const ChangeStatusModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const STATUSLIST = [DOCSTATUS.REVIEWED, DOCSTATUS.CHECKED, DOCSTATUS.PENDINGORIGINALS, DOCSTATUS.ARCHIVE, DOCSTATUS.UNARCHIVE, DOCSTATUS.CANCEL, DOCSTATUS.UNCANCELLED]

	const { handleChangeStatus, checkedList, searchDocuments, targetStatus, setTargetStatus} = useCabinet()
	const [curData, setCurData] = useState<any>()
	const [availableStatuses, setAvailableStatuses] = useState<any>([])

	useEffect(() => {
		if (checkedList.length > 0 && searchDocuments.length > 0) {
			let temp = searchDocuments.filter((each: any) => each.properties.id == checkedList[0])[0]
			setCurData(temp)
			let tmp: any = getNextStatuses(temp.keys.status)
			setAvailableStatuses(tmp)
		}
	}, [checkedList, searchDocuments])

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="p-5">
				<Text text="Change Status" size={16} weight="700" />
				<Text text={checkedList.length + " records selected"} size={14} color="#606168" />
				<div className="flex flex-col gap-8 mt-8">
					{
						curData &&
						STATUSLIST.map((each: string, index: number) => (
							<div key={index} className="flex items-center gap-3">
								<RadioButton status={
									curData.keys.status == each
										? RADIO_STATUS.SELECTED
										: targetStatus == each
										? RADIO_STATUS.CHECKED
										: availableStatuses.includes(each)
											? RADIO_STATUS.ENABLE
											: RADIO_STATUS.DISABLE
								} onClick={availableStatuses.includes(each) ? () => setTargetStatus(each) : () => {}} />
								<Text text={each} size={14} weight="500" />
							</div>
						))
					}
				</div>
				<Text text={"Note: Statuses that apply are active only."} size={14} weight="500" className="mt-10" />
				
				<div className="flex justify-end mt-10">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={() => handleChangeStatus(curData, targetStatus)}>Add to Box</button>
				</div>
			</div>
		</RightSide>
	)
}

export default ChangeStatusModal