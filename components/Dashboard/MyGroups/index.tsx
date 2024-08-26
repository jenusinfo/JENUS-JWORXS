import DataPanel from "./DataPanel"
import { Header } from "./Header"

const MyGroups = () => {
  return (
    <div className="bg-white rounded-[8px] px-4 pt-3 pb-6 h-[304px] overflow-y-auto">
      <Header />
      <DataPanel />
    </div>
  )
}

export default MyGroups