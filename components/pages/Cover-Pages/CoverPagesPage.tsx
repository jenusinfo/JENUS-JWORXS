import DataPanel from "components/Cover-Pages/DataPanel"
import CoverPagesHeader from "components/Cover-Pages/Header"
import { Middleware } from "components/Cover-Pages/Middleware"
import CoverPagesProvider from "providers/cover-pages/CoverPagesProvider"

const CoverPagesPage = () => {
    return (
        <div className="py-8">
            <CoverPagesProvider>
                <CoverPagesHeader />
                <div className="mt-8">
                    <Middleware />
                    <DataPanel />
                </div>
            </CoverPagesProvider>
        </div>
    )
}

export default CoverPagesPage