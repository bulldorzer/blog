function SortButtons({sortPosts, sortState, setSortState}) {
    return(
        <div className="sortButtons">
            <button onClick={()=>{sortPosts('title')}}>
                제목 정렬 {(sortState.title) ? "▲":"▼"}
            </button>
            <button onClick={()=>{sortPosts('good')}}>
                좋아요 정렬 {(sortState.good) ? "▲":"▼"}
            </button>
            
        </div>
    )
}

export default SortButtons;