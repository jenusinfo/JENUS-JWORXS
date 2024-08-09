import { useHookUser } from "hooks/UserHook"
import { useCabinet } from "providers/documents/CabinetProvider"
import { ChangeEvent, useState } from "react"
import FormSelect from "shared/core/components/FormSelect"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"

const AssignUserModal = ({ isOpen, handleClose }: {
    isOpen: boolean
    handleClose: () => void
}) => {

    const { users } = useHookUser()
    const [search, setSearch] = useState("")
    const [info, setInfo] = useState({asignee: ""})
    const { handleAssignUser } = useCabinet()

    const handleChange = (e: any) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    return (
        <RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
            <div className="p-5">
                <Text text="Assign document(s) to a user" size={16} weight="700" />
                <div className="mt-8">
                    <FormSelect
                        name="asignee"
                        label="Asignee"
                        info={info}
                        optionList={users?.map((user: any) => ({
                            value: user.Email+"&"+user.Id,
                            name: user.UserName
                        }))}
                        handleChange={handleChange}
                    />
                </div>
                <input className="border border-blue-100 px-4 py-2 focus:outline-none text-sm w-full mt-2" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="overflow-auto h-[calc(100vh-300px)] mt-3">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="text-left w-[175px]">Name</th>
                                <th className="text-left w-[170px]">Email</th>
                                <th className="text-left w-[170px]">Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users &&
                                users
                                .filter((user: any) => (
                                    user.UserName?.toLowerCase().includes(search?.toLowerCase())
                                    || user.Email?.toLowerCase().includes(search?.toLowerCase())
                                    || user.BankUnitName?.toLowerCase().includes(search?.toLowerCase())
                                ))
                                .map((user: any, index: number) => (
                                    <tr key={index}>
                                        <td className="max-w-[175px] truncate">{user.UserName}</td>
                                        <td className="max-w-[160px] truncate">{user.Email}</td>
                                        <td className="max-w-[150px] truncate">{user.BankUnitName}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-10">
					<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs" onClick={() => handleAssignUser(info.asignee.split("&")[0], info.asignee.split("&")[1])}>Assign</button>
				</div>
            </div>
        </RightSide>
    )
}

export default AssignUserModal