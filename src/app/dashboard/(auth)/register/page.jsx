"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);
  // const[formData,SetformData]=useState({
  //   name:"",
  //   email:"",
  //   password:""
  // })

  // const handle=(e)=>{
  //   const name=e.target.name;
  //   const value=e.target.value;
  //   SetformData({...formData,[name]:value});
  // }
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //...formData
          name,email,password
        }),
      });
      res.status === 201 && router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          name="name"
          required
          className={styles.input}
          // value={formData.name}
          // onChange={handle}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          className={styles.input}
          // value={formData.email}
          // onChange={handle}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className={styles.input}
          // value={formData.password}
          // onChange={handle}
        />
        <button className={styles.button}>Register</button>
        {error && "Something went wrong!"}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;
