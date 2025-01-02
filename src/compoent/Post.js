import { useEffect, useState, useRef } from "react";
import PostInput from "./PostInput";
import Write from "./Write";

function Post(props) { //props = 객체형태다

    // destructuring = 구조분해 할당
    const {item,increaseGood,editPostTitle,editPostDate,deletePost,writePost} = props
    // 타이틀을 다른변수에 임시로 저장해 놓음
    const [tempTitle,setTempTitle] = useState(item.title);
    const [tempDate,setTempDate] = useState(item.regiDate);
    
    const [isEditing, setIsEditing] = useState(false); // 수정불가상태
    
    const [deleteVisible, setDeleteVisible] = useState(false); 

    const handleTitleChange = (e)=>setTempTitle(e.target.value);
    const handleDateChange = (e)=>setTempDate(e.target.value);

    const handleEditMode = ()=>{setIsEditing(true)}; // 수정모드
    const handleGoodBtn = (e)=>{ // 좋아요 버튼
        e.stopPropagation(); // 버블링막기 - 상위요소로 이벤트가 전파되지 않음
        increaseGood(item.id)
    }
    const showDeleteModal = ()=>{setDeleteVisible(true)}; // 삭제버튼
    const confirmDelete = ()=>{
        deletePost(item.id)
        setDeleteVisible(false)
    }; // 삭제버튼
    const cancelDelete = ()=>{
        setDeleteVisible(false)
    }; 
    const postRef = useRef(null); // 특정 대상에 이름표 붙이는 것

    // 클래스 이름
    const postClassName = `postInput ${isEditing ? "edit" : ""}`
    // true 이면 - "postInput edit"
    // false 이면 - "postInput"
    
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
    
    
    
    // postRef = .post
    return (
        <div 
            className="post"
            ref={postRef}
            onClick={handleEditMode} 
        >
            <div>
                <PostInput
                    type="text"
                    className={postClassName}
                    value={tempTitle}
                    onChange={handleTitleChange}
                    readOnly={!isEditing}
                    onClick = {handleEditMode} // 항상 수정모드 활성화
                />
                <button onClick={handleGoodBtn}>👍🏻{item.good}</button>
                
            </div>
            
            <div>
                <PostInput
                    type="date"
                    className={postClassName}
                    value={tempDate}
                    onChange={handleDateChange}
                    readOnly={!isEditing}
                    onClick = {handleEditMode} // 항상 수정모드 활성화
                    /*
                        onClick 실행시 매개변수에 모든 정보가 담김
                        onClick = {(매개변수)=>{setIsEditing(true)}}
                    */
                />
                <button onClick={showDeleteModal}>❌</button>
            </div>
            {/* 
                삭제 레이어창 
                - 특정 요소가 보이냐 안보이냐 조절
                1) state : false - 안보임/ true - 보임
                2) 특정 요소 클릭하면
                - setState() 함수가 실행되면서 true또는 false 값으로 변경
                3) 태그
                    {state변수 && <태그></태그}
                    -state변수에 따라 뒤에오는 태그가 true(보임) / false(안보임)
            */}
            {deleteVisible && (
            <div className="deleteModal">
                <span>삭제하시겠습니까?</span>
                <button onClick={confirmDelete} className="confirm">확인</button>
                <button onClick={cancelDelete} className="cancel">취소</button>
            </div>
            )}
        </div>
    )
}

export default Post;