import DataPanel from "./DataPanel"
import { Header } from "./Header"

const MyFavoriteForms = () => {
    return (
        <div className="bg-white rounded-[8px] px-4 py-6 h-[453px] overflow-y-auto">
            <Header />
            <DataPanel />
        </div>
    )
}

export default MyFavoriteForms