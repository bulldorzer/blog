
/* eslint-disable */ // warning 안뜨게 해주는 문법
import { useState } from 'react';
import './App.css';

function App(){
  
  // 일반 변수 변경 : x = x+1 ;
  // State 변경 : x함수 (x+1) - 변경과 동시에 렌더링 기능 들어 있음
  let [post, setPost] = useState([
    { id:0, title: '신촌 디저트 맛집', good: 13, regiDate:'2024-11-12' },
    { id:1, title: '겨울 방한 아이템', good: 7, regiDate:'2024-12-24' },
    { id:2, title: '리액트 독학', good: 15, regiDate:'2023-12-24' },
    { id:3, title: '텀블러 구입', good: 0, regiDate:'2022-12-24' },
  ]);

  //좋아요 증가
  const increaseGood = (i) =>{
    let copy = [...post]
    copy[i].good += (copy[i].good<5) ? 1 :0
    setPost(copy)
  }


  // 타이틀 변경
  const editPostTitle = (i)=>{
    // 배열 값 바꿀 때
    let copy = [...post]; // 배열 스프레드복사로 값을 카피
    copy[i].title = '홍대 맛집' // 복사된 배열의 객체 값을 바꿈
    setPost(copy) // 변경된 배열로 통째로 값을 변경
  }
  const [sortState, setSortState] = useState(0);

  const sortPosts = (key)=>{
    // setSortState(!sortState); // 스위치 같은 기능 이벤트 변화에 반대 값으로 전환
    
    // const newPosts = [...post];
    // let result = newPosts.sort((x,y)=>x.title.localeCompare(y.title));
    let newPosts = [...post].sort((x,y)=>{
              if (typeof x[key] === "number") {
                return (sortState)? x[key] - y[key] : y[key] - x[key] // 숫자정렬방식
              }else{

                return (sortState)
                        ? x[key].localeCompare(y[key]) 
                        : y[key].localeCompare(x[key])
              }
    });
    setPost(newPosts)
    
      
      
    
  }
  /*
    function의 리턴값으로
    랜더링할 태그를 지정할때 구문

    function 함수이름(){
      return(
        <태그></태그>
      )
    }
    
    arrow function
    post.map(()=>( 
      <태그></태그>
      )
    )
  */

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
        <button onClick={()=>{sortPosts('title')}}>제목 정렬</button>
        <button onClick={()=>{sortPosts('good')}}>좋아요 정렬</button>
        <button onClick={()=>{sortPosts('regiDate')}}>작성일 정렬</button>
        <label>
          <input type="checkbox" checked={sortState} 
          onChange={()=>{setSortState(!sortState)}}/>
          { (sortState)?"내림":"오름"}차순
          
        </label>
        {
          post.map( (item, i) => {
            
            let {id,title,good,regiDate} = item
            
            return (
            <div className='post' key={id}>
              <h3 className='postTitle'>
                {title} 
                <span onClick={()=>{increaseGood(i)}}>👍🏻</span>
                {good}
              </h3>
              <p className='regiDate'>{regiDate}</p>
              <button onClick={()=>{editPostTitle(i)}}>수정</button>
            </div>
            )
          })
        }
        
      </main>
    </>
  )
  /*
    onClick 이벤트시 넘겨줄 매개변수가 없다면 변수명만 쓰면되지만
    넘겨야할 매개변수가 있다면 화살표 함수식으로 표기할 것
  */
}

export default App;
