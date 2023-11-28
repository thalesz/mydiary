import axios from "../api/axios"
import { useState, useContext } from 'react';
import {format} from 'date-fns'
import DataContext from "../context/dataContext";


const Text = () => {
    const [title, setTitle] = useState('')
    const [body, setBody]=useState('')
    const {posts,setPosts} = useContext(DataContext)

    const handleSubmit = async(e) =>{
        console.log(posts)
        e.preventDefault()
        const id = posts.length? posts[posts.length-1].id +1:1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {id, title: title, datetime, body: body};
        try{
          const response = await axios.post('/posts', newPost)
          const allPost = [...posts, response.data]
          setPosts(allPost)
          setTitle('')
          setBody('')
        }catch(err){
          console.log(`Error: ${err.message}`)
        }
        
      }


    return (
        <section className="newTxt">
            <h1 id="newPost"> Faça uma nova postagem</h1>
            <form 
                className="formPost"
                onSubmit={handleSubmit}
            >
                <label htmlFor="postTitle"> Título:</label>
                <input 
                    id="postTitle"
                    type="text" 
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                <label htmlFor="postBody">Postagem:</label>
                <textarea 
                    id="postBody" 
                    required  
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                    ></textarea>
                <button type='submit'>Postar</button>
            </form>
        </section>
    )
}

export default Text