
import { Log } from "@/app/types/Log";
import { API_ENDPOINTS } from "@/config/api";
import Link from "next/link";

type Props = {
  log: Log;
  onDelete: () => void;
};

export default function LogCard({ log, onDelete }: Props) {
  const handleDelete = async () => {
    if (log._id) {
      await fetch(API_ENDPOINTS.LOGBYID(log._id), {
        method: 'DELETE',
      });
      onDelete();
    }
    
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold line-clamp-2">{log.description}</h2>
      <p className="text-gray-600">{new Date(log.eventDate).toLocaleString()}</p>
      <p className="text-sm text-gray-500 italic">{log.location}</p>
      <div className="flex gap-2 mt-4">
      <Link
          href={`/edit/${log._id}`}
          className="bg-black border border-white-500 text-white hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition px-3 py-1 rounded"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-black border border-white-500 text-white hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition px-3 py-1 rounded"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}