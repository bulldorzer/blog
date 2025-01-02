import { useEffect, useState, useRef } from "react";
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

    const postRef = useRef(null); // 특정 대상에 이름표 붙이는 것
    
    // post영역 바깥을 클릭한 경우
    // 매개변수 e : 이벤트가 발생한 대상에 대한 정보를 담아옴
    const handleClickOutside = (e)=>{
        /*
                조건1)
                postRef.current = <div className="post"></div>
                - 해당 요소가 없으면 null 반환됨
                - null = false

                조건2)
                - A요소.contains( B요소 ) - B요소가 A요소 안에 포함되어 있나
                - 포함 : true => 영역 안에 있다
                - 불포함: false => 영역 밖에 있다

                postRef 요소가 존재하는데, 영역 밖을 클릭했다면 ok if절 구문 수행
            */
        if(postRef.current && !postRef.current.contains(e.target) ){
            
            if (isEditing) { // 수정된 내용 반영
                editPostTitle(item.id, tempTitle)
                editPostDate(item.id, tempDate)
                setIsEditing(!isEditing); // 수정 가능 모드 잠가
            }
        }

        
    }

    // useCallback(함수, 의존성배열) 
    // 함수를 cache 해놨다가, 변경되지 않았을때 저장된 함수 꺼내서 쓰고 
    // 의존성 배열의 내용이 변경되면 해당 함수 재생성해서 쓴다
    // (함수안의 데이터 내용이 변경 되었으니 다시 생성해야함)

    // useEffect(함수, 의존성배열)
    // - 알람 : 특정 조건에 따라 작업을 설정, 컴포넌트가 사라질 때 해당 작업 정리함
    // - 의존성 배열에 따라 알람이 울리는 조건이 달라진다.
    // 1) 처음에 컴포넌트가 화면에 나타날 때 (현재 컴포넌트는 Post.js)
    // 2) 의존성 배열의 값이 변경 되었을 때
    useEffect(()=>{
        console.log("수정 작업 시작")
        document.addEventListener("mousedown",handleClickOutside);

        // return 옆에 ()=>{} : clean up 함수 = 종료
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside);
            console.log('수정 작업 종료')
        }
    },[isEditing, tempTitle, tempDate])
    
    // 클래스 이름
    const postClassName = `postInput ${isEditing ? "edit" : ""}`
    // true 이면 - "postInput edit"
    // false 이면 - "postInput"

    // postRef = .post
    return (
        <div 
            className="post"
            ref={postRef}
            onClick={()=>{setIsEditing(true)}} 
        >
            <div>
                <PostInput
                    type="text"
                    className={postClassName}
                    value={tempTitle}
                    onChange={handleTitleChange}
                    readOnly={!isEditing}
                    onClick = {()=>{setIsEditing(true)}} // 항상 수정모드 활성화
                />
                <span onClick={()=>{increaseGood(item.id)}}>👍🏻</span>
                {item.good}
            </div>
            
            <PostInput
                type="date"
                className={postClassName}
                value={tempDate}
                onChange={handleDateChange}
                readOnly={!isEditing}
                onClick = {()=>{setIsEditing(true)}} // 항상 수정모드 활성화
            />
            
            
            
        </div>
    )
}

export default Post;