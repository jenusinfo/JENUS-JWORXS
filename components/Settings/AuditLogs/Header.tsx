import { useAuditLogs } from "providers/settings/AuditLogsProvider"
import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"
import { CSVLink } from 'react-csv'

const AuditLogsHeader = () => {

    const classes = {
        input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm w-[338px]"
    }
    const optionList = [
        { name: "Interview Audit Logs", value: 1 },
        { name: "User Task Logs", value: 2 },
        { name: "Document Logs", value: 3 }
    ]
    const { auditLogs: data, search, setSearch, searchParam, setSearchParam, handleSearch, fromDate, setFromDate, toDate, setToDate } = useAuditLogs()

    return (
        <div className="flex justify-between border-b border-[#DEDFEA] pb-2">
            <div className="flex flex-col justify-between gap-3">
                <Text text="Audit Logs" size={28} weight="700" />
                <p className="text-sm">{data?.length} Audit Logs</p>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                    <div className="relative">
                        <input className={classes.input} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <CiSearch className="absolute left-2 top-2" size={20} />
                    </div>
                    <div className="flex gap-2">
                        <CSVLink filename="Jdocs-Audit-Logs" data={data} className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit">Export As</CSVLink>
                        <button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit hover:bg-blue-600 transition-all duration-400" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <select className="px-4 py-2 text-sm focus:outline-none h-fit border border-gray-300 rounded-[4px]" value={searchParam} onChange={(e) => setSearchParam(e.target.value)}>
                        {
                            optionList.map((option, index) => (
                                <option key={index} value={option.value}>{option.name}</option>
                            ))
                        }
                    </select>
                    <input type="datetime-local" className="px-4 py-2 text-sm focus:outline-none h-fit border border-gray-300 rounded-[4px]" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <input type="datetime-local" className="px-4 py-2 text-sm focus:outline-none h-fit border border-gray-300 rounded-[4px]" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default AuditLogsHeader