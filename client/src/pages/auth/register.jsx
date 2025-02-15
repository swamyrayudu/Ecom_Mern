import CommonForm from '@/components/commen/form'
import { registerFormcontrols } from '@/components/config'
import { useToast } from '@/hooks/use-toast'
import { registerAction } from '@/store/authSlice'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const initialState ={
  username:'',
  email:'',
  password:'',
} 


export default function Register() {
  const [formdata,setformdata] = useState(initialState)
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const { toast } =useToast()

  function isFormValid() {
    return Object.keys(formdata)
      .map((key) => formdata[key] !== "")
      .every((item) => item);
  }
  
    function onSubmit(event)
    {
        event.preventDefault();
        dispatch(registerAction(formdata))
          .then((data)=>{
            if(data?.payload?.success) {
              toast({
                title: data?.payload?.message
              })
              navigate("/auth/login")
            }
            else{
              toast({
                title: data?.payload?.message,
                variant:"destructive"
              })
            }
        })
    }
  return (
    <div className='mx-auto w-full mx-w-md'>
      <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tighter'>
            Create a new Account
          </h1>
          <p className='mt-2'>
            Already have an account?  <Link to='/auth/login' className='font-medium hover:underline'>login</Link>
          </p>
      </div>
      <CommonForm
        formcontrols={registerFormcontrols}
        buttonText={'Sign Up'}
        formdata={formdata}
        setformdata={setformdata}
        onSubmit={onSubmit}
        isdiseble={!isFormValid()}
      />
    </div>
  )
}
