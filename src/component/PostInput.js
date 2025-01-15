
function PostInput({type, value, className, onChange, readOnly, onClick}){
    return(
        <input
            type={type}
            value={value}
            className={className}
            onChange={onChange}
            readOnly={readOnly}
            onClick={onClick}
        />
    )
}
export default PostInput;