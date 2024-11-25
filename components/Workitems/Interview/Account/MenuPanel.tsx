import { useInterview } from "providers/dashboard/InterviewProvider"
import { MdOutlineChevronRight } from "react-icons/md"
import Text from "shared/core/ui/Text"

const MenuPanel = () => {

	const { formFullInfo, formStructure, sectionRefs, step } = useInterview()

	if (!formStructure) {
		return <></>
	}

	const handleScrollToSection = (sectionId: any) => {
		const ref: any = document.getElementById(sectionId)
		ref.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-4">
				{step != 4 && <Text text={formStructure?.InterviewFormName || ""} size={14} weight="600" className="uppercase" />}
				<div className={"overflow-y-auto " + (step == 4 ? "h-[calc(100vh-400px)]" : "h-[calc(100vh-300px)]")}>
					{
						formStructure.controls.map((section: any, j: number) => (
							!section.isHidden &&
							<div key={j} className="flex flex-col">
								{
									((j > 0 && section.groupHeading != formStructure.controls[j - 1].groupHeading && section.groupHeading != null) || j == 0)
									&& <Text text={section.groupHeading} size={11} color="#606168" className="uppercase pt-5" />
								}
								<div className="flex justify-between items-center py-2 hover:cursor-pointer hover:bg-blue-50 pl-2" onClick={() => handleScrollToSection(section.Id)}>
									<Text text={section.label} size={14} weight="600" color="#202124" className="capitalize truncate whitespace-nowrap" />
									<div>
										<MdOutlineChevronRight />
									</div>
								</div>
								<SubSection controls={section.controls} handleScrollToSection={handleScrollToSection} index={1} />
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

const SubSection = ({ controls, handleScrollToSection, index }: {
	controls: any
	handleScrollToSection: any
	index: number
}) => {
	return (
		<>
			{
				controls.map((control: any, k: number) => (
					<>
						{control.type == "repeater" && <div 
							className="flex justify-between items-center py-2 hover:cursor-pointer hover:bg-blue-50" 
							style={{ paddingLeft: 8 * (control.nestingLevel) + 8 }}
							onClick={() => handleScrollToSection(control.Id)}
						>
							<Text text={control.label} size={14} weight="600" color="#202124" className="capitalize truncate whitespace-nowrap" />
							<div>
								<MdOutlineChevronRight />
							</div>
						</div>}
						{control.type == "section" && control.repeatLabel && <div 
							className="flex justify-between items-center py-2 hover:cursor-pointer hover:bg-blue-50" 
							style={{ paddingLeft: 8 * (control.nestingLevel) + 8 }}
							onClick={() => handleScrollToSection(control.Id)}
						>
							<Text text={control.repeatLabel} size={14} weight="600" color="#202124" className="capitalize truncate whitespace-nowrap" />
							<div>
								<MdOutlineChevronRight />
							</div>
						</div>}
						{
							control.type == "section" || control.type == "repeater"
							? <SubSection controls={control.controls} handleScrollToSection={handleScrollToSection} index={index + 1} />
							: <></>
						}
					</>
				))
			}
		</>
	)
}

export default MenuPanel