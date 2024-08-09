import { GetDocumentCategories } from "lib/settings/document-categories"
import { useEffect, useState } from "react"
import http from "services/http-common"
import xml2js from 'xml2js'
import dateFormat from 'dateformat'
import { useApp } from "providers/AppProvider"

export const useHookCabinet = ({ value }: any) => {

	const { loading, setLoading } = useApp()
	const [keyDefs, setKeyDefs] = useState<any>([])
	const [selectedOptions, setSelectedOptions] = useState<any>([])
	const [documentDefinitions, setDocumentDefinitions] = useState<any>([])
	const [associatedImport, setAssociatedImport] = useState("")
	const [showDocumentBranch, setShowDocumentBranch] = useState(false)
	const [showDocumentUser, setShowDocumentUser] = useState(false)
	const [showDocumentEventDate, setShowDocumentEventDate] = useState(false)
	const [loadingKeyDef, setLoadingKeyDef] = useState(false)
	const [loadingSelectedOptions, setLoadingSelectedOptions] = useState(false)
	const [loadingDocumentDefinitions, setLoadingDocumentDefinitions] = useState(false)
	const [loadingAssociatedImport, setLoadingAssociatedImport] = useState(false)

	const getKeyDefs = async () => {
		setLoading(true)
		const res = await http.get("/dm/rest/v1/key-defs")
		setKeyDefs(res?.data)
		setLoading(false)
	}

	const getSelectedOptions = async () => {
		setLoading(true)
		const res = await http.get(`/dm/rest/v1/applications/document-search/${value}`)

		let data = res?.data;
		let queryData = data?.query?.queryData;
		const parser = new xml2js.Parser();
		parser.parseString(queryData, function (err, result) {
			let columns = result?.pdmWebAppGroup?.pdmWebAppItem;
			let inputsData = columns?.map((each: any) => {
				let inputType = each["$"]?.pdmType;
				let info = each?.pdmWebAppKey?.[0]?.["$"];
				let options = [];
				if (inputType == 1) {
					//console.log(info, "some info");

					options = each?.pdmWebAppKey?.[0]?.pdmWebAppOption?.map(
						(option: any) => {
							return {
								value: option?.["$"]?.pdmOptionValue,
								label: option?.["$"]?.pdmOptionValue,
							};
						}
					);
				}
				return {
					label: info?.pdmQueryKeyName,
					value: info?.pdmQueryKeyName,
					options: options,
				};
			});

			let selectOptions = inputsData?.map((input: any) => {
				let defDetails: any = keyDefs?.filter(
					(each: any) => each.name == input.value
				);
				if (defDetails?.length) {
					let option = {
						label: defDetails[0]?.label,
						value: input.value,
						type: defDetails[0]?.dataType,
					};
					return option;
				}
			});

			selectOptions = selectOptions?.filter((each: any) => each);
			setSelectedOptions(selectOptions);
		});
		setLoading(false)
	}

	const getSearchDocuments = async (filterOptions: any) => {
		setLoading(true)
		let option = ""
		filterOptions.forEach((each: any, index: number) => {
			option += `${each.option}=${each.value}${index == filterOptions.length - 1 ? '' : '&'}`
		})
		const res = await http.get(`/dm/rest/v1/document-search/${value}?${option}`)

		let modifiedData = res?.data?.map((each: any) => ({
			...each,
			...each?.keys,
			...each?.properties,
			...each?.fileProperties,
		}))

		setLoading(false)
		return modifiedData
	}

	const getDocumentDefinitions = async () => {
		setLoading(true)
		const res = await GetDocumentCategories()
		setDocumentDefinitions(res.Data)
		setLoading(false)
	}

	const getAssociatedImport = async (userInfo: any, searchedValues: any) => {
		setLoading(true)
		const res = await http.get(`/dm/rest/v1/applications/document-import-v2/${associatedImport}`)

		if (res?.status) {
			if (Array.isArray(res.data.keyBindings)) {
				let keys: any = [];
				let defaultValues: any = {};

				res.data.keyBindings
				.sort((a: any, b: any) => a.formOrder - b.formOrder)
				.forEach((key: any) => {
					if (key.keyDef == 'document-branch') {
						setShowDocumentBranch(true)
						defaultValues = { ...defaultValues, "document-branch": userInfo?.BankUnitName }
						return;
					} else if (key.keyDef == 'document-user') {
						setShowDocumentUser(true);
						defaultValues = { ...defaultValues, "document-user": userInfo?.FullName };
						return;
					} else if (key.keyDef == 'document-event-datetime') {
						setShowDocumentEventDate(true);
						defaultValues = { ...defaultValues, "document-event-datetime": dateFormat(new Date(), "mm/dd/yyy") };
						return;
					}

					if (searchedValues) {
						let searchedValue = searchedValues?.filter(
							(each: any) => each.option == key.keyDef
						)[0];

						if (searchedValue) {
							defaultValues = { ...defaultValues, [key.keyDef]: searchedValue.value };
						}
					}

					let defDetails = keyDefs?.filter(
						(each: any) => each.name == key.keyDef
					);

					key = { ...key, keyDefLabel: defDetails[0]?.label || key.keyDef }

					if (key.defaultValue && key.defaultValue != '') {
						defaultValues = { ...defaultValues, [key.keyDef]: key.defaultValue };
					}

					if (defDetails[0]?.dataType == "DATE") {
						defaultValues = { ...defaultValues, [key.keyDef]: dateFormat(new Date(), "yyyy-mm-dd") };
					}

					if (key.inputType == "DROPDOWN") {
						let modifiedOptions: any = [];
						key.inputOptions.forEach(function (option: any) {
							modifiedOptions = [...modifiedOptions, { label: option, value: option }];
						});

						key = { ...key, updatedSelectOptions: modifiedOptions, defInputType: "DROPDOWN" }
					}
					else {
						key = { ...key, defInputType: defDetails[0]?.dataType || "STRING" }
					}
					keys = [...keys, key];
				})

				return {
					keys, defaultValues
				}
			}
		}
		setLoading(false)
	}

	// useEffect(() => {
	// 	if (loadingKeyDef || loadingAssociatedImport || loadingDocumentDefinitions || loadingSelectedOptions)
	// 		setLoading(true)
	// 	else setLoading(false)
	// }, [loadingKeyDef, loadingAssociatedImport, loadingDocumentDefinitions, loadingSelectedOptions])

	useEffect(() => {
		if (documentDefinitions && documentDefinitions.length > 0) {
			let filteredObj = documentDefinitions.filter((x: any) => x.Name == value)
			if (filteredObj) {
				let associatedImport = documentDefinitions.filter((x: any) => x.Name == value)[0].AssociatedImport
				setAssociatedImport(associatedImport)
			}
		}
	}, [documentDefinitions])

	useEffect(() => {
		if (value && keyDefs) {
			getSelectedOptions()
		}
	}, [value, keyDefs])

	useEffect(() => {
		getDocumentDefinitions()
		getKeyDefs()
	}, [])

	return {
		showDocumentBranch, showDocumentEventDate, showDocumentUser,
		selectedOptions,
		associatedImport,
		getSearchDocuments,
		getAssociatedImport
	}
}