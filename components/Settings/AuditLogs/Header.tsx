import { useAuditLogs } from "providers/settings/AuditLogsProvider"
import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"
import { CSVLink } from 'react-csv'

const AuditLogsHeader = () => {

    const classes = {
        input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm w-[338px]"
    }
    const { auditLogs: data, search, setSearch } = useAuditLogs()

    return (
        <div className="flex justify-between border-b border-[#DEDFEA] pb-2">
            <div className="flex flex-col gap-3">
                <Text text="Audit Logs" size={28} weight="700" />
                <p className="text-sm">{data?.length} Audit Logs</p>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <input className={classes.input} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <CiSearch className="absolute left-2 top-2" size={20} />
                </div>
                <CSVLink data={data} filename={"Jdocs-audit-logs.csv"}>
                    <button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit">Export As</button>
                </CSVLink>
            </div>
        </div>
    )
}

export default AuditLogsHeader