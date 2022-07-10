import { useEffect, useState } from "react";
import s from "../../styles/form.module.css";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Card from "../../components/card";
import Link from "next/link";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const getUserById = async () => {
    if (id) {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setGender(res.data.gender);
      } catch (error) {
        console.log(error);
        return res;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        gender,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    console.log("Form Submitted");
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <main className="main">
      <Head>
        <title>CRUD | Edit User</title>
      </Head>
      <h1 className="text-4xl font-bold my-4">Edit User</h1>
      <Card>
        <form className={s.form} onSubmit={handleSubmit}>
          <label htmlFor="name" className={s.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Insert your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className={s.label}>
            Email
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
                className="text-green-600 focus:ring-transparent"
                value="Male"
                checked={gender === "Male" ? true : false}
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
                checked={gender === "Female" ? true : false}
                onChange={(e) => setGender(e.target.value)}
                value="Female"
              />
              <label htmlFor="female" className="py-4 w-full">
                Female
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="button bg-green-500 text-white hover:shadow-gree/30"
          >
            Save
          </button>
          <Link href="/">
            <p className="text-slate-500 mt-2 hover:cursor-pointer hover:text-blue-500">
              &larr; Back
            </p>
          </Link>
        </form>
      </Card>
    </main>
  );
};

export default EditUser;
