import { useFormDefinitionsDetail } from "providers/settings/FormDefinitions/FormDefinitionsDetailProvider";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import DropDown from "shared/core/ui/Dropdown";
import Text from "shared/core/ui/Text";
import { getFormattedDate } from "shared/helper/common";
import FormDefinitionsQuestionModal from "./Modal";
import { useQuestion } from "providers/settings/FormDefinitions/Details/QuestionProvider";
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import http from "services/http-common";
import { useRouter } from "next/router";

const ItemTypes = {
	ROW: 'row'
};

const QuestionsDataPanel = () => {

	const { formFullInfo: data, setInfo, setCurIndex, handleDelete } = useQuestion()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="p-4 bg-white shadow-md">
			<div className="flex justify-between items-center">
				<Text text="Questions" size={16} weight="600" color="#275E93" className="border-b-2 border-blue-500" />
				<button
					className="text-white bg-[#2454de] hover:bg-blue-500 transition-all duration-400 rounded-[4px] px-5 py-2.5 h-fit"
					onClick={() => { setIsOpen(true); setInfo({}); setCurIndex(-1); }}
				>
					+ Create a Question
				</button>
			</div>

			<DndProvider backend={HTML5Backend}>
				{data && <DraggableTable data={data} setIsOpen={setIsOpen} setInfo={setInfo} setCurIndex={setCurIndex} handleDelete={handleDelete} />}
			</DndProvider>
			<FormDefinitionsQuestionModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
		</div>
	)
}

const DraggableRow = ({ index, inbox, moveRow, handleDelete, setIsOpen, setInfo, setCurIndex, arrIndex, setArrIndex }: any) => {

	const { id } = useRouter().query
	const { getFullInfoFormDefinitions } = useQuestion()

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.ROW,
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: ItemTypes.ROW,
		async drop(item: any) {
			setArrIndex([])
			await http.post(`/Interview/Questions/Reorder?direction=${index - arrIndex[0]}&id=${inbox.Id}`, {})
			await getFullInfoFormDefinitions(id)
		},
		hover(item: any) {
			if (item.index !== index) {
				moveRow(item.index, index);
				item.index = index; // set the new index to avoid a flicker effect
			}
		},
	});

	return (
		<tr
			ref={node => {
				drag(node);
				drop(node);
			}}
			className="border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 transition-all duration-500"
		>
			<td className="py-5">
				<div className="flex justify-center">
					<DropDown
						target={<IoEllipsisVerticalSharp className="hover:cursor-pointer" />}
						left={15}
						top={-5}
					>
						<div className="shadow-md border border-gray-100 rounded-[4px] bg-white">
							<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => { setIsOpen(true); setInfo(inbox); setCurIndex(index); }}>
								<CiEdit color="#2454DE" size={18} />
								<Text text="Update" size={12} weight="500" />
							</div>
							<div className="px-3 py-1.5 flex items-center gap-2 hover:cursor-pointer hover:bg-blue-100" onClick={() => handleDelete(inbox.Id, index)}>
								<MdOutlineDelete color="red" size={18} />
								<Text text="Delete" size={12} weight="500" />
							</div>
						</div>
					</DropDown>
				</div>
			</td>
			<td className="px-2">{inbox.Id}</td>
			<td className="px-2">{inbox.InterviewSectionLabel}</td>
			<td className="px-2">{inbox.Question}</td>
			<td className="px-2">{inbox.IsHidden ? 'Yes' : 'No'}</td>
			<td className="px-2">{inbox.IsSearchable ? 'Yes' : 'No'}</td>
			<td className="px-2">{inbox.IsReadOnly ? 'Yes' : 'No'}</td>
			<td className="px-2 text-right">{getFormattedDate(inbox.CreatedOn)}</td>
			<td className="px-2 text-right">{inbox.CreatedBy}</td>
			<td className="px-2 text-right">{getFormattedDate(inbox.ModifiedOn)}</td>
			<td className="px-2 text-right">{inbox.ModifiedBy}</td>
			<td className="px-2">
				<div className="flex items-center gap-1 font-semibold">
					<div className={"border-2 w-2 h-2 rounded-full " + (inbox.IsActive ? 'border-[#1ed6bb]' : 'border-[#fb5656]')} />
					<Text text={inbox.IsActive ? 'Active' : 'Inactive'} weight="500" />
				</div>
			</td>
		</tr>
	);
};

const DraggableTable = ({ data, setIsOpen, setInfo, setCurIndex, handleDelete }: any) => {
	const [items, setItems] = useState(data);
	const [arrIndex, setArrIndex] = useState<Array<number>>([])

	const moveRow = (fromIndex: any, toIndex: any) => {
		setArrIndex(prev => [...prev, fromIndex])
		const updatedItems = [...items];
		const [movedItem] = updatedItems.splice(fromIndex, 1);
		updatedItems.splice(toIndex, 0, movedItem);
		setItems(updatedItems);
	};

	useEffect(() => {
		if (data) {
			let temp: any = []
			data.map((each: any) => {
				each.Sections.map((section: any) => {
					section.Questions.map((que: any) => {
						temp.push(que)
					})
				})
			})
			setItems(temp)
		}
	}, [data])

	return (
		<table className="w-full mt-4">
			<thead>
				<tr className="text-xs text-[#A4A7B0] border-b border-gray-200">
					<th className="py-3">
						<div className="flex justify-center">
							<IoEllipsisVerticalSharp />
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-left">
							#
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-left">
							SECTION
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-left">
							QUESTION
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-left">
							IS HIDDEN
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-left">
							IS SEARCHABLE
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-left">
							IS READONLY
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-right">
							CREATED ON
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-right">
							CREATED BY
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-right">
							MODIFIED ON
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-right">
							MODIFIED BY
						</div>
					</th>
					<th className="py-3">
						<div className="px-2 border-l border-gray-200 text-left">
							STATUS
						</div>
					</th>
				</tr>
			</thead>
			<tbody className="text-sm">
				{
					items.map((que: any, index: number) => (
						<DraggableRow
							key={index}
							index={index}
							inbox={que}
							moveRow={moveRow}
							handleDelete={handleDelete}
							setIsOpen={setIsOpen}
							setInfo={setInfo}
							setCurIndex={setCurIndex}
							arrIndex={arrIndex}
							setArrIndex={setArrIndex}
						/>
					))
				}
			</tbody>
		</table>
	);
};

export default QuestionsDataPanel