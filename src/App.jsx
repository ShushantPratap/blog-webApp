import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/authentication';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/Index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    setLoading(true);
    authService.getCurrentUser()
    .then(userData => {
      if(userData){
        dispatch(login(userData));
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
    </>
  ) : <h1>Loading...</h1>;

}

export default App;
