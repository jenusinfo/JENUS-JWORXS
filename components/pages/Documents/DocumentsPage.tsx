import DataPanel from "components/Documents/DataPanel"
import DocumentsProvider from "providers/documents/DocumentsProvider"
import Text from "shared/core/ui/Text"

const DocumentsPage = () => {
    return (
        <div className="py-8">
            <DocumentsProvider>
                <div className="border-b-2 border-[#f0f1f1] pb-[42px]">
                    <Text text="Document Cabinets" size={28} weight="700" />
                </div>
                <DataPanel />
            </DocumentsProvider>
        </div>
    )
}

export default DocumentsPage