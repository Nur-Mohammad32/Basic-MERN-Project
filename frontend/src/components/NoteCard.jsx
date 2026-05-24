import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios"
import { toast } from "react-hot-toast";

const NoteCard = ({ note,setNotes }) => {

    const handleDelete = async (e, id) => {
  e.preventDefault(); // get rid of the navigation behaviour

  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    toast.success("Note deleted successfully");
  } catch (error) {
    console.log("Error in handleDelete", error);
    toast.error("Failed to delete note");
  }
};
  return (
    <Link
      to={`/note/${note._id}`}
      className="transition duration-200 border-[#00FF9D] border-t-4 border-solid card bg-base-100 hover:shadow-lg"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="items-center justify-between mt-4 card-actions">
          <span className="text-base text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="w-4 h-4" />
            <button className="btn-ghost btn-xs text-error" onClick={(e)=> handleDelete(e,note._id)}>
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
