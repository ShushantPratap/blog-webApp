import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/authentication';
import userService from './appwrite/userConfig';
import { login, logout } from './store/authSlice';
import { savePost } from './store/postSaveSlice';
import { Header, Footer, Loader } from './components/Index';
import { Outlet } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appwriteService from './appwrite/config';
import { cacheStorePosts } from './store/postSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status);
  const savePostId = useSelector(state => state.savePosts.savePosts);
  
  const storePosts = useSelector(state => state.post.posts);
  
  useEffect(() => {
    setLoading(true);
    authService.getCurrentUser()
    .then(userData => {
      if(userData){
        dispatch(login(userData));
        userService.getUser(userData.$id)
        .then(user => {
          if(user){
            const ids = user.savePost;
            ids.forEach(id => {
              if(!savePostId.includes(id)){
                dispatch(savePost(id));
              }
            });
          }
        });
      }
      else{
        dispatch(logout());
      }
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
    <Header />
    <main>
        <Outlet />
    </main>
    {authStatus && <Footer />}
    {/* vercel analutics or  SpeedInsights*/}
    <Analytics />
    <SpeedInsights />
    </>
  ) : <Loader />;

}

export default App;
