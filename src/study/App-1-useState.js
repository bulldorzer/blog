
/* eslint-disable */ // warning 안뜨게 해주는 문법
import { useState } from 'react';
import './App.css';

function App(){
  // js 코드
  // 데이터 바인딩
  // let postTitle = ["신촌 디저트 맛집", '겨울 방한 아이템', '리액트독학']
  // 변수명, 변수를 변경함 함수 이름
  // a: 변수명  b: 변수를 변경하는 함수이름 
  // let [a,b] = useState('값')

   
  /*
    State
      - 일반 변수와 똑같다 자료보관용
      - State는 변동 사항이 생기면 (=데이터가 변경되면) 해당 html로 자동으로 재렌더링(다시그려줌)
      => ui 기능 개발이 편리해짐, 스무스하게 동작이 됨
      ex ) 
      로고 이미지 경로 연결 - 변수 (변경할 일이 별로 없는 데이터)
      블로그 제목/내용 -> State (변경할 상황이 많은 데이터)

      1) 단일값일 경우
        let [좋아요,좋아요변경] = useState(0)  
        const handle좋아요 = () => { 좋아요변경(좋아요+1) }

      2) state의 배열의 일부 값 변경
        let [postTitle,setPostTitle] = useState(["신촌 디저트 맛집", '겨울 방한 아이템', 
        <button onClick={()=>{
          // 배열 값 바꿀 때
          let copy = [...postTitle]; // 배열 스프레드복사로 값을 카피
          copy[0] = '홍대 맛집' // 복사된 배열의 값을 바꿈
          setPostTitle(copy) // 변경된 배열로 통째로 값을 변경
        }}>수정</button>

  */
  let [postTitle,setPostTitle] = useState(["신촌 디저트 맛집", '겨울 방한 아이템', '리액트독학'])
  let [좋아요,좋아요변경] = useState([0,0,0])
  // 일반 변수 변경 : x = x+1 ;
  // State 변경 : x함수 (x+1) - 변경과 동시에 렌더링 기능 들어 있음

  const handle좋아요 = () => {
    let copy = [...좋아요]
    copy[0] += (copy[0]<5 ? copy[0]+=1 : copy[0]);
    좋아요변경(copy)}
  const editPostTitle = ()=>{
    // 배열 값 바꿀 때
    let copy = [...postTitle]; // 배열 스프레드복사로 값을 카피
    copy[0] = '홍대 맛집' // 복사된 배열의 값을 바꿈
    setPostTitle(copy) // 변경된 배열로 통째로 값을 변경
  }

  //리턴할 html
  return (
    // 항상 한태크만 표시해야함
    // 한태그 안에 여러 태그가 있는건 상관없지만 여러태그가 있으면 안됨
    <>
      <header className="header">
        <h1 className='logo'>Blog</h1>
        <nav>
          <h2>test</h2>
        </nav>
      </header>
      <main>
        <div className='post'>
          <h3 className='postTitle'>{postTitle[0]} 
            <span onClick={handle좋아요}>👍🏻</span>
            {좋아요[0]}
          </h3>
          <p className='regiDate'>2024-12-15</p>
          <button onClick={editPostTitle}>수정</button>
        </div>
        <div className='post'>
          <h3 className='postTitle'>{postTitle[1]}
            <span onClick={handle좋아요}>👍🏻</span>
            {좋아요[1]}
          </h3>
          <p className='regiDate'>2024-12-16</p>
        </div>
        <div className='post'>
          <h3 className='postTitle'>{postTitle[2]}
            <span onClick={handle좋아요}>👍🏻</span>
            {좋아요[2]}
          </h3>
          <p className='regiDate'>2024-12-30</p>
        </div>
      </main>
    </>
  )
}

export default App;
