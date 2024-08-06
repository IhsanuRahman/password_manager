import React, { useEffect, useState } from 'react'
import api from '../../axios'
import { useNavigate } from 'react-router-dom';
import { Toast } from "flowbite-react";
import { useSelector } from 'react-redux';

function Signup() {
    const { isAuthenticated, loading } = useSelector(state => state.user)
    useEffect(() => {
        if (isAuthenticated && !loading) {

            return navigator('/')
        }
    })
    const inputClass = "mb-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    const navigator = useNavigate()
    const [showToast, setShowToast] = useState(false);
    const [is_loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState('')
    useEffect(() => {
        localStorage.removeItem('SToken')
    }, [])
    const [userData, setData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const submithandler = (e) => {
        if (is_loading) {
            return
        }
        setLoading(true)
        let is_error = false
        if (userData.username.trim() == '') {
            errors.username = 'username is required'
            is_error = true
        } else if (userData.username.trim().length < 4) {
            errors.username = 'username need atleast 4 characters'
            is_error = true
        } else {
            errors.username = ''
        }
        if (userData.first_name.trim() == '') {
            errors.first_name = 'first name is required'
            is_error = true
        } else if (userData.first_name.trim().length < 4) {
            errors.first_name = 'first name need atleast 4 characters'
            is_error = true
        } else {
            errors.first_name = ''
        }
        if (userData.last_name.trim() == '') {
            errors.last_name = 'last name is required'
            is_error = true
        } else {
            errors.last_name = ''
        }
        if (userData.email.trim() == '') {
            errors.email = 'email is required'
            is_error = true
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email.trim())) {
            errors.email = 'enter a valid email'
            is_error = true
        }
        else {
            errors.email = ''
        }
        if (userData.password.trim() == '') {
            errors.password = 'password is required'
            is_error = true
        } else if (userData.password.trim().length < 8) {
            errors.password = 'password needs atleast 8 charecters'
            is_error = true
        }
        else {
            errors.password = ''
        }
        if (userData.confirm_password.trim() == '') {
            errors.confirm_password = 'confirm password is required'
            is_error = true
        } else if (userData.confirm_password.trim() != userData.password.trim()) {
            errors.confirm_password = 'password not matching'
            is_error = true
        }
        else {
            errors.confirm_password = ''
        }
        setErrors({ ...errors })
        console.log(is_error)
        if (!is_error) {
            api.post('/auth/signup', {
                username: userData.username.trim(),
                first_name: userData.first_name.trim(),
                last_name: userData.last_name.trim(),
                email: userData.email.trim(),
                password: userData.password.trim()
            }).then((res) => {
                const token = res.data.token
                console.log(res)
                localStorage.setItem('SToken', token)
                setLoading(false)
                navigator('/verify')
            }).catch((res) => {
                console.log(res)
                try {
                    setErrors({ ...errors, ...res.response.data })
                    setLoading(false)
                } catch {
                    setShowToast((state) => !state)
                    setToastMsg(res.message)
                    setLoading(false)
                }
            })
        }
        else {
            setLoading(false)
            //     setData({...userData,password:'',confirm_password:''})
        }

    }
    const handleinput = (e) => {
        setData({ ...userData, [e.target.name]: e.target.value })
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center' >
            <div className='card h-auto  md:w-1/2 flex-col flex px-9'>
                <h2 className='text-center text-2xl mt-10 mb-auto font-extrabold'>Register</h2>
                <label className="mb-2">Username</label>
                <input type="text" placeholder="Username" name='username' id="" className={inputClass} onChange={handleinput} value={userData.username} />
                {errors.username?.length > 0 && <li className='text-red-500'>{errors.username}</li>}
                <div className='flex gap-2'>
                    <div className='w-1/2'>
                        <label className="mb-2">Firstname</label>
                        <input type="text" placeholder="Firstname" name='first_name' id="" className={inputClass} onChange={handleinput} value={userData.first_name} />
                        {errors.first_name?.length > 0 && <li className='text-red-500'>{errors.first_name}</li>}
                    </div>
                    <div className='w-1/2'>
                        <label className="mb-2">Lastname</label>
                        <input type="text" placeholder="Lastname" name='last_name' id="" className={inputClass} onChange={handleinput} value={userData.last_name} />
                        {errors.last_name?.length > 0 && <li className='text-red-500'>{errors.last_name}</li>}
                    </div>
                </div>

                <label className="mb-2">Email</label>
                <input type="email" placeholder="Email" name='email' id="" className={inputClass} onChange={handleinput} value={userData.email} />
                {errors.email?.length > 0 && <li className='text-red-500'>{errors.email}</li>}
                <label className="mb-2"> Password</label>
                <input type="password" placeholder="Password" name='password' id="" className={inputClass} onChange={handleinput} value={userData.password} />
                {errors.password?.length > 0 && <li className='text-red-500'>{errors.password}</li>}
                <label className="mb-2">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" name='confirm_password' id="" className={inputClass} onChange={handleinput} value={userData.confirm_password} />
                {errors.confirm_password?.length > 0 && <li className='text-red-500'>{errors.confirm_password}</li>}
                <a className='cursor-pointer me-auto' onClick={_ => {
                    window.location.href = '/login'
                }
                }> already have a account?</a>
                <button className='button mt-auto mb-10' onClick={submithandler}>
                    {is_loading && <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>}

                    Signup</button>
            </div>
            {showToast && (<Toast className='fixed bottom-5 right-5'>


                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <span className="sr-only">Error icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">{toastMsg}</div>

                <Toast.Toggle className='ms-auto' />
            </Toast>)}
        </div>
    )
}

export default Signup