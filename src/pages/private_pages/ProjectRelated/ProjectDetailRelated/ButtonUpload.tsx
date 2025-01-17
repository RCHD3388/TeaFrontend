import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../app/reducers/snackbarSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface FileUploadInputProps {
  projectID: string;
}

const ButtonUpload: React.FC<FileUploadInputProps> = ({ projectID }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
      setFileNames(fileArray.map((file) => file.name));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    // Append files to formData
    files.forEach((file) => {
      formData.append("file", file);
    });

    // Append projectID to formData
    formData.append("projectID", projectID);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData, // Pass the formData directly
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        openSnackbar({ severity: "success", message: "Berhasil upload file" })
      );
      setFiles([]);
      setFileNames([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      dispatch(
        openSnackbar({
          severity: "error",
          message: "Gagal upload file, silakan coba lagi",
        })
      );
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/upload/download/${projectID}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/json, image/*, application/pdf", // Terima berbagai tipe konten
          },
        }
      );

      // Dapatkan nama file dari header Content-Disposition jika ada
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded-file";
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch) {
          fileName = fileNameMatch[1];
        }
      }

      // Gunakan tipe konten yang benar dari response
      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: contentType });

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: "tidak ada file yang pernah di upload",
        })
      );
    }
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Select Files
        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
      </Button>
      <div style={{ marginTop: "10px" }}>
        {fileNames.length > 0 ? (
          <ul>
            {fileNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>No files selected.</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={files.length === 0}
        >
          Upload Files
        </Button>
      </div>
    </div>
  );
};

export default ButtonUpload;
