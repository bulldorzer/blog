function SortButtons({sortPosts, sortState, setSortState}) {
    return(
        <div className="sortButtons">
            <button onClick={()=>{sortPosts('title')}}>제목 정렬</button>
            <button onClick={()=>{sortPosts('good')}}>좋아요 정렬</button>
            <button onClick={()=>{setSortState(!sortState)}}>
            { (sortState)?"▲오름":"▼내림"}차순
            </button>
        </div>
    )
}

export default SortButtons;