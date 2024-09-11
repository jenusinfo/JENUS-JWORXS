import { useHookUnits } from "hooks/Settings/UnitsHook";
import { CreateUnit, DeleteUnit, GetUnits, UpdateUnit } from "lib/settings/units";
import { ChangeEvent, createContext, useContext, useEffect, useMemo, useState } from "react";

const UnitsContext: any = createContext(null)

export interface IUnit {
	ParentUnitCode: null | number
	ParentUnitName: null | string
	CreatedById: number
	CreatedBy: string
	CreatedOn: string
	ModifiedBy: string
	ModifiedById: number
	ModifiedOn: string
	Id: number
	ParentBankUnitId: null | number
	UnitCode: string
	UnitName: string
	Email: null | string
	Address: string
	POBox: string
	Telephone: string
	Fax: string
	IsGlobal: boolean
	IsActive: boolean
}

const UnitsProvider = ({ children }: any) => {

	const { units, setUnits, parentBankList, getUnits } = useHookUnits()
	const [curPageNumber, setCurPageNumber] = useState(1)
	const [curIndex, setCurIndex] = useState(-1)
	const [info, setInfo] = useState<any>({})
	const [search, setSearch] = useState("")
	const [data, setData] = useState<any[]>([])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInfo({
			...info,
			[e.target.name]: e.target.value
		})
	}

	const handleCreate = async () => {
		const res = await CreateUnit(info)

		if (res.Data != null)
			setUnits([...units, res.Data])
	}

	const handleDelete = async (id: any, index: number) => {
		await DeleteUnit(id)
		getUnits()
	}

	const handleUpdate = async () => {
		const res = await UpdateUnit(info.Id, info)
		let temp = [...units]
		temp[curIndex] = res.Data
		setUnits(temp)
	}

	useEffect(() => {
		if (search) {
			const filteredUnits = units.filter((unit: IUnit) =>
				unit.UnitName.toLowerCase().includes(search.toLowerCase()) ||
				unit.UnitCode.toLowerCase().includes(search.toLowerCase()) ||
				unit.Email?.toLowerCase().includes(search.toLowerCase()) ||
				unit.ParentUnitCode?.toString().includes(search.toLowerCase())
			);
			setData(filteredUnits);
		} else {
			setData(units)
		}
	}, [search])

	useEffect(() => { setData(units) }, [units])

	const value = useMemo(
		() => ({
			units, data,
			parentBankList,
			curPageNumber,
			setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate,
			search,
			setSearch
		}),
		[
			units, data,
			parentBankList,
			curPageNumber,
			setCurPageNumber,
			info,
			setInfo,
			curIndex,
			setCurIndex,
			handleChange,
			handleCreate,
			handleDelete,
			handleUpdate,
			search,
			setSearch
		]
	)

	return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
}

export const useUnits = () => {
	const context: any = useContext(UnitsContext)
	if (!context) {
		throw new Error("useUnits must be used within UnitsProvider")
	}
	return context
}

export default UnitsProvider