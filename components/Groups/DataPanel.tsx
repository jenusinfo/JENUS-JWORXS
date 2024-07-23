import { useRouter } from "next/router"
import { useApp } from "providers/AppProvider"
import { useMyGroups } from "providers/dashboard/MyGroupsProvider"
import Text from "shared/core/ui/Text"
import { convertToRGB } from "shared/helper/common"
import { IGroup } from "types/dashboard"

const DataPanel = () => {

	const { push } = useRouter()
	const { groups } = useMyGroups()
	const { setGroup } = useApp()

	return (
		<div className="grid grid-cols-3 gap-4 mt-8">
			{
				groups &&
				groups.map((group: IGroup, index: number) => (
					<div
						key={index}
						className="border border-[#DEDFEA] px-6 py-5 rounded-[4px] bg-white hover:cursor-pointer"
						onClick={() => {
							push(`/groups/${group.Name.toLowerCase().replaceAll(" ", "-")}`)
							setGroup(group)
						}}
					>
						<Text text={group.Name} size={18} weight="700" />
						<Text text={`${group.Description}`} size={12} />
						<div className="mt-6 relative h-[34px]">
							{
								["BB", "DL", "KM", "+13"].map((person: string, i: number) => (
									<div key={i} className="flex items-center justify-center w-[34px] h-[34px] rounded-full absolute" style={{ backgroundColor: convertToRGB(i, person, 20), left: i * 30 }}>
										<Text text={person} size={12} weight="600" color={convertToRGB(i, person)} />
									</div>
								))
							}
						</div>
					</div>
				))
			}
		</div>
	)
}

export default DataPanel