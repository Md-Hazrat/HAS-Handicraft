import { Metadata } from 'next'
import PaymentForm from './PaymentForm'

export const metadata: Metadata = {
  title: 'Payment Method',
}

export default async function PaymentPage() {
  return <PaymentForm />
}