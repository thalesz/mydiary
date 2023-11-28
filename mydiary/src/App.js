import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './lognreg/Register';
import Login from './lognreg/Login'
import Layout from './lognreg/Layout';
import Missing from './lognreg/Missing'
import Home from './lognreg/Home';
import PostPage from './lognreg/PostPage';
import EditPosts from './lognreg/EditPost';
import { DataProvider } from './context/dataContext';

function App() {
  return (
    <DataProvider>
        <Routes>
          <Route element={<Layout/>}>
              <Route path="/" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="*" element={<Missing/>}/>
              <Route path="home" element={<Home/>}></Route>
              <Route path="/edit/:id" element={<EditPosts/>} />
              <Route path="/post/:id" element={<PostPage/>} />
          </Route>
      </Routes>
    </DataProvider>
  );
}


export default App;
