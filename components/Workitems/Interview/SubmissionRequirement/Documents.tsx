import { useInterview } from "providers/dashboard/InterviewProvider"
import { useEffect } from "react"
import { IInterviewDocument } from "types/document"
import { getFormattedDate } from '../../../../shared/helper/common';

const Documents = () => {

	const { interviewDocuments, getInterviewDocuments } = useInterview()

	console.log(interviewDocuments)

	useEffect(() => {
		getInterviewDocuments()
	}, [])

	return (
		<div>
			<table className="w-[700px]">
				<thead>
					<tr className="text-xs text-[#A4A7B0] border-b border-gray-200">
						<th className="py-3">
							<div className="px-2 text-left">
								STATUS
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								DOCUMENT TYPE
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								DOCUMENT DESCRIPTION
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								FILE NAME
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								UPLOAD ON
							</div>
						</th>
						<th className="py-3">
							<div className="px-2 border-l border-gray-200 text-left">
								UPLOAD BY
							</div>
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{
						interviewDocuments &&
						interviewDocuments.map((doc: IInterviewDocument, index: number) => (
							<tr key={index} className="border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 transition-all duration-500">
								<td>{}</td>
								<td>{}</td>
								<td>{}</td>
								<td>{doc.InterviewFormName}</td>
								<td>{getFormattedDate(doc.CreatedOn)}</td>
								<td>{doc.CreatedBy}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export default Documents