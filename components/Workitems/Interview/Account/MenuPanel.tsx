import Text from "shared/core/ui/Text"

const MenuPanel = () => {

    const MENU = [
        {
            groupName: "general",
            menus: [
                { name: "general questions" },
                { name: "personal details" },
                { 
                    name: "authorised persons to sign documents", 
                    subMenus: [
                        { name: "authorised persons to sign documents" },
                        { name: "authorised person details" },
                        { name: "authorised person details" }
                    ]
                },
                { name: "identification details" }
            ]
        },
        {
            groupName: "financial",
            menus: [
                { name: "occupation business activity" },
                { name: "financial details" },
                { name: "sources of wealth" },
                { name: "sources of annual income" }
            ]
        }
    ]

    return (
        <div className="flex flex-col gap-12">
            {
                MENU.map((group: any, index: number) => (
                    <div key={index} className="flex flex-col gap-4">
                        <Text text={group.groupName} size={11} weight="600" className="uppercase" />
                        {
                            group.menus.map((menu: any, j: number) => (
                                <div key={j} className="flex flex-col pl-2">
                                    <Text text={menu.name} size={14} weight="600" className="py-2 capitalize" />
                                    {
                                        menu.subMenus &&
                                        menu.subMenus.map((submenu: any, k: number) => (
                                            <div key={k} className="pl-4">
                                                <Text text={submenu.name} size={14} className="py-2 capitalize" />
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default MenuPanel