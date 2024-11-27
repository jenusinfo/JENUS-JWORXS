import { useInterview } from "providers/dashboard/InterviewProvider"
import { MdOutlineChevronRight } from "react-icons/md"
import Text from "shared/core/ui/Text"

const MenuPanel = () => {

	const { formStructure, step, info } = useInterview()

	if (!formStructure || !info) {
		return <></>
	}

	// console.log(formStructure, info)

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
								<div className="flex justify-between items-center py-2 hover:cursor-pointer hover:bg-blue-50 pl-2" onClick={() => handleScrollToSection(section.uniqueId + j)}>
									<Text text={section.label} size={14} weight="600" color="#202124" className="truncate whitespace-nowrap" />
									<div>
										<MdOutlineChevronRight />
									</div>
								</div>
								<SubSection
									controls={section.controls}
									handleScrollToSection={handleScrollToSection}
									index={1}
									info={section.globalId ? info[section.globalId] : info}
									parentIndex={j.toString()}
								/>
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

const SubSection = ({ controls, handleScrollToSection, index, info, parentIndex }: {
	controls: any
	handleScrollToSection: any
	index: number
	info: any
	parentIndex: string
}) => {

	const { formStructure } = useInterview()

	const getValue = (tagName: string, i: number, gId: string) => {
		let globalId = ""

		const getGlobalId = (controls: any) => {
			controls.forEach((control: any) => {
				if (control.tagName == tagName) {
					globalId = control.globalId
					return;
				}

				if (control.controls)
					getGlobalId(control.controls)
			})
		}

		getGlobalId(formStructure.controls)

		return globalId ? info[gId][i][globalId] : ""
	}

	const setRepeatedLabel = (label: string, i: number, gId: string) => {
		let devidedString = "{{"
		let index = label.indexOf(devidedString)
		let defaultString = index != -1 ? label.substring(0, index) : label

		if (index == -1) {
			return defaultString + " - " + (i + 1)
		} else {
			const regex = /{{(.*?)}}/;
			const match = label.match(regex);
			return defaultString + getValue(match ? match[1] : "", i, gId)
		}
	}

	return (
		<>
			{
				controls.map((control: any, k: number) => (
					<>
						{
							(
								control.isRepeatable
									? [...Array(control.repeatLimit
										? control.repeatLimit
										: info[control.globalId]
											? info[control.globalId].length
											: 0
									)]
									: [...Array(1)]
							).map((_, i: number) => (
								<>
									{control.type == "repeater" && <div
										className="flex justify-between items-center py-2 hover:cursor-pointer hover:bg-blue-50"
										style={{ paddingLeft: 8 * (control.nestingLevel) + 8 }}
										onClick={() => handleScrollToSection(control.uniqueId + parentIndex + i)}
									>
										<Text text={control.label} size={14} weight="600" color="#202124" className="capitalize truncate whitespace-nowrap" />
										<div>
											<MdOutlineChevronRight />
										</div>
									</div>}
									{
										control.type == "section" && control.repeatLabel &&
										<div
											className="flex justify-between items-center py-2 hover:cursor-pointer hover:bg-blue-50"
											style={{ paddingLeft: 8 * (control.nestingLevel) + 8 }}
											onClick={() => handleScrollToSection(control.uniqueId + parentIndex + i)}
										>
											<Text text={setRepeatedLabel(control.repeatLabel, i, control.globalId)} size={14} weight="600" color="#202124" className="truncate whitespace-nowrap" />
											<div>
												<MdOutlineChevronRight />
											</div>
										</div>
									}
									{
										control.type == "section" || control.type == "repeater"
											? <SubSection
												controls={control.controls}
												handleScrollToSection={handleScrollToSection}
												index={index + 1}
												info={control.isRepeatable ? info[control.globalId][i] : control.globalId ? info[control.globalId] : info}
												parentIndex={parentIndex+i.toString()}
											/>
											: <></>
									}
								</>
							))
						}
					</>
				)
				)
			}
		</>
	)
}

export default MenuPanel