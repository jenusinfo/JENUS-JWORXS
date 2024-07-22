import { useRouter } from "next/router"
import { IMenu, useApp } from "providers/AppProvider"
import { useState } from "react"
import { FaCaretDown, FaCaretLeft } from "react-icons/fa"
import Text from "shared/core/ui/Text"

const Menu = () => {

  const { pathname, push } = useRouter()
  const { MENULIST } = useApp()

  return (
    <div className="mt-16 flex flex-col gap-2 w-full">
      {
        MENULIST.map((item: IMenu, index: number) => (
          <div key={index} className={"px-6 py-2 flex items-center gap-2 hover:cursor-pointer hover:bg-[#F0F3FB] rounded-[5px] " + (pathname == item.link ? "bg-[#e6f3ff]" : "")} onClick={() => push(item.link)}>
            <item.Icon fill={pathname == item.link ? "#0146C5" : "#84858C"} />
            <Text text={item.name} color={pathname == item.link ? "#0146C5" : "#84858C"} weight="600" />
          </div>
        ))
      }
    </div>
  )
}

export default Menu