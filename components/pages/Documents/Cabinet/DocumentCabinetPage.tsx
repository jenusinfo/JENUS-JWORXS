import { DocumentCabinetHeader } from "components/Documents/Cabinet/Header"
import DocumentCabinetMiddleware from "components/Documents/Cabinet/Middleware"
import CabinetProvider from "providers/documents/CabinetProvider"

const DocumentCabinetPage = () => {

	return (
		<div className="py-8">
			<CabinetProvider>
				<DocumentCabinetHeader />
				<DocumentCabinetMiddleware />
			</CabinetProvider>
		</div>
	)
}

export default DocumentCabinetPage