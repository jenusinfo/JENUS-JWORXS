import { useApp } from "providers/AppProvider";
import Text from "shared/core/ui/Text";

export default function Logo() {

  const { isMinimize, setIsMinimize } = useApp()

  return (
    <div className={`
      flex items-center gap-3 
      w-full p-2 rounded-[5px] 
      hover:bg-[#f4f6ff] hover:cursor-pointer 
      transition duration-300 justify-center
      `}
      onClick={() => setIsMinimize(!isMinimize)}
    >
      <img src='/assets/jenus-symbol.png' width={24} height={20} />
      {/* {!isMinimize && <Text text="jWorxs" size={14} color="#2454DE" weight="600" />} */}
    </div>
  )
}