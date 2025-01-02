import { Link } from "react-router-dom";

function BasicMenu() {
    return(
        <nav className="gnb">
            <Link to={"/"}>home</Link> 
            {/* 랜더링 하면서 a태그로 변경됨 a태그는 새로고침으로 하게되어 비동기로 소스를 가져와야함으로 Link태그를 사용함 */}
            <Link to={"/about"}>about</Link>
            <Link to={"/blog"}>blog</Link>
            <Link to={"/todo"}>todo</Link>
        </nav>
    )
}

export default BasicMenu