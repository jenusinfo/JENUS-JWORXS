import { useApp } from "providers/AppProvider";
import { useEffect, useState } from "react";
import http from "services/http-common";

export const useHookDocument = ({userInfo}: any) => {

	const { setLoading } = useApp()
	const [documentCabinets, setDocumentCabients] = useState([])

	const getDocumentCabinets = async () => {
		setLoading(true)
		let options: any = []
		const res = await http.get("/dm/rest/v1/applications/document-search")

		if (Array.isArray(res?.data)) {
			res?.data?.forEach(function (e) {
				if (
					userInfo?.UserDocumentDefinitions?.find(
						(f: any) => f["Name"].toLowerCase() == e.name.toLowerCase()
					) != undefined
				) {
					options = [
						...options,
						{
							title: e?.label,
							value: e?.name,
							text: e?.description,
							documentDefinitions:
								Array.isArray(e?.documentDefinitions) &&
									e?.documentDefinitions?.length
									? e.documentDefinitions[0]
									: null,
						},
					];
				}
			});

			setDocumentCabients(options);
		}
		setLoading(false)
	}

	useEffect(() => {
		if (userInfo) {
			getDocumentCabinets()
		}
	}, [userInfo])

	return {
		documentCabinets
	}
}