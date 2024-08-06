import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { logout } from '../../features/user'

function Home() {
  const { user } = useSelector(state => state.user)
  const [list, setList] = useState([])
  const navigator = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    api.get('password/get', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,

      },
    }).then((res) => {
      setList([...res.data.data])
    })
  }, [])
  return (
    <div className='w-full' style={{ marginTop: '60px' }}>
      <Header trailing={

        <div className='flex items-center'>
          <p >{user.username}</p> <button onClick={_ => {
            dispatch(logout())
            navigator('/login')

          }} className='ms-1 p-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>logout</button></div>} />
      <div className='w-full '>
        <div className='w-full flex justify-between px-8 pt-5'>
          <p className='text-2xl'>Passwords</p>
          <button className='button' onClick={_ => navigator('/add')}> + new</button>
        </div>

        <div className='w-full px-9 mt-4 flex flex-col text-lg'>
          {list.length == 0 ? <p className='w-full text-center text-2xl text-gray-900'>no passwords</p> : list.map((item) => {
            return <div className='border-b-2 rounded  border-gray-500 flex items-center hover:bg-gray-500 hover:text-black' onClick={_ => navigator('/view/' + item.id)} style={{ height: '50px' }}>
              {item.site_url} as {item.username}
            </div>
          })}


        </div>
      </div>
    </div>
  )
}

export default Home