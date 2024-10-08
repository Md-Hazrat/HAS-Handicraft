import { Metadata } from "next";

import { Form } from "react-hook-form";
export const metadata: Metadata = {
  title: "Register",
};

export default async function Register() {
  return <Form />;
}
