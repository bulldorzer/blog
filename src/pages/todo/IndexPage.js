import BasicLayout from '../../layout/BasicLayout'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

function IndexPage(){
    
    const navigate = useNavigate()

    const handleClickList = useCallback(()=>{
        navigate({pathname:'list'})
    }) // 변경되는 데이터가 없을시 ,[] 생략가능
    const handleClickAdd = useCallback(()=>{
        navigate({pathname:'add'})
    })
    const handleClickRead = useCallback(()=>{
        navigate({pathname:'read/33'})
    })

    return(
        <BasicLayout>
            <div style={{background : 'pink', padding: '40px'}}>
                <button className='todoMenu' onClick={handleClickList}>List</button>
                <button className='todoMenu' onClick={handleClickAdd}>Add</button>
                <button className='todoMenu' onClick={handleClickRead}>Read</button>
                {/*
                <Link to={"/todo/list"} style={{marginRight:'20px'}}>List</Link>
                <Link to={"/todo/list?page=2&size=20"} style={{marginRight:'20px'}}>List2</Link>
                <Link to={"/todo/add"} style={{marginRight:'20px'}}>ADD</Link> 값을 담아서 보내는 경우 객체형태로 담아서 표시함 
                <Link to={"/todo/read/33"} style={{marginRight:'20px'}}>READ</Link>
                */}
                {/* <Link to="add">ADD</Link>이렇게도 되더라 */}
                <div className='todoContent'><Outlet/></div>
            </div>
        </BasicLayout>
    )
}
export default IndexPage;