export const Comment = ({comment})=>{
  console.log(comment)
    return(
        <>
          <h1>{comment?.comment}</h1>
        </>
    )
}