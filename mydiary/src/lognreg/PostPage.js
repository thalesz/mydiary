import { useParams, Link , useNavigate} from "react-router-dom"
import { useContext } from 'react';
import DataContext from "../context/dataContext";
import axios from "../api/axios"


const PostPage=()=>{

    const {posts, setPosts} = useContext(DataContext)
    const {id} = useParams();
    const navigate = useNavigate()
    const post = posts.find(post => (post.id).toString()===id)

    const handleDelete =async(id)=>{
        try {
          await axios.delete(`posts/${id}`)
          const postsList = posts.filter(post => post.id !==id)
          setPosts(postsList)
          navigate('/Home'); // Use navigate em vez de history.push
        } catch (err) {
          console.log(`Error: ${err.message}`)
        }
        
      }

    return(
        <main className="PostPage">
            <article className="Post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Editar Post</button></Link>
                        <button className="deleteButton" onClick={()=>handleDelete(post.id)}>
                            Deletar
                        </button>
                    </>
                }
                {
                    !post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p> vish, seu post não foi achado</p>
                        <p>
                            <Link to='/'>Visite nossa página inicial</Link>
                        </p>

                    </>
                }
            </article>
        </main>
    )
}

export default PostPage