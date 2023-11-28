import { Link} from "react-router-dom";
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AutoProvider"
import axios from "../api/axios"
import { useNavigate } from 'react-router-dom';

const LOGIN_URL='/logepwd'

const Login=()=>{
    const navigate = useNavigate();
    const {setAuth}=useContext(AuthContext)

    const userRef=useRef();
    const errRef=useRef();

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg,setErrMsg]=useState('')
    const[success, setSuccess]=useState(false)

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const response=await axios.get(LOGIN_URL,
                JSON.stringify({user,pwd}),
                {
                    headers:{'Content-Type':'application/json'},
                    withCredentials:true
                }
            )
            console.log(JSON.stringify(response?.data))


            const matchingUser = response.data.find(data => data.user === user && data.pwd === pwd);

            if (matchingUser) {
                console.log('Login bem-sucedido');
                setUser('');
                setPwd('');
                setSuccess(true);

                navigate('/home', { state: { user: matchingUser.user } });
                

                const accessToken = matchingUser.acessToken;
                const roles = matchingUser.roles;

                if (accessToken && roles) {
                    setAuth({ user, pwd, roles, accessToken });
                }


            } else {
                setErrMsg('Usuário ou senha incorretos');
            }

        }catch(err){
            if(!err?.response){
                setErrMsg("No server response")
            }else if(err?.response?.status===400){
                setErrMsg('Missing Username or Password')
            }else if(err?.response?.status===401){
                setErrMsg('Unathorized')
            }else{
                setErrMsg("Login Failed")
            }
            errRef.current.focus()
        }
    }

    return(
        <>
            
                <section>
                    <p 
                        ref={errRef} 
                        className={errMsg?'errmsg':"offscreen"}
                        aria-live="assertive"
                    >{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input type="text" 
                            id="username"
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e)=>setUser(e.target.value)}
                            value={user}
                            required
                            />
                            
                            <label htmlFor="password">Password</label>
                            <input 
                            type="password" 
                            id="password"
                        
                            onChange={(e)=>setPwd(e.target.value)}
                            value={pwd}
                            required
                            />


                            <button>Entrar</button>                    
                    </form>
                    <p>
                        Precisa de uma conta? <br />
                                        
                    </p>
                    <Link to="/Register">Cadastre-se</Link>  
                </section>
          
        </>
    )
}
export default Login