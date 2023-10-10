import * as yup from 'yup';


const {string}= yup

const pattern = '^([\w]*[\w\.]*(?!\.)@gmail.com)'

export const schema = yup
  .object()
  .shape({
    supplierType:string().required('Supplier Type is required.'),
    name: string().required('Name is required.'),
    number: string().required('Number is required.').max(10,'10 digit is required.'),
    address:string().required('Address is required'),
    email:string().email("Valid Email is required @gmail.com",pattern).required('Email is required')
  })
  .required();