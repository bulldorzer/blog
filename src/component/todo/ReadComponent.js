import { useEffect, useState } from "react"
import {getOne, deleteOne, putOne} from "../../api/todoApi";

import useCustomMove from '../../hook/useCustomMove'
import LiItem from "../common/LiItem";
import ButtonGroup from "../../component/common/ButtonGroup"

// 초기값 객체
const initState = {
    tno : 0,
    title : 'Test',
    writer : 'Test',
    dueDate : null,
    complete : false
}

const ReadComponent = ({tno})=>{

    const [todo, setTodo] = useState({...initState})
    const [result, setResult] = useState(null)

    useEffect(()=>{
        getOne(tno).then( data =>{
            
            setTodo( () => data ? data : initState )
        })
    }, [tno])

    const handleChangeTodo = (e) => {

        const {name, value} = e.target
        
        setTodo( prevTodo => ({
            ...prevTodo, 
            [name]: name=="complete" ? value === "Y" : value
        } ))
    }

    const handleClickModify = () => {
        
            putOne(todo).then( data =>{
                console.log("modify result : " + data)
                setResult('Modify')
            })        
        }
    
    const handleClickDelete = () => {

        deleteOne(tno).then( data => {
            console.log('delete result' + data);
            setResult('Delete')
        })
        
    }

    
    const fields = [
        {label : 'Writer', name : 'writer', value : todo.writer, type : 'text', readOnly : true },
        {label : 'Title', name : 'title', value : todo.title, onChange : handleChangeTodo },
        {label : 'Due Date', name : 'dueDate', value : todo.dueDate, onChange: handleChangeTodo, type : 'date'}
    ]

    const buttons = [
        {label : '수정', className : 'modify', onClick : handleClickModify },
        {label : '삭제', className : 'delete', onClick : handleClickDelete }
    ]

    return (
        <>
            <ul className="modify item">
                {
                    fields.map( field =>( 
                        <LiItem key={field.name} {...field} /> 
                    ))
                    
                }
                <li className="complete">
                    <span className="labelWrap">Complete</span>
                    <span className="dataWrap">
                        <label>
                            <input 
                                type="radio" name="complete" 
                                value="Y"
                                onChange={handleChangeTodo} 
                                checked={todo.complete == true}
                                ></input>Yes</label>
                        <label>
                            <input 
                                type="radio" name="complete" 
                                value="N" 
                                onChange={handleChangeTodo} 
                                checked={todo.complete == false}
                            ></input>No</label>
                    </span>
                </li>   
            </ul>
            <ButtonGroup buttons={buttons}/>
        </>
    )
}


export default ReadComponent;




// import {getOne} from '../../api/todoApi'
    /*
    useEffect(()=>{

        getOne(tno).then( data =>{
            console.log(data)
            setTodo(data)
        }).catch((error)=>{
            console.error(error)
        })
    },[tno])
*/