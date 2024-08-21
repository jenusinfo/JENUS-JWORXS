import IdentificationDetails from "./Details/IdentificationDetails"
import PersonalDetails from "./Details/PersonalDetails"
import MenuPanel from "./MenuPanel"

const InterviewAccount = () => {
	return (
		<div className="flex gap-20 pt-20 px-40">
			<MenuPanel />
			<div className="h-[calc(100vh-300px)] overflow-y-auto pr-8 py-6 flex flex-col gap-10 w-[484px]">
				<PersonalDetails />
				<IdentificationDetails />
			</div>
		</div>
	)
}

export default InterviewAccount