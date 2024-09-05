import { useHookParameters } from "hooks/Settings/ParametersHook";
import { CreateInterviewSection, DeleteInterviewSection, UpdateInterviewSection } from "lib/interview";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IParameter } from "../ParametersProvider";

const ParameterItemContext: any = createContext(null)

const ParameterItemProvider = ({ children }: any) => {

	const { id } = useRouter().query
	const {
        parameters
	} = useHookParameters()
    const [parameterItem, setParameterItem] = useState<IParameter>()

	useEffect(() => {
		if (id && parameters) {
            let temp = parameters.filter((each: IParameter) => each.Id == Number(id))[0]
            setParameterItem(temp)
		}
	}, [id, parameters])

	const value = useMemo(
		() => ({
            parameterItem
		}),
		[
            parameterItem
		]
	)

	return <ParameterItemContext.Provider value={value}>{children}</ParameterItemContext.Provider>
}

export const useParameterItem = () => {
	const context: any = useContext(ParameterItemContext)
	if (!context) {
		throw new Error("useParameterItem must be used within ParameterItemProvider")
	}
	return context
}

export default ParameterItemProvider