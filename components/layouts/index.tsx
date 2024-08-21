import { ILayout } from 'types/layout'
import BaseLayout from './containers/Base'
import MainLayout from './containers/Main'
import BlankLayout from './containers/Blank'

const layoutContainers = {
    base: BaseLayout,
    main: MainLayout,
    blank: BlankLayout
}

interface ILayoutFactory extends ILayout {
    type: keyof typeof layoutContainers
}

const Layout = ({
    children,
    pageTitle,
    type,
    showMeta
}: ILayoutFactory) => {
    const Container = layoutContainers[type]

    return (
        <Container pageTitle={pageTitle} showMeta={showMeta}>
            {children}
        </Container>
    )
}

export default Layout