
/* eslint-disable */ // warning 안뜨게 해주는 문법
import { useCallback, useState } from 'react';
import './App.css';

import data from './data/mock';
import Header from './compoent/Header';
import PostList from './compoent/PostList';
import SortButtons from './compoent/SortButtons';

function App(){
  
  // 일반 변수 변경 : x = x+1 ;
  // State 변경 : x함수 (x+1) - 변경과 동시에 렌더링 기능 들어 있음
  let [posts, setPosts] = useState(data);

  const [sortState, setSortState] = useState(true);

  //좋아요 증가
  

  // const increaseGood = useCallback(함수,배열);
  // const increaseGood = useCallback(()=>{},[]));

  //useCallback 함수 적용
  const increaseGood = useCallback((id) =>{
  
    
    // 매개변수(prevPosts)에 기존데이터를 가져옴
    // set함수에 callback을 사용하면 최신값을 안전하게 가져올 수 있음
    /*
      방법1 : setState를 통해 최신 상태 state를 가져옴
      - 이경우, 의존성 배열에 값을 써줄 필요가 없다.
      - 함수 재생성 최소화
      - 언제사용 상태 자주변환, 여러 곳에서 상태를 업데이트 함
      - 이전 상태를 가져와서 새로운 상태를 계산
        -> 동시에 여러 업데이트 발생해도 상태 덮어쓰기 문제가 없음
    */
    setPosts((prevPosts)=>{
      const copy = [...prevPosts]
      const index = copy.findIndex(el => el.id === id) 
      if (index !== -1) { // 값을찾음
        copy[index].good += (copy[index].good<50) ? 1 :0 // 값변경
      }
      return copy;
    })
  },[]);


  // 타이틀 변경
 


  // 아래 방식은 데이터의 값이 변동 될때마다 함수를 다시 재랜더링함
  const editPostTitle = useCallback((id, newTitle)=>{
    
    setPosts((prevPosts)=>{
      // 배열 값 바꿀 때
      const copy = [...prevPosts]; // 배열 스프레드복사로 값을 카피
      const index = copy.findIndex(el => el.id === id)
      if (index !== -1) {
        copy[index].title = newTitle // 복사된 배열의 객체 값을 바꿈
      }
      return copy;
    }) // 변경된 배열로 통째로 값을 변경
  },[])

  const editPostDate = useCallback((id, newRegiDate)=>{
    
    setPosts((prevPosts)=>{
      // 배열 값 바꿀 때
      const copy = [...prevPosts]; // 배열 스프레드복사로 값을 카피
      const index = copy.findIndex(el => el.id === id)
      if (index !== -1) {
        copy[index].regiDate = newRegiDate // 복사된 배열의 객체 값을 바꿈
      }
      return copy;
    }) // 변경된 배열로 통째로 값을 변경
  },[])
  

  

  // useCallback 함수 적용
  // setSortState(!sortState); // 스위치 같은 기능 이벤트 변화에 반대 값으로 전환
    
    // const newPosts = [...post];
    // let result = newPosts.sort((x,y)=>x.title.localeCompare(y.title));
    
  const sortPosts = useCallback((key)=>{
    setPosts((prevPosts)=>{
      let newPosts = [...prevPosts].sort((x,y)=>{
        if (typeof x[key] === "number") {
          return (sortState) ? x[key] - y[key] : y[key] - x[key] // 숫자정렬방식
        }

          return (sortState)
                  ? x[key].localeCompare(y[key]) 
                  : y[key].localeCompare(x[key])
      });
      return newPosts;
    })
    
  },[sortState]) 
  // 방법2 : 상태 덮어쓰기 문제 가능성 있음 상태가 적게 변경되고, 단순한 업데이트 일때 사용
 

  //리턴할 html
  return (
    // 항상 한태크만 표시해야함
    // 한태그 안에 여러 태그가 있는건 상관없지만 여러태그가 있으면 안됨
    <>
      <Header />
      
      <main>
        
          <SortButtons
            sortPosts={sortPosts}
            sortState={sortState}
            setSortState={setSortState}
          />
       
        <PostList
          posts={posts}
          increaseGood={increaseGood}
          editPostTitle={editPostTitle}
          editPostDate={editPostDate}
          />
        
      </main>
    </>
  )
  /*
    onClick 이벤트시 넘겨줄 매개변수가 없다면 변수명만 쓰면되지만
    넘겨야할 매개변수가 있다면 화살표 함수식으로 표기할 것
  */
}

export default App;
