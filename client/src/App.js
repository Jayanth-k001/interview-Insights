import { Routes, Route, } from 'react-router-dom';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Home } from './components/home';
import { Main } from './components/main';
import { Profile } from './components/profile';
import { Editprofile } from './components/editprofile';
import { PostCard } from './components/displaypost';
import { Editpost } from './components/editpost';
import RecipeReviewCard from './democard';
import { YourPosts } from './components/yourPosts';
import { SavedPosts } from './components/savedPosts';
import { Search } from './components/search';
import { About } from './components/about';
import { Contact } from './components/contact';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/editprofile' element={<Editprofile />}></Route>
        <Route path='/post' element={<Editpost />}></Route>
        <Route path='/dispost' element={<RecipeReviewCard />}></Route>
        <Route path='/yourposts' element={<YourPosts />}></Route>
        <Route path='/savedposts' element={<SavedPosts />}></Route>
        <Route path='/display' element={<Search />}></Route>
      </Routes>
      <div id="second" style={{ maxWidth: "100%", height: "auto", color: "whitesmoke", marginTop: "100px" }}>
        <About />
      </div>
      <div id="third" style={{ maxWidth: "100%", height: "auto", color: "whitesmoke" }}>
        <Contact />
      </div>
    </>
  );
}

export default App;
