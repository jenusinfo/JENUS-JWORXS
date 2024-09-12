import { useRouter } from "next/router"
import { useFormDefinitionsDetail } from "providers/settings/FormDefinitions/FormDefinitionsDetailProvider"
import { useEffect, useState } from "react"
import Text from "shared/core/ui/Text"
import { FaRegCopy } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { BiSolidFileExport } from "react-icons/bi";
import Loading from 'react-loading'

const HeaderPanel = () => {

	const classes = {
		button: "flex items-center gap-2 text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit hover:bg-blue-100 transition-all duration-400"
	}
	const { push } = useRouter()
	const { formFullInfo, handleCopy, handleXmlSample, handleStart, isCopyLoading } = useFormDefinitionsDetail()

	const [left, setLeft] = useState<any>([])
	const [right, setRight] = useState<any>([])

	useEffect(() => {
		if (formFullInfo.length > 0) {
			setLeft([
				{ name: "Name", value: formFullInfo[0].Name },
				{ name: "Description", value: formFullInfo[0].Description },
				{ name: "Created By", value: formFullInfo[0].CreatedBy },
				{ name: "Modified By", value: formFullInfo[0].ModifiedBy },
				{ name: "Cover Page Form", value: formFullInfo[0].IsCoverPageInterviewForm ? 'Yes' : 'No' }
			])
			setRight([
				{ name: "Status", value: formFullInfo[0].IsActive ? 'Active' : 'Inactive' },
				{ name: "Checker Required", value: formFullInfo[0].IsCheckerRequired ? 'Yes' : 'No' },
				{ name: "Created On", value: new Date(formFullInfo[0].CreatedOn).toLocaleDateString('en-GB') },
				{ name: "Modified On", value: new Date(formFullInfo[0].ModifiedOn).toLocaleDateString('en-GB') }
			])
		}
	}, [formFullInfo])

	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between">
				<div className="flex items-center gap-1">
					<div onClick={() => push("/settings/form-definitions")}>
						<Text text="Interview Forms" size={14} weight="500" color="#2B8BE9" className="hover:cursor-pointer" />
					</div>
					<Text text=">>" size={14} weight="600" color="#2B8BE9" />
					<Text text={formFullInfo && formFullInfo[0] && formFullInfo[0].Name} size={14} weight="500" color="#275E93" />
				</div>
				<div className="flex gap-2">
					<button 
						className={classes.button}
						onClick={handleCopy}
					>
						{isCopyLoading ? <Loading type="spin" color="#2454de" width={24} height={24} /> : <><FaRegCopy /> Copy</>} 
					</button>
					<button 
						className={classes.button}
						onClick={handleXmlSample}
					>
						<BiSolidFileExport /> Xml Sample
					</button>
					<button 
						className={classes.button}
						onClick={handleStart}
					>
						<FaPlay /> Start
					</button>
				</div>
			</div>
			<div className="bg-white shadow-md p-6 flex gap-5">
				<div className="flex flex-col gap-1 w-full">
					{
						left.map((each: any, index: number) => (
							<div key={index} className="flex gap-5">
								<div className="basis-1/3"> <Text text={each.name} size={14} weight="600" color="#275E93" className="text-right" /> </div>
								<div className="basis-2/3"> <Text text={each.value} size={14} color="#275E93" /> </div>
							</div>
						))
					}
				</div>
				<div className="flex flex-col gap-1 w-full">
					{
						right.map((each: any, index: number) => (
							<div key={index} className="flex gap-5">
								<div className="basis-1/3"> <Text text={each.name} size={14} weight="600" color="#275E93" className="text-right" /> </div>
								<div className="basis-2/3"> <Text text={each.value} size={14} color="#275E93" /> </div>
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default HeaderPanel