import { useEmailTemplates } from "providers/settings/EmailTemplatesProvider"
import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"
import EmailTemplatesModal from "./Modal"
import { CSVLink } from 'react-csv'

const EmailTemplatesHeader = () => {

    const classes = {
        input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm w-[338px]"
    }
    const { setCurIndex, setInfo, emailTemplates: data, search, setSearch } = useEmailTemplates()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex justify-between border-b border-[#DEDFEA] pb-2">
            <div className="flex flex-col gap-3">
                <Text text="Email Templates" size={28} weight="700" />
                <p className="text-sm">{data?.length} Email Templates</p>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <input className={classes.input} placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                    <CiSearch className="absolute left-2 top-2" size={20} />
                </div>
                <CSVLink filename="Jdocs-email-templates" data={data} className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit">Export As</CSVLink>
				<button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit" onClick={() => { setIsOpen(true); setInfo({}); setCurIndex(-1); }}>Create New+</button>
            </div>
            <EmailTemplatesModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
        </div>
    )
}

export default EmailTemplatesHeader