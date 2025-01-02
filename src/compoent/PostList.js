import Post from './Post'
function PostList({posts, increaseGood,editPostTitle,editPostDate,deletePost,writePost}) {
    
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
                deletePost={deletePost}
                writePost={writePost}
                />
            )
          })
        }
        </>
    )
}

export default PostList;