import { useHookUnits } from "hooks/Settings/UnitsHook";
import { createContext, useContext, useMemo, useState } from "react";

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

	const { units, setUnits } = useHookUnits()
	const [curPageNumber, setCurPageNumber] = useState(1)

	const value = useMemo(
		() => ({
			units,
			curPageNumber,
			setCurPageNumber
		}),
		[
			units,
			curPageNumber,
			setCurPageNumber
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