
/* eslint-disable */ // warning 안뜨게 해주는 문법
import { useCallback, useState } from 'react';
import '../css/App.css';

import data from '../data/mock';
import PostList from '../compoent/PostList';
import SortButtons from '../compoent/SortButtons';
import Write from '../compoent/Write';

import BasicLayout from '../layout/BasicLayout'

function BlogPage(){
  
  // 일반 변수 변경 : x = x+1 ;
  // State 변경 : x함수 (x+1) - 변경과 동시에 렌더링 기능 들어 있음
  let [posts, setPosts] = useState(data);

  const [sortState, setSortState] = useState({
    title : true, // true 일때 오름차순, 내림일때 내림차순
    good : true 
  });

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
 
  const addPost = useCallback((newPost)=>{
    setPosts((prevPosts)=>{
      const copy = [...prevPosts]
      // id값만 추출- 새로운 배열생성 -> 최대값 찾기
      // ...prevPosts : 배열 요소 개별펼치기
      // [...prevPosts] : 배열 복제하여 복제품 생성(깊은 복사)
      // id값만 추출하여 ->map으로 새로운 배열 생성 -> ...연산 -> 배열펼치기 -> 최대값찾기
      let maxId = Math.max(...prevPosts.map(e=>e.id));
      // let item = {...newPost, id: maxId+1};
      // copy.push(item);

      copy.push({...newPost, id: maxId+1}); // 배열 마지막에 추가

      return copy;
    })
  },[])

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
  

  const deletePost = useCallback((id)=>{
    setPosts((prevPosts)=> // 가장 최신의 posts

      // 클릭했을때 삭제할 아이디를 매개변수로 받아옴
      // filter() 함수를 이용해서 id와 일치하지 않는 데이터 새배열 만듬
      // 그데이터를 return
      // {
      //   const newData = prevPosts.filter(el => el.id !== id)
      //   return newData;
      // }
      prevPosts.filter(el => el.id !== id)
    )
  },[])
  

  // useCallback 함수 적용
  // setSortState(!sortState); // 스위치 같은 기능 이벤트 변화에 반대 값으로 전환
    
    // const newPosts = [...post];
    // let result = newPosts.sort((x,y)=>x.title.localeCompare(y.title));
    
  const sortPosts = useCallback((key)=>{
    // 정렬 - 데이터 업데이트
    setPosts((prevPosts)=>{
      let newPosts = [...prevPosts].sort((x,y)=>{
        if (typeof x[key] === "number") {
          return (sortState[key]) ? x[key] - y[key] : y[key] - x[key] // 숫자정렬방식
        }

          return (sortState[key])
                  ? x[key].localeCompare(y[key]) 
                  : y[key].localeCompare(x[key])
      });

      // 오름차순, 내림차순 업데이트를 해줘야함.
      setSortState((prevState)=>{
        /*
        const newState = {...prevState} // 객체 깊은 복사 = 복제
        newState[key] = !prevState[key] // 기존 값 반전
        return newState
        */

        
        return {
          ...prevState,             // 객체 복제
          // 해당 프로퍼티 값 업데이트 (프로퍼티값 존재0 - 업데이트/ x - 추가)
          [key] : !prevState[key]   
        }
        
        // ({...prevState, [key] : !prevState[key]})
      })
      return newPosts;
    })
    
  },[sortState]) 
  // 방법2 : 상태 덮어쓰기 문제 가능성 있음 상태가 적게 변경되고, 단순한 업데이트 일때 사용
 

  //리턴할 html
  return (
    // 항상 한태크만 표시해야함
    // 한태그 안에 여러 태그가 있는건 상관없지만 여러태그가 있으면 안됨
    <>
      <BasicLayout>
        <Write addPost={addPost}/>
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
            deletePost={deletePost}
            />
          
        </main>
      </BasicLayout>
      
    </>
  )
  /*
    onClick 이벤트시 넘겨줄 매개변수가 없다면 변수명만 쓰면되지만
    넘겨야할 매개변수가 있다면 화살표 함수식으로 표기할 것
  */
}

export default BlogPage;
