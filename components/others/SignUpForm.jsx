"use client";

import Link from "next/link";
import React, {useState} from "react";
import { signIn, signOut, useSession } from 'next-auth/react'
import axios from 'axios';

export default function SignUpForm() {

  const [isLggedin, setIsLggedin] = useState(false);
  const { data: session } = useSession();
  console.log(session,'===session')
  // let token = localStorage.getItem('token');
  let token = '';
  // if (token && !isLggedin){
  //   setIsLggedin(true)
  // }
  if (session && !token) {
    let BASE_URL = "http://127.0.0.1:8000/api"
    let user_data = {
      "email": session.token.email,
      "username": session.token.email,
      "first_name": session.token.name
    }
    // Send a request to the Django backend
    axios.post(
        `${BASE_URL}/register`,
        user_data
    ).then(function (response) {
      console.log(response.data,'=====response.data')
      if (response.data.status == true){
        // localStorage.setItem('token', response.data.token)
        setIsLggedin(true)
        console.log(isLggedin)
      }
    })
  }
  
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
                <h3 className="text-30 lh-13">Sign Up</h3>

              <p className="mt-10">
                Already have an account?
                <Link href="/login" className="text-purple-1">
                  Log in
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                // onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input required type="text" name="title" placeholder="Name" />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button onClick={()=>signIn("google")}
                      type="button" className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
