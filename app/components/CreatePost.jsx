"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect,useRouter } from 'next/navigation'


const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please enter a title")
    .min(12, "Title at least 12 characters"),
  description: Yup.string()
    .required("Please enter description for the post")
    .min(30, "Please enter description more than 30 characters"),
  content: Yup.string()
    .required("Please enter content for the post")
    .min(100, "Please enter content more than 100 characters"),
  image: Yup.string(),
});

const CreatePost = () => {
const router= useRouter()
  const token = localStorage.getItem("token");
  const [image, setImage] = useState("");
  const [loading,setLoading] = useState(true)

  const handleFileChange = async (event) => {
    const file = await event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     const base64String = reader.result;
    //     setImage(base64String);
    //   };

    //   reader.readAsDataURL(file);
    // }
    let formData = new FormData();
    formData.append("file", file);
    setLoading(true)
    const uploadImage = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const dataUploadImage = await uploadImage.json();
    setLoading(false)
    setImage(dataUploadImage);
  };
  return (
    <div className="flex justify-center mb-10">
      <Dialog>
        <DialogTrigger className="flex px-4 py-2 bg-green-400 items-center transition">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p>Add Post</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add your post</DialogTitle>
            <DialogDescription>
              <Formik
                handleChange={() => {
                  console.log("WTF");
                }}
                initialValues={{
                  title: "",
                  description: "",
                  content: "",
                  image: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                  // same shape as initial values
                  try {
                    values.image = image.filename;
                    const data = await fetch(
                      `${process.env.NEXT_PUBLIC_API_URL}post`,
                      {
                        method: "POST",
                        headers: {
                          "Authorization": `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      }
                    );
                    if(data.status===200){
                        toast.success("Success! Post successful.");
                        setTimeout(() => {
                            router.refresh()
                            
                        },3000)
                    }
                    else{
                        toast.error("Failed! Post Failed, Please try again later");
                        setTimeout(() => {
                            router.refresh()
                        },3000) 
                    }
                  } catch (error) {
                    console.error(error);
                  }

                  //   const getImage = async () => {
                  //   };
                }}
              >
                {({ errors, touched }) => (
                  <Form className="mt-10 flex flex-col gap-3 w-full">
                    <label>Select your image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {loading && <h3>Your image will display hehe :D ....</h3>}
                    {image &&(
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}upload/file/${image.filename}`}
                        className="w-[250px] h-[250px]"/>
                    )}
                    <label>Title</label>
                    <Field
                      name="title"
                      type="text"
                      className="border-2 border-black w-full py-2"
                    />
                    {errors.title && touched.title ? (
                      <div className="text-red-400">{errors.title}</div>
                    ) : null}
                    <label>Description</label>
                    <Field
                      name="description"
                      type="text"
                      className="border-2 border-black w-full py-2"
                    />
                    {errors.description && touched.description ? (
                      <div className="text-red-400">{errors.description}</div>
                    ) : null}
                    <label>Content</label>

                    <Field
                      name="content"
                      as="textarea"
                      rows={5}
                      className="border-2 border-black w-full py-2 h-20"
                    />
                    {errors.content && touched.content ? (
                      <div className="text-red-400">{errors.content}</div>
                    ) : null}

                    {/* <Field
                      name="image"
                      type="text"
                      className="border-2 border-black w-full py-2"
                      value={image.filename}
                      disabled
                    />
                    {errors.image && touched.image ? (
                      <div className="text-red-400">{errors.image}</div>
                    ) : null} */}
                    <button
                      type="submit"
                      className="w-full px-10 py-4 bg-blue-300"
                    >
                      Create
                    </button>
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ToastContainer/>
    </div>
  );
};

export default CreatePost;
