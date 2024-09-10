import { useRouter } from "next/router"
import { useApp } from "providers/AppProvider"
import { useMyGroups } from "providers/dashboard/MyGroupsProvider"
import Text from "shared/core/ui/Text"
import { convertToRGB } from "shared/helper/common"
import { IGroup, IInbox } from "types/dashboard"

const DataPanel = () => {

	const { push } = useRouter()
	const { groups, workitems } = useMyGroups()
	const { setGroup } = useApp()

	return (
		<div className="grid grid-cols-3 gap-4 mt-8">
			{
				groups &&
				groups.map((group: string, index: number) => (
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
						<div className="flex justify-end mt-6">
							<div className="hover:cursor-pointer" 
								onClick={() => {
								push(`/workitems`)
								setGroup(group)
							}}>
								<Text text="VIEW" size={16} color="#0146C5" weight="600" className="hover:underline" />
							</div>
						</div>
						{/* <Text text={`${group.Description}`} size={12} /> */}
						{/* <div className="mt-6 relative h-[34px]">
							{
								["BB", "DL", "KM", "+13"].map((person: string, i: number) => (
									<div key={i} className="flex items-center justify-center w-[34px] h-[34px] rounded-full absolute" style={{ backgroundColor: convertToRGB(i, person, 20), left: i * 30 }}>
										<Text text={person} size={12} weight="600" color={convertToRGB(i, person)} />
									</div>
								))
							}
						</div> */}
					</div>
				))
			}
		</div>
	)
}

export default DataPanel