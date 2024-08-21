import { useCabinet } from "providers/documents/CabinetProvider";
import { FaAngleDown, FaAngleRight, FaEllipsis } from "react-icons/fa6";
import { IoEllipsisVerticalSharp, IoFilter } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import Text from "shared/core/ui/Text";
import { Icon } from "shared/icons";
import { MdDeleteSweep } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";
import DropZone from "./DropZone";
import DragItem from "./DragItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import DeleteModal from "./Modals/Delete";
import ChangeStatusModal from "./Modals/ChangeStatus";

export function DocumentDataPanel() {

	const { HEADERS, searchDocuments, statusData, viewMode } = useCabinet()

	return (
		<div className="">
			{viewMode == "LIST" && <div className="flex">
				{
					HEADERS.map((header: any, index: number) => (
						<div key={index} className="px-2 py-3.5 flex items-center justify-between bg-white" style={{ width: header.width }}>
							<Text text={header.name} size={11} color="#84858C" />
							{index != 0 && index != 1 && index != 2 && <IoFilter />}
						</div>
					))
				}
			</div>}
			<div className={viewMode == "LIST" ? "" : "flex gap-4 overflow-auto h-[calc(100vh-280px)] mt-2"}>
				{
					searchDocuments && searchDocuments.length == 0
						? <div className="h-[calc(100vh-300px)] flex justify-center items-center">
							<div className="flex flex-col items-center gap-3">
								<Icon type="no-document" />
								<div className="w-[215px]">
									<Text text="No documents to show" size={14} weight="700" className="text-center" color="#071B55" />
									<Text text="Use search to list documents or import to add new documents." size={10} className="text-center" color="#071B55" />
								</div>
							</div>
						</div>
						: viewMode == "LIST"
							? statusData && statusData.map((data: any, index: number) => (
								<GroupPanel key={index} data={data} rowIndex={index} />
							))
							: <DndProvider backend={HTML5Backend}>
								{
									statusData && statusData.map((data: any, index: number) => (
										<KanbanPanel key={index} data={data} rowIndex={index} />
									))
								}
							</DndProvider>
				}
			</div>
		</div>
	)
}

const GroupPanel = ({ data, rowIndex }: { data: any, rowIndex: number }) => {

	const { HEADERS, statusData, setStatusData, handleCheck, COLORS, checkedList } = useCabinet()

	const handleOpen = () => {
		let temp = [...statusData]
		temp[rowIndex].isOpen = !temp[rowIndex].isOpen
		setStatusData(temp)
	}

	return (
		<div>
			<div className="flex items-center">
				<div className="px-2 py-6 flex justify-center" style={{ width: HEADERS[0].width }}> <input type="checkbox" /> </div>
				<div className="px-2 py-6 flex justify-center" style={{ width: HEADERS[1].width }}> <IoMdEye /> </div>
				<div className="px-2 py-6 flex justify-center" style={{ width: HEADERS[2].width }}> <IoEllipsisVerticalSharp /> </div>
				<div className="px-2 py-6 flex items-center gap-2 hover:cursor-pointer" style={{ width: HEADERS[3].width }} onClick={handleOpen}>
					{data.isOpen ? <FaAngleDown size={12} /> : <FaAngleRight size={12} />}
					<Icon type="box" fill={data.isOpen ? "#2454DE" : "#202124"} />
					<Text text={`${data.status == undefined ? 'To-Do' : data.status} (${data.count})`} size={14} weight="500" />
				</div>
				<div className="px-2 py-6" style={{ width: HEADERS[4].width }}></div>
				<div className="px-2 py-6" style={{ width: HEADERS[5].width }}></div>
				<div className="px-2 py-6" style={{ width: HEADERS[6].width }}></div>
				<div className="px-2 py-6" style={{ width: HEADERS[7].width }}></div>
				<div className="px-2 py-6" style={{ width: HEADERS[8].width }}></div>
				<div className="px-2 py-6" style={{ width: HEADERS[9].width }}></div>
				<div className="px-2 py-6" style={{ width: HEADERS[10].width }}></div>
			</div>
			{
				data.isOpen &&
				data.data.map((each: any, index: number) => (
					<div className={"flex items-center bg-white " + (index == 0 ? '' : 'border-t border-[#eeeeef]')}>
						<div className="px-2 py-3.5 flex justify-center" style={{ width: HEADERS[0].width }}> <input type="checkbox" checked={checkedList.includes(each.id)} onChange={(e) => handleCheck(e.target.checked, each.id)} /> </div>
						<div className="px-2 py-3.5 flex justify-center" style={{ width: HEADERS[1].width }}> <IoMdEye /> </div>
						<div className="px-2 py-3.5 flex justify-center" style={{ width: HEADERS[2].width }}> <IoEllipsisVerticalSharp /> </div>
						<div className="px-2 py-3.5" style={{ width: HEADERS[3].width }}>
							<Text text={`${each.keys["document-number"]}`} size={14} weight="700" />
						</div>
						<div className="px-2 py-3.5 flex justify-center" style={{ width: HEADERS[4].width }}>
							<div className="w-[128px] py-0.5 rounded-[10px] text-center" style={{ backgroundColor: COLORS[rowIndex] }}>
								<Text text={`${each.keys["status"] == undefined ? 'To-Do' : each.keys["status"]}`} size={10} color="white" weight="500" />
							</div>
						</div>
						<div className="px-2 py-3.5" style={{ width: HEADERS[5].width }}>
							<Text text={`${each.keys["document-type"]}`} size={14} weight="500" />
						</div>
						<div className="px-2 py-3.5 flex justify-center" style={{ width: HEADERS[6].width }}>
							<Icon type="note" />
						</div>
						<div className="px-2 py-3.5" style={{ width: HEADERS[7].width }}>
							<Text text={`${each.keys["document-entity-type"]}`} size={14} weight="500" />
						</div>
						<div className="px-2 py-3.5" style={{ width: HEADERS[8].width }}>
							<Text text={`${each.keys["document-entity-name"]}`} size={14} weight="500" />
						</div>
						<div className="px-2 py-3.5" style={{ width: HEADERS[9].width }}>
							<Text text={`${each.keys["document-branch"]}`} size={14} weight="500" />
						</div>
						<div className="px-2 py-3.5" style={{ width: HEADERS[10].width }}>
							<Text text={`${each.keys["document-date"]}`} size={14} weight="500" />
						</div>
					</div>
				))
			}
		</div>
	)
}

const KanbanPanel = ({ data, rowIndex }: { data: any, rowIndex: number }) => {

	const { handleCheck, COLORS, handleDrop, checkedList, setCheckedList } = useCabinet()
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false)

	return (
		<DropZone className="" status={data.status} onDrop={handleDrop}>
			<div className="bg-white px-4 py-2 w-[394px]">
				<Text text={`${data.status == undefined ? 'To-Do' : data.status} (${data.count})`} size={14} weight="500" />
			</div>
			<div className="flex flex-col gap-3 mt-5">
				{
					data.data.map((each: any, index: number) => (
						<DragItem
							key={index}
							className="bg-white border border-blue-100 rounded-[4px] px-6 py-4"
							id={each.properties.id}
						>
							<div className="flex gap-3">
								<div>
									<input type="checkbox" checked={checkedList.includes(each.id)} onChange={(e) => handleCheck(e.target.checked, each.id)} />
								</div>
								<div className="flex-1">
									<Text text={each.keys["document-type"]} size={14} color="black" weight="600" />
									<Text text={each.keys["document-category"] == undefined ? "UNCATEGORISED" : each.keys["document-category"]} size={14} color="#84858C" weight="500" />
									<Text text={each.keys["document-entity-code"] + "-" + each.keys["document-entity-name"]} size={14} color="black" weight="600" />
									<Text text={each.keys["document-date"]} size={14} color="#84858C" weight="500" />
									<div className="mt-2 py-0.5 w-[187px] text-center rounded-[10px]" style={{ backgroundColor: COLORS[rowIndex] }}>
										<Text text={data.status == undefined ? 'To-Do' : data.status} size={10} weight="600" color="white" />
									</div>
								</div>
								<div>
									<FaEllipsis />
								</div>
							</div>
							<div className="mt-2 flex justify-end items-center gap-2">
								<MdDeleteSweep color="red" size={20} className="hover:cursor-pointer" onClick={() => { setCheckedList([each.properties.id]); setIsDeleteOpen(true); }} />
								<MdEditNote color="#0073DD" size={20} className="hover:cursor-pointer" />
								<TbStatusChange color="#0073DD" size={20} className="hover:cursor-pointer" onClick={() => { setCheckedList([each.properties.id]); setIsChangeStatusOpen(true); }} />
								<IoMdEye color="#0073DD" size={20} className="hover:cursor-pointer" />
							</div>
						</DragItem>
					))
				}
			</div>
			<DeleteModal isOpen={isDeleteOpen} handleClose={() => setIsDeleteOpen(false)} />
			<ChangeStatusModal isOpen={isChangeStatusOpen} handleClose={() => setIsChangeStatusOpen(false)} />
		</DropZone>
	)
}

export default DocumentDataPanel