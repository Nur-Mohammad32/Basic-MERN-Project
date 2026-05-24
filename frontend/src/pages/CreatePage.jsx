import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-base-200">
      <div className="max-w-2xl px-4 mx-auto">
        <Link
          to={`/`}
          className="inline-flex items-center gap-2 mb-6 btn btn-ghost"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>

        <div className="rounded-lg shadow-lg card bg-base-100">
          <div className="p-6 card-body">
            <h2 className="mb-4 text-2xl card-title">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="w-full border rounded-md input border-base-300 bg-base-100 focus:border-primary focus:ring-0"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4 form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="w-full h-40 p-3 border rounded-md resize-none border-base-300 bg-base-100 focus:border-primary focus:ring-0"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="ml-auto btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
