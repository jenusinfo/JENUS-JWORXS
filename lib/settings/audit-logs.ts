import http from "services/http-common"

export const GetAuditLogs = async (searchParam?: number, fromDate?: string, toDate?: string) => {
    const res = await http.get(`/Setting/AuditLog/${searchParam || 1}?from=${fromDate}&to=${toDate}`)

    if (res?.status)
        return res.data
}

export const CreateAuditLog = (id: any, rowData: any, updatedRowData: any, documentAction: any, assignedToEmailId?: any) => {

    let oldStatus = rowData?.keys?.status || '';
    let newStatus = updatedRowData?.keys?.status || '';
    let documentDef = updatedRowData?.documentDef;

    if (!documentDef || !documentAction) {
        return;
    }

    let payload = {
        DocumentId: id,
        DocumentDefinition: documentDef,
        ActionTaken: documentAction,
        StatusFrom: oldStatus,
        StatusTo: newStatus,
        AssignedToEmailId: assignedToEmailId || ''
    };

    http?.post("/Document/AuditLog", payload)
        .then((res) => {
            if (res?.data?.Success) {
            }
        })
        .catch((e) => {
            console.log('Unable to create Doc Audit Log. Exception: ', e);
        });

}