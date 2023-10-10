import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '../icon/deleteIcon'
import EditIcon from '../icon/editIcon'
import { ToastContainer, toast } from 'react-toastify';




const SupplierData = () => {
    const navigate = useNavigate()
    const [data,setData]= useState([])

    const getList =async()=>{
        try {
            const result = await axios.get('http://localhost:2000/supplier/list')
            if(result){
                setData(result?.data)
            }
        } catch (error) {
            toast(error?.response?.data?.message)
            console.log(error)
        }
    }


    const onDelete=async(id)=>{
        try {
            const result = await axios.delete(`http://localhost:2000/supplier/delete/${id}`)
            console.log(result)
            if(result){
                toast(result?.data?.message);
                getList()
            }
        } catch (error) {
            
            console.log(error)
        }
    }

    useEffect(()=>{
        getList()
    },[])
  return (
    <>
    <div className='header container mt-5'>
      <button type="submit" className="btn btn-primary" onClick={()=>navigate('/supplier')}>Create Supplier</button>
    </div>
    <div className='supplier-data container mt-5'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Sr.No</th>
      <th scope="col">Supplier Type</th>
      <th scope="col">Name</th>
      <th scope="col">Email Address</th>
      <th scope="col">Address</th>
      <th scope="col">Contact Number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,key)=>{
        return (
            <>
    <tr>
      <th scope="row">{key+1}</th>
      <td>{item?.supplierType}</td>
      <td>{item?.name}</td>
      <td>{item?.email}</td>
      <td>{item?.address}</td>
      <td>{item?.number}</td>
      <td>
    <EditIcon 
    onClick={()=>navigate(`/supplier`,{
        state:{id:item?._id,
            name:item?.name,
            address:item?.address,
            number:item?.number,
            email:item?.email,
            supplierType:item?.supplierType
    }})}
    />

    <DeleteIcon 
    onClick={()=>onDelete(item?._id)}
    />
      </td>
    </tr>
            </>
        )
    })}
   
    
  </tbody>
</table>
    </div>
    <ToastContainer/>
    </>

  )
}

export default SupplierData