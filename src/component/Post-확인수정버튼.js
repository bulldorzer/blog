import { useState } from "react";
import PostInput from "./PostInput";

function Post(props) { //props = 객체형태다

    // destructuring = 구조분해 할당
    const {item,increaseGood,editPostTitle,editPostDate} = props
    // 타이틀을 다른변수에 임시로 저장해 놓음
    const [tempTitle,setTempTitle] = useState(item.title);
    const [tempDate,setTempDate] = useState(item.regiDate);
    
    const [isEditing, setIsEditing] = useState(false); // 수정불가상태

    const handleTitleChange = (e)=>setTempTitle(e.target.value);
    const handleDateChange = (e)=>setTempDate(e.target.value);
    
    const toggleEditMode = ()=>{
        if (isEditing) {
            editPostTitle(item.id, tempTitle)
            editPostDate(item.id, tempDate)
        }
        setIsEditing(!isEditing);
    }
    const cancelEdit = ()=>{
        setTempTitle(item.title);
        setTempDate(item.regiDate);
        setIsEditing(false)
    }


    return (
        <div className='post' >
            <div>
                <PostInput
                    type="text"
                    className="postTitle"
                    value={tempTitle}
                    onChange={handleTitleChange}
                    disabled={!isEditing}
                />
                <span onClick={()=>{increaseGood(item.id)}}>👍🏻</span>
                {item.good}
            </div>
            
            <PostInput
                type="date"
                className="postDate"
                value={tempDate}
                onChange={handleDateChange}
                disabled={!isEditing}
            />
            <button onClick={toggleEditMode}>
                {isEditing ? "확인" : "수정"}
            </button>
            {
                /* isEditing = true이면 <취소> 버튼, false - x */
                isEditing && <button onClick={cancelEdit}>취소</button>
            }
            
        </div>
    )
}

export default Post;