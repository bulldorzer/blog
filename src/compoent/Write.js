import PostInput from "./PostInput";
import { useEffect, useState, useRef } from "react";

function Write({addPost}){

    const [tempTitle,setTempTitle] = useState("");
    const [tempDate,setTempDate] = useState("");
    // 값이 바뀔때 마다 값이 저장됨 생성, 수정 에서 쓰이는 패턴
    const handleTitleChange = (e)=>setTempTitle(e.target.value); 
    const handleDateChange = (e)=>setTempDate(e.target.value);

    const postClassName = "postInput edit"
    const handleAddPost = () =>{
        const newPost = {
            title : tempTitle,
            regiDate : tempDate,
            good : 0
        }
        addPost(newPost)
    }
    return(
        <div className="post">
            <h3>글쓰기</h3>
            <div>
                <PostInput
                    type="text"
                    value={tempTitle}
                    className={postClassName}
                    onChange={handleTitleChange}
                />
                
                
            </div>
            
            <div>
                <PostInput
                    type="date"
                    value={tempDate}
                    className={postClassName}
                    onChange={handleDateChange}
                    /*
                        onClick 실행시 매개변수에 모든 정보가 담김
                        onClick = {(매개변수)=>{setIsEditing(true)}}
                    */
                />
            </div>
            <button onClick={handleAddPost}>등록</button>
        </div>
    )
}

export default Write;