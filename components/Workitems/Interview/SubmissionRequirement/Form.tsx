import { useInterview } from "providers/dashboard/InterviewProvider";
import { useEffect, useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import Text from "shared/core/ui/Text";

const Form = () => {

	const [formList, setFormList] = useState([])
	const { formFullInfo, info } = useInterview()

	useEffect(() => {
		if (formFullInfo) {
			let temp: any = []
			formFullInfo[0].Sections.forEach((form: any) => {
				temp.push({
					id: form.Id,
					title: form.Label,
					isOpen: false
				})
			})
			setFormList(temp)
		}
	}, [formFullInfo])

	console.log(Object.entries(info))

	return (
		<div className="space-y-5">
			{
				formList.map((form: any, index: number) => (
					<div key={index}>
						<div className="flex items-center gap-4 hover: cursor-pointer" onClick={() => {
							let temp: any = [...formList]
							temp[index].isOpen = !temp[index].isOpen
							setFormList(temp)
						}}>
							{
								form.isOpen
									? <FaAngleDown />
									: <FaAngleRight />
							}
							<Text text={form.title} size={14} weight="700" className="capitalize" />
						</div>
						{
							form.isOpen &&
							<div className="w-[448px] flex flex-col gap-3 mt-4 ml-[30px]">
								{
									Object.entries(info).map(([key, value]: any, index) => (
										key == form.id && (
											Array.isArray(value)
											? value.map((item: any, k: number) => (
												Object.entries(item).map(([kiy, v]: any, l: number) => (
													<div key={l} className="flex justify-between">
														<Text text={kiy} size={14} color="black" />
														<Text text={v} size={14} weight="600" color="black" />
													</div>
												))
											))
											: Object.entries(value).map(([k, val]: any, j: number) => (
												<div key={j} className="flex justify-between">
													<Text text={k} size={14} color="black" />
													<Text text={val} size={14} weight="600" color="black" />
												</div>
											))
										)
									))
								}
							</div>
						}
					</div>
				))
			}
		</div>
	)
}

export default Form