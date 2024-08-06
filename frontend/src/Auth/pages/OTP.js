import React, { useEffect, useState } from 'react'
import api from '../../axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function OTP() {
    const { isAuthenticated,  loading } = useSelector(state => state.user)
    useEffect(() => {
        if (isAuthenticated && !loading) {
            
            return navigator('/')
        }
    })
    const [showAlert, setShowAlert] = useState(false)
    const [error, setError] = useState('')
    const [is_loading, setLoading] = useState(false);
    const navigator=useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('SToken')) {
            navigator('/login')
        }
    }, [])
    const [OTP, setOTP] = useState('')
    const submit=()=>{
        if (is_loading) {
            return
        }
        setLoading(true)
        if (OTP.length==0){
            setError('OTP is required for verification')
            setShowAlert(true)

        }else if(OTP.length<6){
            setError('OTP need 6 digits')
            setShowAlert(true)
        }else{
            api.post('/auth/verify',{
                token:localStorage.getItem('SToken'),
                otp:OTP
            }).then((res)=>{
                localStorage.removeItem('SToken')
                setLoading(false)
                navigator('/login')
            }).catch((res)=>{
                setError(res.response.data.message)
                setShowAlert(true)
                setLoading(false)
            })
        }
        setLoading(false)
    }
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center' >
            <div style={{height:'60px'}}>
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
            </div>}</div>
            <div className='card h-2/4  md:w-1/2 flex-col flex px-9'>
                <h2 className='text-center text-2xl mt-auto mb-auto font-extrabold'>verify with OTP</h2>
                <label className="mb-2">Enter the OTP</label>
                <input type="number" placeholder="OTP" id="" value={OTP} className="mb-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={(e) => {
                        if (e.target.value.length<=6)
                            setOTP(e.target.value)
                    }}
                />
                
                <button className='button mt-auto mb-auto'
                    onClick={_ => submit()}
                >
                    {is_loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>}
                    submit</button>
            </div>
        </div>
    )
}

export default OTP