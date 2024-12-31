import { useEffect, useState } from "react";

// 패턴1 - 처음 한번만 실행
// 초기화 작업..

useEffect(()=>{
    
},[]) // 빈배열

// 깃 커밋 테스트
// 패턴 2 - 값이 변경될때마다 코드 내용 실행
// 배열의 값이 변경(업데이트) 될때마다 코드가 실행됨
// 상태 값 변경에 따른 추가 작ㅇ겁, 데이터 다시 가져오기 등 작업할 때
useEffect(()=>{
    // 실행할 내용
},[num1,num2]) 

// 패턴3 - 의존성 배열이 없는 경우 - 매번 랜더링 될때마다 실행
// 디버깅용 로그 출력, 매번 렌더링 시 필요한 작업
useEffect(()=>{
    
}) 

// 패턴4 - 클린업 작업
// 컴포넌트 언마운트 = 컴포넌트가 화면서 사라질때
// 의존성 배열값이 변경 직전에 실행
// 이벤트 리스너 제거 타이머 정리.. (removeEventListner, clearTimeout, clearInterval)
useEffect(()=>{
    // 실행

    return ()=>{
        // 해당 컴포넌트가 사라질 때, 값이 변경되기 직전에 실행하게 됨
    }
},[dependency]) 

// 패턴5 - 비동기 작업 - fetch
// 컴포넌트 시작할 때 서버에 fetch이용하여 데이터를 요청하고 있음
// 해당 데이터로 시작하고 싶을때

// App.js - 초기실행

const [posts, setPosts] = useState(null);

useEffect(()=>{
    const fetchData = async()=>{
        const response = await fetch('url');
        const data = await response.json();
        setPosts(data);
    };
    fetchData();
},[])