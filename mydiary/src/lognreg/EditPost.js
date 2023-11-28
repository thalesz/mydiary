import { useEffect, useState } from "react"
import { useParams, Link, useNavigate} from "react-router-dom"

import { useContext } from 'react';
import { format } from "date-fns";
import DataContext from "../context/dataContext";
import axios from "../api/axios"



const EditPosts = () => {
    const navigate = useNavigate();
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
  
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
  
    useEffect(() => {
      if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
      }
    }, [post, setEditTitle, setEditBody]);
  
    const handleEdit = async (id) => {
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      try {
        const response = await axios.put(`/posts/${id}`, updatedPost);
        setPosts(
          posts.map((post) => (post.id === id ? { ...response.data } : post))
        );
        setEditTitle('');
        setEditBody('');
        navigate('/Home');
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
  
    return (
      <main className="Post">
        {editTitle ? (
          <>
            <h1>Editar Post</h1>
            <form
              className="newPostForm"
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(post.id);
              }}
            >
              <label htmlFor="postTitle">Title:</label>
              <input
                id="postTitle"
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <label htmlFor="postBody">Post:</label>
              <textarea
                id="postBody"
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              ></textarea>
              <button type="submit">Salvar</button>
            </form>
          </>
        ) : (
          <>
            <h2>Ihhhh, post não encontrado</h2>
            <p>Que chato né...</p>
            <p>
              <Link to="/Home">Visite nosso Feed</Link>
            </p>
          </>
        )}
      </main>
    );
  };
  
  export default EditPosts;
  