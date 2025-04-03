import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import Message from "./Message";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUsersDetailsQuery,
  useUpdateUserMutation,
} from "../../app/api/userApiSlice";
import { RiAdminFill } from "react-icons/ri";
const UserList = () => {
  const { data, refetch, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  console.log(data);

  const deleteHandler = async (id) => {
    if (window.confirm(`Are you sure u want to delete?`)) {
      try {
        await deleteUser(id).unwrap();
        await refetch();
      } catch (error) {
        toast.error(error.data.message || error.message || "Error");
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      const userData = {
        username: editableUserName,
        email: editableUserEmail,
      }
      await updateUser({
        userId: id,
        data: userData
      }).unwrap();
      setEditableUserId(null);
      await refetch();
      toast.success("User updated successfully!", {
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.message || "error");
    }
  };

  useEffect(() => {
    document.title = "Manage Users";
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        {isLoading ? (
          <FaSpinner />
        ) : error ? (
          <Message variant={"danger"}>
            {error?.data?.message || error?.message || "error"}
          </Message>
        ) : (
          <div className="flex flex-col md:flex-row">
            <table className="w-full md:w-4/5 mx-auto">
              <thead>
                <tr className="border">
                  <th className="px-4 py-2 text-left border">ID</th>
                  <th className="px-4 py-2 text-left border">NAME</th>
                  <th className="px-4 py-2 text-left border">EMAIL</th>
                  <th className="px-4 py-2 text-center border ">ADMIN</th>
                  <th className="px-4 py-2  border text-center">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user._id}>
                    {/* User ID */}
                    <td className="px-4 py-2 border">{user._id}</td>

                    {/* Username Field */}
                    <td className="px-4 py-2 border">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            className="w-full p-2 border rounded-lg"
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                          />
                          <button
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer"
                            onClick={() => updateHandler(user._id)}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          {user.username}
                          <button
                            onClick={() =>
                              toggleEdit(
                                user._id,
                                user.username,
                                user.email,

                              )
                            }
                          >
                            <FaEdit className="cursor-pointer" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Email Field */}
                    <td className="px-4 py-2 border">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            className="w-full p-2 border rounded-lg"
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                          />
                          <button
                            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer"
                            onClick={() => updateHandler(user._id)}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          {user.email}
                          <button
                            onClick={() =>
                              toggleEdit(
                                user._id,
                                user.username,
                                user.email,

                              )
                            }
                          >
                            <FaEdit className="cursor-pointer" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Admin Status */}
                    <td className="px-4 py-2 border text-center">
                      <div className="flex justify-center items-center">
                        {user.isAdmin ? (
                          <FaCheck size={20} className="text-green-500" />
                        ) : (
                          <FaTimes size={20} className="text-red-500" />
                        )}
                      </div>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-2 border text-center">
                      <div className="flex justify-center items-center">
                        {!user.isAdmin ? (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-500 cursor-pointer select-none hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <FaTrash className="text-lg" />
                            <span>Delete</span>
                          </button>
                        ) : (
                          <RiAdminFill
                            size={40}
                            className="cursor-no-drop text-gray-500"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </h1>
    </div>
  );
};

export default UserList;
