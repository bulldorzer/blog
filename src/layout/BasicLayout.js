import Header from "../compoent/Header"
const BasicLayout = ({children}) =>{
    return (
        <>
            <Header/>
            <div className="container">
                <main className="main">{children}</main>
                <aside className="sideMenu"></aside>
            </div>
        </>
        
    )
}
export default BasicLayout