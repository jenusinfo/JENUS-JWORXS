import { useCabinet } from "providers/documents/CabinetProvider"
import { ChangeEvent, useState } from "react"
import Input from "shared/core/components/Input"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const ReleaseEmailModal = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const [info, setInfo] = useState({email: ""})
	const { checkedList, handleReleaseEmail } = useCabinet()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="p-5">
				<Text text="Release Email" size={16} weight="700" />
				<Text text={checkedList.length + " records selected"} size={14} color="#606168" />
				<Text text="Are you sure you want to release an email for the document(s) selected?" size={16} color="black" className="mt-8" />
				<Text text="An email will be sent with the document(s) selected." size={16} color="black" className="mt-4" />
				<Text text="Please provide the Email Address for the document(s) where Send To Email is missing or invalid. User comma (,) separator for multiple recipients." size={14} color="#84858C" className="mt-4" />
				<input className="mt-2 border border-blue-100 rounded-[4px] text-sm w-full focus:outline-none px-3 py-2" name="email" value={info.email} onChange={handleChange} />
				<div className="flex justify-end mt-10">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={() => handleReleaseEmail(info.email)}>Release</button>
				</div>
			</div>
		</RightSide>
	)
}

export default ReleaseEmailModal