import { useMyGroups } from "providers/dashboard/MyGroupsProvider"
import Text from "shared/core/ui/Text"
import { convertToRGB } from "shared/helper/common"
import { IGroup, IInbox } from "types/dashboard"
import Loading from 'react-loading'

const DataPanel = () => {

	const { groups, loading, workitems } = useMyGroups()

	return (
		<>
			{
				loading
					? <div className="w-full h-[220px] flex justify-center items-center">
						<Loading type="spin" color="#0146c5" />
					</div>
					: <div className="grid grid-cols-3 gap-4">
						{
							groups &&
							groups.map((group: string, index: number) => (
								index < 6 &&
								<div
									key={index}
									className="border border-[#DEDFEA] px-6 py-5 rounded-[4px] bg-white transition-all duration-400 hover:shadow-lg hover:scale-[1.05] hover:bg-blue-100"
								>
									<Text text={group} size={18} weight="700" />
									<div className="flex items-center gap-3">
										<Text text={`${workitems.filter((each: IInbox) => each.HashTags.includes(group)).length} workitems`} size={14} />
										<Text text="|" size={12} />
										<Text text={`${workitems.filter((each: IInbox) => each.HashTags.includes(group) && each.StatusCode == "InProgress").length} in progress`} size={14} />
									</div>
									{/* <div className="flex justify-end mt-6">
										<div className="hover:cursor-pointer"
											onClick={() => {
												push(`/workitems`)
												setGroup(group)
											}}>
											<Text text="VIEW" size={16} color="#0146C5" weight="600" className="hover:underline" />
										</div>
									</div> */}
								</div>
							))
						}
					</div>
			}
		</>
	)
}

export default DataPanel