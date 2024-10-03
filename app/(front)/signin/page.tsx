import { Metadata } from 'next'
import Form from './form'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function Signin() {
  return <Form />
}