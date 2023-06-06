"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a username"),
  name: Yup.string().required("Please enter a nickname"),
  password: Yup.string()
    .required("Please enter a password")
    .min(4, "Please enter a password more than 4 characters"),
});

const Register = () => {
  return (
    <div className="w-full h-2/3 flex items-center justify-center">
      <div className="flex justify-center h-[650px] bg-white rounded-xl w-[500px] ">
        <div className="flex flex-col p-5 items-center w-full">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-bold text-4xl">Register</h1>
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          <Formik
            initialValues={{
              username: "",
              password: "",
              name: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={ async(values) => {
              // same shape as initial values
              try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });
                console.log(values)
                console.log(res);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="mt-10 flex flex-col gap-3 w-full">
                <label>Username</label>
                <Field
                  name="username"
                  type="text"
                  className="border-2 border-black w-full py-2"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-400">{errors.username}</div>
                ) : null}
                <label>Nickname</label>
                <Field
                  name="name"
                  type="text"
                  className="border-2 border-black w-full py-2"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-400">{errors.name}</div>
                ) : null}
                <label>Password</label>

                <Field
                  name="password"
                  type="password"
                  className="border-2 border-black w-full py-2"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-400">{errors.password}</div>
                ) : null}
                <button type="submit" className="w-full px-10 py-4 bg-blue-300">
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex items-center mt-5 gap-1">
            <p className="text-sm">Already create account?</p>
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
