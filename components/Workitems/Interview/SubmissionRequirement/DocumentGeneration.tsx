import { useInterview } from "providers/dashboard/InterviewProvider"
import RightSide from "shared/core/ui/RightSide"
import Text from "shared/core/ui/Text"
import { Icon } from "shared/icons"
import { IFormDocument } from "types/document"

const DocumentGenerationRightSide = ({ isOpen, handleClose }: {
	isOpen: boolean
	handleClose: () => void
}) => {

	const { documentConfigurations, handleGenerateDocument } = useInterview()

	return (
		<RightSide isOpen={isOpen} handleClose={handleClose} width={540}>
			<div className="rounded-[2px] py-5">
				<div className="pb-6 border-b border-gray-100" />
				<div className="mt-10 flex flex-col gap-4 px-10">
					<Text text="Generate Documents" size={16} weight="700" />
					<div className="flex justify-between">
						<Text text="Available Documents" size={14} weight="700" />
						<Text text="Generate Selected" size={14} weight="500" color="#2454DE" />
					</div>
					<div>
						{
							documentConfigurations.map((doc: IFormDocument, index: number) => (
								<div key={index} className="py-5 flex items-center gap-4 px-1">
									<input type="checkbox" />
									<div> <Icon type="doc" /> </div>
									<div>
										<Text text={doc.Caption} size={14} weight="600" color="black" />
										<div className="flex items-center gap-2 mt-0.5">
											<Text text="English Version" size={12} color="#606168" />
											<Text text="|" size={6} color="#606168" />
											<Text text="Template 11330-12" size={12} color="#606168" />
										</div>
										<Text text={doc.Description} size={12} color="#606168" />
									</div>
									<button className="text-white bg-[#2454de] rounded-[4px] px-4 py-2 h-fit text-xs ml-auto" onClick={() => handleGenerateDocument(doc.Id)}>Generate</button>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</RightSide>
	)
}

export default DocumentGenerationRightSide