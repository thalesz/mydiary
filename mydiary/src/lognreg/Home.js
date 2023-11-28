import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AutoProvider";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from "./Header";
import Text from "./Text";
import Home2 from "./Home2"
import Footer from "./Footer";


const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    

    const location = useLocation();
    const { user } = location.state || {};

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/');
    }

    return (
        <section>
            <Header user={user}> </Header>
            <Text ></Text>
            <Home2></Home2>
            <Footer></Footer>
            <div className="flexGrow">
                <button onClick={logout}>Sair</button>
            </div>
        </section>
    )
}

export default Home
