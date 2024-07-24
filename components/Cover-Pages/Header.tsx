import { CiSearch } from "react-icons/ci"
import DropDown from "shared/core/ui/Dropdown"
import Text from "shared/core/ui/Text"

const CoverPagesHeader = () => {

	const classes = {
		input: "focus:outline-none text-sm w-[378px] bg-transparent"
	}

	return (
		<div className="flex justify-between border-b border-[#DEDFEA] pb-4">
			<div className="flex flex-col gap-2">
				<Text text="Cover Pages" size={28} weight="700" />
				<p className="text-sm">377 Open Pages | Updated 43 min ago</p>
			</div>
			<div className="flex gap-2">
				<DropDown
					target={<div className="border border-[#c9cffb] rounded-[4px] px-3.5 py-2.5 flex items-center gap-2 h-fit">
						<CiSearch size={20} />
						<input className={classes.input} placeholder="Search" />
					</div>}
					left={-62}
				>
					<div className="shadow-md bg-white">
						<div className="p-8 flex flex-col gap-4 border-t border-[#2454de] w-[500px]">
							<Text text="Advanced Search" size={16} weight="700" />

							<div className="flex gap-4">
								<div className="flex flex-col gap-1.5 w-full">
									<Text text="Status" size={14} color="#606168" />
									<select className="border border-[#c9cffb] px-3.5 py-2.5 rounded-[4px]">
										<option>Closed</option>
										<option>Open</option>
									</select>
								</div>
								<div className="flex flex-col gap-1.5 w-full">
									<Text text="Type" size={14} color="#606168" />
									<select className="border border-[#c9cffb] px-3.5 py-2.5 rounded-[4px]">
										<option>All</option>
									</select>
								</div>
							</div>

							<div className="flex flex-col gap-1.5 w-full">
								<Text text="Unit" size={14} color="#606168" />
								<select className="border border-[#c9cffb] px-3.5 py-2.5 rounded-[4px]">
									<option>001-NICOSIA MAIN</option>
								</select>
							</div>

							<div className="flex gap-4">
								<div className="flex flex-col gap-1.5">
									<Text text="Date Range" size={14} color="#606168" />
									<input type="date" className="border border-[#c9cffb] px-3.5 py-2.5 rounded-[4px] w-[212px] focus:outline-none" />
								</div>
								<div className="flex flex-col gap-1.5">
									<Text text="Range Can be only 3 months" size={14} color="#606168" />
									<input type="date" className="border border-[#c9cffb] px-3.5 py-2.5 rounded-[4px] w-[212px] focus:outline-none" />
								</div>
							</div>

							<div className="flex flex-col gap-1.5 w-full">
								<Text text="Barcode Type" size={14} color="#606168" />
								<select className="border border-[#c9cffb] px-3.5 py-2.5 rounded-[4px]">
									<option>All</option>
									<option>Batch Cover Page</option>
									<option>Box Cover Page</option>
								</select>
							</div>
						</div>
						<div className="px-4 py-[10px] flex justify-end gap-2">
							<button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit">Clear Filter</button>
							<button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit">Show</button>
						</div>
					</div>
				</DropDown>
				<button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit">Export As</button>
				<button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit">Scan Barcode</button>
				<button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit">Start Page</button>
			</div>
		</div>
	)
}

export default CoverPagesHeader