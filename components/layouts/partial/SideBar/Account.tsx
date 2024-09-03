import { useRouter } from "next/router";
import { useApp } from "providers/AppProvider";
import DropDown from "shared/core/ui/Dropdown";
import Text from "shared/core/ui/Text";
import { eraseCookie } from "shared/helper/tokens";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function Account() {

  const { push } = useRouter()
  const { account, isMinimize, setIsMinimize } = useApp()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    eraseCookie("token")
    eraseCookie("user")
    push("/")
  }

  if (!account) {
    return (<></>)
  }

  return (
    <div className="flex items-center absolute bottom-10">
      <DropDown
        target={
          <div className="flex items-center gap-4 hover:cursor-pointer">
            <div>
              <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Text text={account.firstName[0] + account.lastName[0]} size={12} color="#FF7B93" />
              </div>
            </div>
            {!isMinimize && <div>
              <p className="text-primary text-sm w-[115px] truncate">Hi,
                <span className="font-semibold">{account.firstName + " " + account.lastName}</span>
              </p>
            </div>}
          </div>
        }
        left={0}
        top={-50}
        setOpen={setOpen}
      >
        <div className="bg-white border border-blue-100 rounded-[4px] px-1 py-1 w-[171px]">
          <div className="px-3 py-1 hover:bg-blue-100 hover:cursor-pointer transition-all duration-400 flex items-center gap-2" onClick={handleLogout}>
            <FiLogOut />
            <Text text="Log out" className="whitespace-nowrap" />
          </div>
        </div>
      </DropDown>
    </div>
  )
}