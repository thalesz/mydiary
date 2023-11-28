import { createContext, useState, useEffect } from "react";
import useAxiusFetch from '../hooks/useAxiusFetch';
const DataContext = createContext({})

export const DataProvider=({children}) =>{
    const[posts,setPosts]=useState([])
    const  {data,fetchError, isLoading} = useAxiusFetch('https://655e133e9f1e1093c59a7a3a.mockapi.io/mydiary/posts')
  
    useEffect(()=>{
      console.log('cheguei aqui');
      setPosts(data)
    },[data])
  
    /*useEffect(()=>{
      const fetchPost = async()=>{
        try{
          const response = await api.get('/posts')
          setPosts(response.data)
        }catch(err){
            if(err.response){
              //console.log(err.response.data)
              console.log(err.response.status)
              console.log(err.response.headers)
            }else{
              console.log(`Error: ${err.message}`)
            }
        }
      }
      fetchPost();
    },[])*/
  


    return(
        <DataContext.Provider value={{
            fetchError, isLoading,
            posts, setPosts, 
        }}>
            {children} </DataContext.Provider>
    )
}

export default DataContext