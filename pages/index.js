import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/index.module.css";
import axios from "axios";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";

export default function Home(props) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { api_url } = props;

  useEffect(() => {
    getUsers();
    console.log(api_url);
    users ? setIsLoading(false) : setIsLoading(true);
  }, []);

  const getUsers = async () => {
    const res = await axios.get(`${api_url}users`);
    setUsers(res.data);
    return res.data;
  };

  const confirm = (userId, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="card text-center">
            <h1 className="text-4xl font-bold mb-2 text-red-400">
              Are you sure?
            </h1>
            <p className="text-xl mb-4">You want to delete this user below?</p>
            <p className="text-4xl mb-8">{name}</p>
            <div className="border-t-2">
              <button
                onClick={onClose}
                className="text-slate-500 font-bold mt-4 mx-4 py-4 px-8"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteUser(userId);
                  onClose();
                }}
                className="text-red-600 bg-red-200 mt-4 mx-4 py-4 px-8 font-bold rounded-xl"
              >
                Delete!
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${api_url}users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CRUD</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main antialiased p-8">
        <h1 className="text-4xl mb-8 font-bold antialiased text-gray-800">
          User List
        </h1>
        <Link href="/addUser">
          <button className="button bg-green-500 text-white hover:shadow-green-700/30">
            Add User
          </button>
        </Link>
        <table
          className={`${styles.table} table-auto font-normal sm:block hidden`}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <p>Data is loading...</p>
          ) : (
            <tbody>
              {users.map((user, id) => (
                <tr key={id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button className="button bg-yellow-200 text-yellow-700 hover:shadow-yellow-700/30">
                      <Link href={`/editUser/${user._id}`}>Edit</Link>
                    </button>
                    <button
                      className="button bg-red-200 text-red-700 hover:shadow-red-700/30"
                      onClick={() => confirm(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {/* {typeof window !== "undefined" && <p className="text-xl">{width}</p>} */}

        <div className="space-y-2 w-screen p-8 sm:hidden">
          {users.map((user, id) => (
            <div
              className="bg-white border rounded-xl shadow-md p-8 w-full"
              key={id}
            >
              <div className="mb-8">
                <div className="flex xs:items-center xs:gap-2 flex-col xs:flex-row mb-4 xs:mb-0">
                  <p className="text-3xl font-bold antialiased text-slate-800 tracking-wide">
                    {user.name}
                  </p>
                  <p className="text-xs font-bold antialiased text-slate-600 tracking-wide rounded-lg bg-gray-200 py-1 px-2 w-min">
                    {user.gender}
                  </p>
                </div>
                <p className="text-sm xs:text-lg font-normal antialiased text-slate-600 tracking-wide">
                  {user.email}
                </p>
              </div>
              <p className="text-sm font-bold text-slate-600 px-2">Action</p>
              <div className="space-x-2">
                <button className="button bg-yellow-200 text-yellow-700 hover:shadow-yellow-700/30">
                  <Link href={`/editUser/${user._id}`}>Edit</Link>
                </button>
                <button
                  className="button bg-red-200 text-red-700 hover:shadow-red-700/30"
                  onClick={() => confirm(user._id, user.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  // console.log(process.env.API_endpoint);

  return {
    props: {
      api_url: process.env.API_endpoint || null,
    },
  };
}
