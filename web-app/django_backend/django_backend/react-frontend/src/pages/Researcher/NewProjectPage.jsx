import { useNavigate } from "react-router-dom";

const NewProjectPage = ({ onCancel }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Project Created!");
        onCancel();
    };

    return (
        <div className="p-12">
            <h2 className="font-semibold text-3xl mb-6">Create a New Project</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    className="border border-gray-300 p-3 rounded-lg"
                    required
                />
                <textarea
                    placeholder="Project Description"
                    className="border border-gray-300 p-3 rounded-lg"
                    required
                />
                <button
                    type="submit"
                    className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-500 hover:underline"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};


export default NewProjectPage;
