import { Metadata } from 'next'
import ShippingForm from './form'

export const metadata: Metadata = {
  title: 'Shipping Address',
}

export default async function ShippingPage() {
  return <ShippingForm />
}