import { useRouter } from "next/router"
import { IMenu, useApp } from "providers/AppProvider"
import Text from "shared/core/ui/Text"
import Tooltip from "shared/core/ui/Tooltip"

const Menu = () => {

  const { pathname, push } = useRouter()
  const { MENULIST, isMinimize, setIsMinimize } = useApp()

  return (
    <div className="mt-16 flex flex-col gap-2 w-full">
      {
        MENULIST.map((item: IMenu, index: number) => (
          <Tooltip
            component={
              <div key={index} className={`
                px-6 py-2 flex items-center gap-2 hover:cursor-pointer hover:bg-[#F0F3FB] rounded-[5px] transition duration-500 ease-in-out 
              ` + (isMinimize ? 'justify-center ' : '')
                + (pathname == item.link ? "bg-[#e6f3ff]" : "")} onClick={() => push(item.link)}
              >
                <item.Icon fill={pathname == item.link ? "#0146C5" : "#84858C"} />
                {!isMinimize && <Text text={item.name} color={pathname == item.link ? "#0146C5" : "#84858C"} weight="600" />}
              </div>
            }
          >
            {isMinimize && <div className="bg-gray-900 rounded-[4px] px-3 py-2 relative">
              <div className="absolute -left-1 top-3.5 bg-gray-900 w-2 h-2 rotate-45" />
              <Text text={item.name} color={"white"} weight="600" />
            </div>}
          </Tooltip>
        ))
      }
    </div>
  )
}

export default Menu