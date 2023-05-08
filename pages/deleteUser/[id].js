import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const DeleteUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const deleteUserById = async () => {
    if (id) {
      try {
        await axios.delete(`http://localhost:3000/deleteUser/${id}`);
        await router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    deleteUserById();
  }, []);

  return <></>;
};

export default DeleteUser;
