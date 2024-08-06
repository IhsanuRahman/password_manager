import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../axios'
import Header from '../components/Header'
import { Clipboard } from 'flowbite-react'

function ViewPassword() {
    const { id } = useParams()
    const [data,setData]=useState({

    })
    const navigator=useNavigate()
    useEffect(()=>{
        api.get('password/get-by-id?id='+id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
      
            },
        }).then((res)=>{
            setData({...res.data})
        }).catch((res)=>{
            navigator('/')
        })
    },[])
    const [showAlert, setShowAlert] = useState(false)
    const [is_loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const popAlert = (msg) => {
        setError(msg)
        setShowAlert(true)
    }

    const submit = () => {

        if (is_loading) {
            return
        }
        setLoading(true)

        api.post('/password/add', {
            username: data.username.trim(),
            site_name: data.site_name.trim(),
            site_url: data.site_url.trim(),
        }).then((res) => {
            setLoading(false)
        }).catch((res) => {
            popAlert(res.response.data.detail)
            setLoading(false)
        })

        setLoading(false)

    }
    return (
        <div className='max-w-screen h-screen overflow-y-hidden' style={{ marginTop: '60px' }} >
            <Header leading={
                <svg onClick={_=>navigator('/')} className=" ms-1 cursor-pointer  w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
              </svg>
              
            } ></Header>
            {/* <div className='' style={{ height: '60px' }}>
                {showAlert && <div id="alert-2" class="flex items-center  p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ms-3 text-sm font-medium">
                        {error}
                    </div>
                    <button type="button" onClick={
                        _ => setShowAlert(false)} class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                        <span class="sr-only">Close</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>}</div> */}
                    <button className='ms-auto flex mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                        onClick={_=>{
                            api.delete('password/delete',{
                                data: {
                                    id: id
                                },
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('access')}`,

                                },}).then((res)=>{
                                    navigator('/')
                                })
                        }}
                    >delete</button>
            <div className='  w-full   flex-col flex px-9'>
                <h2 className='text-center text-2xl mt-auto mb-auto font-extrabold'>View Password</h2>
                <label className="mb-2">Site Name</label>
                <input type="text" value={data.site_name} placeholder="Site Name" id="" className="mb-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={e => {
                        setData({ ...data, site_name: e.target.value })
                    }}  disabled
                    readOnly
                />
                <label className="mb-2">Site URL</label>
                <input type="url" value={data.site_url} placeholder="Site URL" id="" className="mb-2 md:mb-0 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={e => {
                        setData({ ...data, site_url: e.target.value })
                    }}  disabled
                    readOnly
                />
                <label className="mb-2">Username</label>
                <input type="text" value={data.username} placeholder="Username" id="" className="mb-2 md:mb-0 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={e => {
                        setData({ ...data, username: e.target.value })
                    }}  disabled
                    readOnly
                />
                 {/*<label>password length:{data.passLength}</label>
                <input type='range' min={10} max={35} value={data.passLength} onChange={e => {
                    setData({ ...data, passLength: e.target.value })
                }} />
                <label>Password Types</label>

                <div className='flex'>
                    <p>uppercase:</p> <input type='checkbox' checked={data.choice.uppercase} onChange={e => {
                        if (e.target.value === 'on') {
                            setData({ ...data, choice: { ...data.choice, uppercase: true } })
                        } else {
                            setData({ ...data, choice: { ...data.choice, uppercase: false } })
                        }
                    }} /><p className='ms-5' >digits:</p> <input type='checkbox' checked={data.choice.digits} onChange={e => {
                        if (e.target.value === 'on') {
                            setData({ ...data, choice: { ...data.choice, digits: true } })
                        } else {
                            setData({ ...data, choice: { ...data.choice, digits: false } })
                        }
                    }} />
                    <p className='ms-5'>special characters:</p> <input type='checkbox' checked={data.choice.sp_chars} onChange={e => {
                        if (e.target.value === 'on') {
                            setData({ ...data, choice: { ...data.choice, sp_chars: true } })
                        } else {
                            setData({ ...data, choice: { ...data.choice, sp_chars: false } })
                        }
                    }} />
                </div> */}
                <div className="">
                    <label>password:</label>
                    <div className="relative flex col-span-6 block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        <label htmlFor="password manager" className="sr-only">
                            Password
                        </label>
                        <input
                            id="npm-install"
                            type="text"
                            className=" block  w-full  rounded-lg  bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            value={data.password}
                            disabled
                            readOnly
                        />
                        <Clipboard.WithIcon className='ms-auto' valueToCopy={data.password} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ViewPassword