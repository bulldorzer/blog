import { Link } from "react-router-dom";

function UtilMenu() {
    return(
        <nav className="utilMenu">
            <Link to={"/login"}>로그인</Link> 
            {/* 랜더링 하면서 a태그로 변경됨 a태그는 새로고침으로 하게되어 비동기로 소스를 가져와야함으로 Link태그를 사용함 */}
            <Link to={"/join"}>회원가입</Link>
            <Link to={"/cart"}>장바구니</Link>
        </nav>
    )
}

export default UtilMenu