import { ReactNode } from "react"
import style from "./layout.module.css"
import Header from "./components/Header"
import Footer from "./components/Footer"

type Props = {
    children : ReactNode
}

const Layout = ({ children } : Props) => {
    return (
        <div className={style.container}>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout;