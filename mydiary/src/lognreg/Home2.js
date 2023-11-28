import Feed from './Feed';
import { useContext } from 'react';
import DataContext from "../context/dataContext";

const Home2=()=>{

    const {posts, fetchError, isLoading} = useContext(DataContext)
    return(
        <main className="Home2">
           {isLoading && <p className="statusMsg">Loading posts</p>}
           {!isLoading && fetchError && <p className="statusMsg" style={{color:'red'}}>{fetchError}</p>}
           {!isLoading && !fetchError &&(posts.length ? <Feed posts ={posts}></Feed> : 
           <p className="statusMsg">
            No posts to display
           </p>)}
        </main>
    )
}

export default Home2;
