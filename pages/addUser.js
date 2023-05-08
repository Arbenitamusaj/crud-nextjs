import { useEffect, useState } from "react";
import s from "../styles/form.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Card from "../components/card";
import { getServerSideProps } from ".";

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState({ name: "", email: "" });
  const router = useRouter();
  const { api_url } = props;



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!name && !email) {
  //     setError({ name: "Nama belum Disi", email: "Email belum Diisi" });
  //     return;
  //   }
  //   if (!name) {
  //     setError((prevState) => ({ ...prevState, name: "Nama belum Diisi" }));
  //     return;
  //   }
  //   if (!email) {
  //     setError((prevState) => ({ ...prevState, email: "Email belum Diisi" }));
  //     return;
  //   }
  //   try {
  //     // await axios.post("http://localhost:5000/users", {
  //     await axios.post("http://localhost:3000/api/register", {
  //       name,
  //       email,
  //       gender,
  //     });
  //     router.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log("Form Submitted");
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/register', {
      name,
      email,
      gender,
    });
    console.log(res.data);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};



  return (
    <main className="main">
      <Head>
        <title>CRUD | Add User</title>
      </Head>
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Add User</h1>
      <Card>
        <form className={s.form} onSubmit={handleSubmit}>
          <label htmlFor="name" className={s.label}>
            Name
            {error.name ? (
              <p className="text-red-500 font-bold ml-2 absolute bg-white">
                {error.name}
              </p>
            ) : (
              ""
            )}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className=""
            placeholder="Insert your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className={s.label}>
            Email
            {error.email ? (
              <p className="text-red-500 font-bold ml-2">{error.email}</p>
            ) : (
              ""
            )}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Insert your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className={s.label}>Gender</span>
          <div className={s.gender}>
            <div className="hover:bg-green-100 rounded-xl">
              <input
                type="radio"
                name="gender"
                id="male"
                value="Male"
                className="text-green-600 focus:ring-transparent"
                required
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male" className="py-4 w-full">
                Male
              </label>
            </div>
            <div className="hover:bg-green-100 rounded-xl">
              <input
                type="radio"
                name="gender"
                id="female"
                className="text-green-600 focus:ring-transparent"
                onChange={(e) => setGender(e.target.value)}
                value="Female"
                required={true}
              />
              <label htmlFor="female" className="py-4 w-full">
                Female
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="button bg-green-500 text-white hover:shadow-green-700/30"
          >
            Add User
          </button>
        </form>
        <Link href="/">
          <p className="text-slate-500 mt-2 hover:cursor-pointer hover:text-blue-500">
            &larr; Back
          </p>
        </Link>
      </Card>
    </main>
  );
};

export default AddUser;
export { getServerSideProps };
