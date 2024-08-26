import { Header } from "./Header";
import { Middleware } from "./Middleware";
import Table from "./Table";

const MyWorkitems = () => {

  return (
    <div className="bg-white rounded-[8px] px-4 py-6 h-[412px]">
      <Header />
      <Middleware />
      <Table />
    </div>
  )
}

export default MyWorkitems