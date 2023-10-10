import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { schema } from '../Schema';
import CloseIcon from '../icon/close';


const Suppliers = () => {
    const {state} = useLocation()
const navigate= useNavigate()


    const {
        register,
        formState: { errors },
        handleSubmit,
        clearErrors,
        setValue,
        watch,
      } = useForm({
        resolver: yupResolver(schema),
      })



      const onSubmit=async(value)=>{
        try {
            const payload={
                ...value
            }
          const result = await axios[watch('id') ? "put":"post"](watch("id") ? `http://localhost:2000/supplier/update/${watch("id")}`:'http://localhost:2000/supplier/create',payload)
          if(result.status===201 || 200){
            
            toast(result?.data?.message)
            navigate('/')
          }
            
        } catch (error) {
            console.log(error)
            toast(error?.response?.data?.message)
        }
      }



      useState(()=>{
        if(state!==null && state.id){
                setValue('id',state?.id)
                    setValue('address',state?.address)
                    setValue('name',state?.name)
                    setValue('email',state?.email)
                    setValue('supplierType',state?.supplierType)
                    setValue('number',state?.number)
        }
      },[onSubmit])

      useLayoutEffect(()=>{
        if(state!==null && state.id){
            setValue('id',state?.id)     
    }
      },[watch('id')])

  return (
    <div className='supplier-form'>
        <form>
      <h3 className='text-center bold'>{watch("id") ? "Update Supplier": "Add Supplier"}</h3>
       <CloseIcon onClick={()=>navigate('/')}/>
            <div className='row g-3'>
                <div  className='col-md-6 form-label'>
                        <label htmlFor="inputEmail4" className="form-label">Supplier Type</label>
                        <span className='mx-1 mandatory'>*</span>
                        <select  {...register('supplierType')}
                        onChange={(e)=>{setValue("supplierType",e?.target?.value)
                            clearErrors('supplierType')}}
                        className="form-select" aria-label="Default select example">
                        <option value="" disabled selected hidden>Select Supplier Type</option>
                        <option value="Local">Local</option>
                        <option value="International">International</option>
                        </select>
                        {errors.supplierType && <div className='errors'>{errors?.supplierType?.message}</div>}
                </div>

                <div className='col-md-6'>
                    <label htmlFor="name" className="form-label">Name</label>
                    <span className='mx-1 mandatory'>*</span>
                    <input {...register('name')}
                     onChange={(e)=>{setValue("name",e?.target?.value)
                     clearErrors('name')}}
                    type="text" placeholder='Name' className="form-control" id="name"/>       
                    {errors.name && <div className='errors'>{errors?.name?.message}</div>}
                </div>

                <div className='col-md-6'>
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <span className='mx-1 mandatory'>*</span>
                    <input {...register('email')} 
                     onChange={(e)=>{setValue("email",e?.target?.value)
                     clearErrors('email')}}
                    type="email" placeholder='Email' className="form-control" id="inputEmail4"/>       
                    {errors.email && <div className='errors'>{errors?.email?.message}</div>}
                </div>

                <div className='col-md-6'>
                    <label htmlFor="number" className="form-label">Contact Number</label>
                    <span className='mx-1 mandatory'>*</span>
                    <input {...register('number')}
                     onChange={(e)=>{setValue("number",e?.target?.value)
                     clearErrors('number')}} type="number" placeholder='Contact Number' className="form-control" id="number"/>       
                    {errors.number && <div className='errors'>{errors?.number?.message}</div>}
                </div>

                <div className='col-md-12'>
                    <label htmlFor="address" className="form-label">Address</label>
                    <span className='mx-1 mandatory'>*</span>
                    <input {...register('address')} 
                     onChange={(e)=>{setValue("address",e?.target?.value)
                     clearErrors('address')}} type="text" placeholder='Address' className="form-control" id="address"/>       
                    {errors.address && <div className='errors'>{errors?.address?.message}</div>}
                </div>

                <div className="col-12 ">
                    <button   onClick={handleSubmit(onSubmit)} className="btn add-btn btn-primary">{!watch('id') ? "Add Supplier" :"Update Supplier"} </button>
                </div>
            </div>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Suppliers