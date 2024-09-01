import logo from './logo.svg';
import './App.css';
import Form from './modules/Form';
import Dashboard from './modules/Dashboard';
import {Routes, Route, Navigate} from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  //check if log in thn no sign in page
  const isLoggedIn = localStorage.getItem('user:token') !== null ||true 
  
  if(!isLoggedIn) {return <Navigate to = {'/users/sign_in'} />}
   //check if dashboard open in no sign in or sign up page
  else if(isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
      return <Navigate to = {'/'} />
  }

    return children
}
function App() {
  return (
    <Routes>
      <Route path = '/'  element = {
        <ProtectedRoutes>
          <Dashboard/>
        </ProtectedRoutes>
      }/>
      <Route  path='/users/sign_in' element = {
        <ProtectedRoutes>
           <Form isSignInPage = {true} />
        </ProtectedRoutes>
       
      } 
        
        
        />
      <Route path = '/users/sign_up' element = {
        <ProtectedRoutes>
           <Form isSignInPage = {false} />
        </ProtectedRoutes>
        
        
        } />
    </Routes>
   
  );
}

export default App;
