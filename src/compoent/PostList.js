import Post from './Post'
function PostList({posts, increaseGood,editPostTitle,editPostDate}) {
    
    return (
        <>
        {    
            posts.map( (item) => {
            
            return (
              <Post 
                key={item.id} 
                item={item} 
                increaseGood={increaseGood}
                editPostTitle={editPostTitle}
                editPostDate={editPostDate}
                />
            )
          })
        }
        </>
    )
}

export default PostList;