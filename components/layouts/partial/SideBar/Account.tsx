import { useRouter } from "next/router";
import { useApp } from "providers/AppProvider";
import DropDown from "shared/core/ui/Dropdown";
import Text from "shared/core/ui/Text";
import { eraseCookie } from "shared/helper/tokens";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

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
    <div className="flex items-center absolute bottom-10" style={{ zIndex: 102 }}>
      <DropDown
        target={
          <div className="flex items-center gap-4 hover:cursor-pointer">
            <div>
              <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center border-2 border-[#FF7B93]">
                <Text text={account.firstName[0] + account.lastName[0]} size={12} color="#FF7B93" />
              </div>
            </div>
            {/* {!isMinimize && <div>
              <p className="text-primary text-sm w-[115px] truncate">Hi,
                <span className="font-semibold">{account.firstName + " " + account.lastName}</span>
              </p>
            </div>} */}
          </div>
        }
        left={38}
        top={-145}
        open={open}
        setOpen={setOpen}
      >
        <div className="w-[297px]">
          <div className="bg-[#F0F1F1] px-5 py-3 flex justify-between items-center rounded-t-[4px]">
            <div className="w-10 h-10 bg-[#FF7B93] rounded-full flex items-center justify-center">
              <Text text={account.firstName[0] + account.lastName[0]} size={12} color="#FBFBFB" />
            </div>
            <IoMdClose className="hover:cursor-pointer" onClick={() => setOpen(false)} />
          </div>
          <div className="border border-[#F0F1F1] bg-white rounded-b-[4px]">
            <div className="pt-4 pl-5 flex items-center gap-3">
              <Text text="My Account & Settings" weight="500" color="#3F4044" />
            </div>
            <div className="px-5 py-4 flex justify-end">
              <button className="rounded-[4px] px-5 py-2.5 bg-[#2454DE] hover:bg-blue-500 transition-all duration-400" onClick={handleLogout}>
                <Text text="Log out" weight="500" color="#FBFBFB" className="whitespace-nowrap" />
              </button>
            </div>
          </div>
        </div>
      </DropDown>
    </div>
  )
}