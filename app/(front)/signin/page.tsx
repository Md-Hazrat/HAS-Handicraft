import { Metadata } from "next";
import { Form } from "react-hook-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function Signin() {
  return <Form />;
}
