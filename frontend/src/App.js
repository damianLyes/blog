import './App.css';
import Header from './components/Header';
//import Footer from './components/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateBlogPage from './pages/CreateBlogPage';
import PostPage from './pages/PostPage';
import AllBlogsPage from './pages/AllBlogsPage';
import EditPostPage from './pages/EditPostPage';
import MyBlogsPage from './pages/MyBlogsPage';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Route path='/' exact component={HomePage}/>
      <Route path='/register' component={RegisterPage}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/create-blog' component={CreateBlogPage}/>
      <Route path='/post/:id' component={PostPage}/>
      <Route path='/all-blogs' component={AllBlogsPage}/>
      <Route path='/edit-post/:id' component={EditPostPage} />
      <Route path='/blogs/:id' component={MyBlogsPage} />
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
