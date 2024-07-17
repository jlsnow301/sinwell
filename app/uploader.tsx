"use client";

import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event?.target?.result;
      if (!result || typeof result !== "string") {
        reject(new Error("Error reading file"));
        return;
      }

      resolve(result.split(",")[1]);
    };

    reader.readAsDataURL(file);
  });
}

export default function PdfUploader() {
  const [base64File, setBase64File] = useState<string>();

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = acceptedFiles[0];

    if (!file || file.type !== "application/pdf") {
      console.error("Please upload a PDF file");
      return;
    }

    const bas = await convertFileToBase64(file);
    if (!bas) return;
    setBase64File(bas);
    console.log("File converted to base64");

    invoke<string>("get_cutsheet_times", { base64: bas })
      .then((result) => console.log(result))
      .catch(console.error);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="container mx-auto rounded-lg border-2 border-blue-500 p-4 text-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {base64File && <p>File converted to base64</p>}
    </div>
  );
}
