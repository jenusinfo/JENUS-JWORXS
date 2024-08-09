import { useEffect, useRef, useState } from "react"
import Text from "../ui/Text"

interface IFormSelect {
	label: string
	name: string
	info: any
	handleMultiChange: any
	optionList: any
	zIndex: number
}

export default function FormMultiSelect({
	label,
	name,
	info,
	handleMultiChange,
	optionList,
	zIndex
}: IFormSelect) {

	const classes = {
		form: 'flex flex-col gap-1'
	}
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: any) => {
		const ref: any = dropdownRef.current

		if (ref && !ref.contains(event.target)) {
			setIsOpen(false);
		}
	};

	const isOptionSelected = (id: any) => {
		let flag = 0

		info[`${name}`]?.forEach((item: any) => {
			if (item.Id == id) {
				flag = 1
			}
		})

		if (flag == 0)
			return false
		else if (flag == 1)
			return true
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className={classes.form}>
			<Text text={label} color="#84858c" />
			<div className={"relative"} style={{ zIndex }} ref={dropdownRef}>
				<div onClick={toggleDropdown}>
					<div className="border border-gray-200 rounded-[4px] px-2 py-2 flex items-center" style={{ height: 34 }}>
						{
							info[`${name}`]?.map((option: any, index: number) => (
								<Text key={index} text={`${option.Name}${index == info[`${name}`].length-1 ? '' : ','}`} />
							))
						}
					</div>
				</div>
				{isOpen && (
					<div className='absolute bg-white border border-red-600 rounded-[4px] px-2 py-2 w-full' style={{ left: 0, top: 36 }}>
						{
							optionList.map((option: any, index: number) => (
								<div 
									key={index} 
									className={"px-2 hover:cursor-pointer hover:bg-blue-100 text-sm "}
									style={{ paddingTop: 4, paddingBottom: 4, backgroundColor: isOptionSelected(option.value) ? "#eeeeff" : "" }} 
									onClick={() => handleMultiChange(name, option)}
								>
									{option.name}
								</div>
							))
						}
					</div>
				)}
			</div>
		</div>
	)
}