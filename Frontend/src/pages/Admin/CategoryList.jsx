import { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
//components
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

import { toast } from "react-toastify";

const CategoryList = () => {
  const { data, isError, refetch } = useGetAllCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisable] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  //   console.log(isLoading);

  //   console.log(data);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Category name is required", {
        theme: "dark",
      });
    }
    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        refetch();
        toast.success(`${name} category is created!`, {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
      return toast.error(error.data.error || "Creating category failed", {
        theme: "dark",
      });
    }
  };

  const handleupdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      return toast.error("Category name is required");
    }
    try {
      const res = await updateCategory({
        id: selectedCategory._id,
        name: { name: updatingName },
      }).unwrap();

      toast.success(`${updatingName} category is updated`, {
        theme: "dark",
      });
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisable(false);
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error(error.data.error || "error", {
        theme: "dark",
      });
      setModalVisable(false);
    }
  };

  const handleUpdateButton = (category) => {
    setModalVisable(true);
    setSelectedCategory(category);
    setUpdatingName(category.name);
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(selectedCategory._id);
      await refetch();
      setModalVisable(false);
      toast.success(`Category has got deleted successfully!`, {
        theme: "dark",
      });
      return;
    } catch (error) {
      console.error(error);
      toast.error("error.data.error" || "Category deletion failed.", {
        theme: "dark",
      });
    }
  };

  return (
    <div className="pl-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Manage Categories
        </h1>

        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {data?.categories?.map((category) => (
            <div key={category._id}>
              <button
                onClick={() => {
                  handleUpdateButton(category);
                }}
                className="border font-bold border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 cursor-pointer 
             transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white 
             focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-md"
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisable(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleUpdate={handleupdateCategory}
            handleDelete={handleDeleteCategory}
            buttonText="Update"
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
