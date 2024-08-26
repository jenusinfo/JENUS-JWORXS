import { useState } from "react";
import { CiSquareAlert } from "react-icons/ci";
import Text from "shared/core/ui/Text";
import { Icon } from "shared/icons";
import ExtraDataPanel from "./Extra";
import Form from "./Form";
import Flow from "./Flow";
import { useInterview } from "providers/dashboard/InterviewProvider";

const SubmissionRequirement = () => {

	const tabs = [
		{ Icon: (props: any) => <Icon type="form" fill={props.fill} />, name: "Form" },
		{ Icon: (props: any) => <Icon type="document" fill={props.fill} />, name: "Documents" },
		{ Icon: (props: any) => <Icon type="flow" fill={props.fill} />, name: "Flow" },
		{ Icon: (props: any) => <Icon type="activity" fill={props.fill} />, name: "Activity" }
	]
	const [curTab, setCurTab] = useState("Form")
	const { formFullInfo } = useInterview()

	return (
		<div>
			<div className="bg-[#EEF0FE]">
				<div className="w-[1000px] flex items-center gap-4 mx-auto py-[10px]">
					<CiSquareAlert size={24} color="#2454DE" />
					<Text text="Flow Activity Submission Requirement" size={14} weight="600" />
					<Text text="Please select a rouing decision from the Flow Tab." size={12} color="#606168" />
				</div>
			</div>
			<div className="mt-3 mx-auto w-[1000px]">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-1.5">
						<div className="w-2 h-2 border-2 border-blue-600 rounded-full" />
						<div className="flex items-center gap-3">
							<Text text="In Progress" size={14} weight="500" />
							<Text text="|" size={8} weight="500" />
							<Text text="Pending on Initiator" size={14} weight="500" />
							<Text text="|" size={8} weight="500" />
							<Text text={`ID ${formFullInfo[0].Id}`} size={14} weight="500" />
						</div>
					</div>
					<Text text={formFullInfo[0].Name} size={28} weight="700" />
					<Text text={formFullInfo[0].Description} size={14} color="#3F4044" />
				</div>
				<div className="flex justify-between mt-10">
					<div className="space-y-8">
						<div className="flex gap-4">
							{
								tabs.map((tab, index) => (
									<div 
										key={index} 
										className={"px-1 pb-2 hover:cursor-pointer flex items-center gap-2 " + (curTab == tab.name ? 'border-b-2 border-blue-600' : '')} 
										onClick={() => setCurTab(tab.name)}
									>
										<tab.Icon fill={curTab == tab.name ? "#2454DE" : "#3F4044"} />
										<Text text={tab.name} size={14} weight="500" color={curTab == tab.name ? "#2454DE" : "#3F4044"} />
									</div>
								))
							}
						</div>
						{curTab == "Form" && <Form />}
						{curTab == "Flow" && <Flow />}
					</div>
					<ExtraDataPanel />
				</div>
			</div>
		</div>
	)
}

export default SubmissionRequirement