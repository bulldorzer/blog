import BasicLayout from '../../layout/BasicLayout'
import { Link, Outlet } from 'react-router-dom';

function IndexPage(){
    return(
        <BasicLayout>
            <div style={{background : 'pink', padding: '40px'}}>
                
                <Link to={"/todo/list"} style={{marginRight:'20px'}}>List</Link>
                <Link to={"/todo/add"}>ADD</Link>
                <div style={{padding : '100px 0'}}><Outlet/></div>
            </div>
        </BasicLayout>
    )
}
export default IndexPage;