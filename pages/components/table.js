import { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
