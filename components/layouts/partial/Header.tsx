import { useApp } from "providers/AppProvider";
import AddNew from "./Header/AddNew";
import Bell from "./Header/Bell";
import Message from "./Header/Message";

const Header = () => {

	const { headerText } = useApp()

	return (
		<div className="flex items-center justify-between py-4">
			<p className="text-3xl font-bold pl-12">{headerText}</p>
			<div className="flex items-center gap-4">
				<Bell />
				<Message />
				<AddNew />
			</div>
		</div>
	)
}

export default Header