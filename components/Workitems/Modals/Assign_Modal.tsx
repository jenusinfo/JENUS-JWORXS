import Modal from "shared/core/ui/Modal"
import Text from "shared/core/ui/Text"
import { useHookUsers } from '../../../hooks/Settings/UsersHook';
import { useWorkitem } from "providers/dashboard/WorkitemProvider";
import { FaAddressBook } from "react-icons/fa";
import { useState } from "react";
import DropDown from "shared/core/ui/Dropdown";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const AssignModal = ({ isOpen, handleClose }: {
	isOpen: boolean,
	handleClose: () => void
}) => {

	const { setCurAssignee, handleAssign } = useWorkitem()
	const { users } = useHookUsers()
	const [search, setSearch] = useState("")

	return (
		<Modal isOpen={isOpen} handleClose={handleClose} width={440}>
			<div className="p-5">
				<Text text="Assign" size={16} color="#202124" weight="700" />
				<div className="mt-8">
					<Text text="Asignee" size={14} color="#84858C" />
					<DropDown
						target={<div className="relative">
							<input className="border-b border-gray-200 pb-2 focus:outline-none w-full text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
							<IoCloseSharp size={12} className="absolute right-8 top-0 hover:cursor-pointer" onClick={() => setSearch("")} />
							<IoIosArrowDown size={12} className="absolute right-2 top-0" />
						</div>}
					>
						<div className="overflow-y-auto h-[300px] bg-white w-[400px] bg-white border border-blue-100">
							{
								users &&
								users
									.filter((user: any) => user.BankUnitName !== "Head Office"
										&& ((user.FirstName + " " + user.LastName).toLowerCase().includes(search.toLowerCase())
											|| user.UserName?.toLowerCase().includes(search.toLowerCase())
											|| user.BankUnitName?.toLowerCase().includes(search.toLowerCase()))
									)
									.map((user: any, index: number) => (
										<div key={index} className="hover:cursor-pointer hover:bg-blue-100 transition-all duration-300" onClick={() => {setSearch(user.FirstName + " " + user.LastName); setCurAssignee(user)}}>
											<div className="px-3 py-2 text-xs text-[#275E93] border-b border-gray-100">{user.FirstName + " " + user.LastName}</div>
										</div>
									))
							}
						</div>
					</DropDown>
				</div>
				<div className="mt-12 flex justify-end gap-1">
					<button className="text-[#0146C5] bg-[#EEF0FE] rounded-[5px] px-6 py-2.5 h-fit text-sm" onClick={handleClose}>Cancel</button>
					<button className="text-white bg-[#0146C5] rounded-[5px] px-5 py-2.5 h-fit text-sm" onClick={async () => {await handleAssign(); await handleClose()}}>Save</button>
				</div>
				{/* <input className="shadow-md px-5 py-4 focus:outline-none w-full text-sm" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} /> */}

			</div>
		</Modal>
	)
}

export default AssignModal