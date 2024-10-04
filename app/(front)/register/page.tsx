import { Metadata } from 'next'
import RegisterForm from './form'
export const metadata: Metadata = {
  title: 'Register',
}

export default async function Register() {
  return <RegisterForm />
}