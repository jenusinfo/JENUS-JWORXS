import DocumentDataHeader from "components/Documents/Cabinet/DataHeader"
import DocumentDataPanel from "components/Documents/Cabinet/DataPanel"
import { DocumentCabinetHeader } from "components/Documents/Cabinet/Header"
import DocumentCabinetMiddleware from "components/Documents/Cabinet/Middleware"
import OperationsPanel from "components/Documents/Cabinet/OperationsPanel"
import CabinetProvider from "providers/documents/CabinetProvider"

const DocumentCabinetPage = () => {

	return (
		<div className="py-8">
			<CabinetProvider>
				<DocumentCabinetHeader />
				<DocumentCabinetMiddleware />
				<div className="flex flex-col gap-0.5">
					<DocumentDataHeader />
					<OperationsPanel />
					<DocumentDataPanel />
				</div>
			</CabinetProvider>
		</div>
	)
}

export default DocumentCabinetPage