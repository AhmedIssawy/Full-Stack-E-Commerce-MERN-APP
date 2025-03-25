const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  handleUpdate,
  handleDelete,
  submitButtonText = "Submit",
  updateButtonText = "Update",
  deleteButtonText = "Delete",
}) => {
  return (
    // Listen bro its a trash code ik it u know it just deal with it
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
        />
        <div className="flex justify-between">
          {/* Render submit button if the submit handler is provided */}
          {handleSubmit && (
            <button
              type="submit"
              className="py-3 px-6 cursor-pointer rounded-2xl border border-blue-500 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
            >
              {submitButtonText}
            </button>
          )}

          {handleUpdate && (
            <button
              type="button"
              onClick={handleUpdate}
              className="py-3 px-6 cursor-pointer rounded-2xl border border-green-500 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400/50"
            >
              {updateButtonText}
            </button>
          )}

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="py-3 px-6 cursor-pointer rounded-2xl border border-red-500 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400/50"
            >
              {deleteButtonText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
