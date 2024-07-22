import { useMyGroups } from "providers/dashboard/MyGroupsProvider"
import Text from "shared/core/ui/Text"
import { convertToRGB } from "shared/helper/common"
import { IGroup } from "types/dashboard"

const DataPanel = () => {

	const { groups } = useMyGroups()

	return (
		<div className="grid grid-cols-3 gap-4">
			{
				groups &&
				groups.map((group: IGroup, index: number) => (
					<div key={index} className="border border-[#DEDFEA] px-6 py-5 rounded-[4px] bg-white">
						<Text text={group.title} weight="700" />
						<Text text={group.description} size={12} />
						<div className="mt-4 relative h-[34px]">
							{
								group.people.map((person: string, i: number) => (
									<div key={i} className="flex items-center justify-center w-[34px] h-[34px] rounded-full absolute" style={{ backgroundColor: convertToRGB(i, person, 20), left: i*30 }}>
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