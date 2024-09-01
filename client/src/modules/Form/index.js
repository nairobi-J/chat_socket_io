import React from 'react';
import {useState} from 'react'
import Input from '../../components/input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
const Form = (
    {isSignInPage = false}
) => {
    const [data, setData] = useState({
      ...(!isSignInPage && {
        fullName: ''
      } ),
      email:'',
      password:''
    })


  const navigate = useNavigate()
  return (
        <div className="bg-[#edf3fc] h-screen flex justify-center items-center">

    <div className='bg-white w-[500px] h-[700px] shadow-lg rounded-lg flex flex-col justify-center items-center'>
      <div className='text-4xl font-bold'>Welcome {isSignInPage && 'Back'}</div>
      <div className='text-xl mb-8'>{isSignInPage? 'Sign-In to explore' : 'Sign Up to get started'}</div>
      <form className='w-[500px] flex flex-col justify-center items-center' onSubmit={() => console.log('submitted')}>
      {!isSignInPage &&  
      <Input  label = 'Full Name'
      name = 'name'
      type = 'text'
      placeholder = 'Enter your full name' 
      className='mb-4 w-[50%]'
      value={data.fullName} onChange={(e) => setData({...data, fullName: e.target.value})}
      />}
       <Input  label = 'Email Address'
      name = 'email'
      type = 'email'
      placeholder = 'Enter your Email' className='mb-4 w-[50%]'
      value={data.email}
      onChange={(e) => setData({...data, email: e.target.value})}
      />
       <Input  label = 'Password'
      name = 'password'
      type = 'password'
      placeholder = 'Enter password'
      className='mb-6 w-[50%]'
      value = {data.password}
      onChange={(e) => setData({...data, password:e.target.value})}
      />
       <Button label={isSignInPage? 'Sign In':'Sign Up'} className='w-1/2 mb-4' type='submit'/>
      </form>
  
    
     <div>{isSignInPage? 'Didn\'t have an Account?': 'Already have an Account?'} <span className='text-primary cursor-pointer underline'onClick={() =>{navigate(`/users/${isSignInPage? 'sign_up' :'sign_in'}`)}}>{isSignInPage? 'Sign Up':'Sign In'} </span></div>
    </div>
    </div>

  );
}

export default Form;
