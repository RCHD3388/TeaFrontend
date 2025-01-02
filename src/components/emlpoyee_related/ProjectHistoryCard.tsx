import React from "react";
import Button from "@mui/material/Button";
import { formatDateToLong } from "../../utils/service/FormatService";

interface ProjectHistoryProps {
  join_at: string;
  left_at: string | null; // Null jika masih aktif
  description: string;
  project: {
    _id: string;
    name: string;
  };
  onViewDetails: (projectId: string) => void; // Fungsi untuk melihat detail project
}

const ProjectHistoryCard: React.FC<ProjectHistoryProps> = ({
  join_at,
  left_at,
  description,
  project,
  onViewDetails,
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-md border border-gray-300 rounded-lg mb-2">
      <div className="p-4">
        <h2 className="card-title text-xl font-bold text-gray-800" style={{textTransform: "uppercase"}}>
          Proyek : {project.name}
        </h2>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Description:</span> {description}
        </p>
        <p className="text-base text-gray-600">
          <span className="font-bold">Tanggal Bergabung:</span> {formatDateToLong(join_at)}
        </p>
        {left_at ? (
          <p className="text-base text-gray-600">
            <span className="font-bold">Tanggal Keluar:</span> {formatDateToLong(left_at)}
          </p>
        ) : (
          <p className="text-base badge badge-primary badge-lg text-green-600 font-bold" style={{whiteSpace: "nowrap"}}>Masih Aktif</p>
        )}
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onViewDetails(project._id)}
          >
            Lihat Proyek
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHistoryCard;
