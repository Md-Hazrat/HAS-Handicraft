import { Metadata } from 'next'
import SignInForm from './form'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function Signin() {
  return <SignInForm />
}