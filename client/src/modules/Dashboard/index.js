import React from 'react';
import User from '../../Assets/avatar.png'
import Avatar from '../../Assets/user.svg'
import Arrow from '../../Assets/R.png'
import Phone from '../../Assets/phone-outgoing.svg'
import Input from '../../components/input/index'
const Dashboard = () => {

    const contacts = [
        {
            name:'Jerry',
            status:'InActive',
            img: Avatar
        },

        {
            name:'Ashrin',
            status:'Active',
            img: Avatar
        },
        {
            name:'Ashik',
            status:'Active',
            img: Avatar
        },
        {
            name:'Buri',
            status:'InActive',
            img: Avatar
        },
 
        {
            name:'Lily',
            status:'Active',
            img: Avatar
        },
        {
            name:'Sahra',
            status:'Active',
            img: Avatar
        }

    ]
  return (
    <div className='w-screen flex '>
      <div className='w-[25%]  h-screen '>
         <div className='flex justify-center items-center my-6 '>
            <div className=''>
            <img src = {User} width={50} height={50} />
            </div>
            
            <div className='ml-4'>
                <h3 className='text-2xl '>Nusrat Jahan Jerin</h3>
                <p className='text-lg font-light'>My Account</p>
            </div>
         </div>
         <hr/>
         <div className='ml-4 my-1 flex flex-col space-y-1 '>
            <div >
                Messages
            </div>
              <div>
               { 
               contacts.map(({name, status, img}) => {
                return(
                    <div className='flex items-center py-4 border-b border-violet-200'>
                        <div className='cursor-pointer flex'>
                    <div className='border border-purple-200 p-2 rounded-full'>
                    <img src = {img} width={30} height={60} />
                    </div>
                    
                    <div className='ml-4'>
                        <h3 className='text-lg font-semibold'>{name}</h3>
                        {
                            status == 'InActive'? <p className='text-sm font-light text-gray-600'>{status}</p>:
                            <p className='text-sm font-semibold text-green-500'>{status}</p>
                        }
                        
                        
                    </div>
                    </div>
                 </div>
                  
               
                )
           
                })
                }
              </div>
         </div>
      </div>
      <div className='w-[50%] h-screen border bg-white  flex flex-col items-center '>
         <div className='w-[75%] h-[80px] bg-violet-200 mt-7 mb-3 flex  items-center  rounded-full px-10' >
         <div className='border border-purple-300  rounded-full cursor-pointer'>
                    <img src = {Avatar} width={50} height={50} />
                    </div>
           <div className='ml-6 mr-auto '>
            <h3 className='font-semibold'>Alexadar</h3>
            <p className='font-light'>Online</p>
            </div>
            <div>
           
            </div>
           <div className='cursor-pointer'><img src = {Phone} width={30} height={60} /></div>
         </div>
         <div className='h-[75%] border w-full overflow-y-scroll'>
            <div className='h-[1000px] px-10 py-10 '>
                    <div className='max-w-[50%] bg-violet-300 rounded-b-xl rounded-tr-xl p-4 mb-6'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis eaque excepturi debitis, iste distinctio ipsum sequi fug

                 </div>
                    <div className='max-w-[50%] bg-violet-500 rounded-b-xl rounded-tl-xl ml-auto p-4 mb-4'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis eaque excepturi debitis, iste distinctio ipsum sequi fug
                        </div>


                        <div className='max-w-[50%] bg-violet-300 rounded-b-xl rounded-tr-xl p-4 mb-6'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis eaque excepturi debitis, iste distinctio ipsum sequi fug

                 </div>
                    <div className='max-w-[50%] bg-violet-500 rounded-b-xl rounded-tl-xl ml-auto p-4 mb-4'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis eaque excepturi debitis, iste distinctio ipsum sequi fug
                        </div>
                        <div className='max-w-[50%] bg-violet-300 rounded-b-xl rounded-tr-xl p-4 mb-6'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis eaque excepturi debitis, iste distinctio ipsum sequi fug
                        </div>
                    <div className='max-w-[50%] bg-violet-500 rounded-b-xl rounded-tl-xl ml-auto p-4 mb-4'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis eaque excepturi debitis, iste distinctio ipsum sequi fug
                        </div>
            </div>
            
         </div>
         <div className='w-[100%] border border-t-black  bg-violet-200 flex items-center space-x-1 p-2' >
            <div className='ml-3 cursor-pointer'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-paperclip"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" /></svg></div> 
            <div className='cursor-pointer'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-camera"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg></div>
            <input className='w-[1000px] h-[30px] rounded-full bg-light  focus:ring-2 focus:border-0 mt-2 mb-2'></input>
            <div className='ml-3 cursor-pointer'>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-send-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>

            </div>
          </div>
      </div>
   
      <div className='w-[25%]'></div>
    </div>
  );
}

export default Dashboard;
