import DataPanel from "components/Settings/DocumentCategories/DataPanel"
import DocumentCategoriesHeader from "components/Settings/DocumentCategories/Header"
import DocumentCategoriesProvider from "providers/settings/DocumentCategoriesProvider"

const DocumentCategoriesPage = () => {
    return (
        <div className="py-8">
            <DocumentCategoriesProvider>
                <div className="space-y-6">
                    <DocumentCategoriesHeader />
                    <DataPanel />
                </div>
            </DocumentCategoriesProvider>
        </div>
    )
}

export default DocumentCategoriesPage