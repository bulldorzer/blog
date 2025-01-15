import { useEffect, useState } from "react"

import {getList} from '../../api/todoApi'

import PageComponent from "../common/PageComponent"

import useCustomMove from '../../hook/useCustomMove'

import ReadPage from "../../pages/todo/ReadPage"


// 초기값 객체
const initState = {
    dtoList : [],
    pageNumList : [],
    pageRequestDTO : null,
    prev : false, 
    next : false, 
    totalCount : 2,
    prevPage : 0,
    nextPage : 0,
    totalPage : 1,
    current : 1
}

const ListComponent = ({tno})=>{

    const {page, size, refresh, moveToList, moveToRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)
    const [selectedTno, setSelectedTno] = useState(null);


    



    useEffect(()=>{
        // 서버에 데이터 요청
        getList( {page, size} ).then( data => {
            setServerData(()=> data ? data : initState)
        }).catch(err => console.log(err))
        
    },[page, size])

    

    return (
        <>
            <ul className="list">
                <li className="header">
                    <span className="tno">No.</span>
                    <span className="title">제목</span>
                    <span className="writer">작성자</span>
                    <span className="dueDate">작성일</span>
                </li>
                {
                    serverData.dtoList.map( todo => (
                        <li key={todo.tno} onClick={()=>setSelectedTno(todo.tno)}>
                            <span className="tno">{todo.tno}</span>
                            <span className="title">{todo.title}</span>
                            <span className="writer">{todo.writer}</span>
                            <span className="dueDate">{todo.dueDate}</span>
                        </li>
                    ))
                }
            </ul>
            <PageComponent serverData={serverData} movePage={moveToList}/>
            <hr/>
            {selectedTno && <ReadPage tno={selectedTno} />}
        </>
        
    )
}

export default ListComponent;


