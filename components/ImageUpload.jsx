"use client";

import React, { useRef, useState } from "react";
import ImageKit from "imagekit-javascript";
import { FiUploadCloud } from "react-icons/fi";
import { Button } from "./ui/button";
import Image from "next/image";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const uploadToImageKit = async (file, setData, setFileId) => {
  const auth = await fetch("/api/upload-auth").then((res) => res.json());

  const imagekit = new ImageKit({
    publicKey,
    urlEndpoint,
    authenticationEndpoint: "",
  });

  imagekit.upload(
    {
      file,
      fileName: file.name,
      useUniqueFileName: true,
      folder: "/CoverImages",
      token: auth.token,
      signature: auth.signature,
      expire: auth.expire,
    },
    (err, result) => {
      if (err) {
        console.error("Upload failed", err);
        alert("Upload failed!");
      } else {
        console.log("Upload success", result);
        setData(result);
        setFileId(result.fileId);
      }
    }
  );
};

const deleteFile = async (fileId) => {
  if (!fileId) return;
  try {
    await fetch("/api/delete-image", {
      method: "POST",
      body: JSON.stringify({ fileId }),
    });
    console.log("Deleted previous file:", fileId);
  } catch (err) {
    console.error("Delete failed", err);
  }
};

export default function ImageUpload({
  uploadData,
  setUploadData,
  fileId,
  setFileId,
  isEditing,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = async (file) => {
    if (!file?.type.startsWith("image/")) {
      alert("Invalid image type");
      return;
    }

    // Delete previous uploaded file before uploading new
    if (fileId) await deleteFile(fileId);

    setUploadData(null);
    setFileId(null);
    await uploadToImageKit(file, setUploadData, setFileId);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    } else {
      // Handle browser drag (e.g. from Chrome)
      const htmlData = e.dataTransfer.getData("text/html");
      const urlMatch = htmlData.match(/src\s*=\s*"([^"]+)"/);
      const imageUrl = urlMatch?.[1];

      if (imageUrl) {
        try {
          const res = await fetch(imageUrl);
          const blob = await res.blob();
          const fileName =
            imageUrl.split("/").pop()?.split("?")[0] || "image.jpg";
          const fileFromUrl = new File([blob], fileName, { type: blob.type });
          handleUpload(fileFromUrl);
        } catch (err) {
          console.error("Failed to fetch image from URL:", err);
          alert("Could not upload image from browser source");
        }
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleReset = async () => {
    if (fileId) await deleteFile(fileId);
    setUploadData(null);
    setFileId(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mt-2 mb-5">
      {!uploadData ? (
        <>
          <label
            htmlFor="cover-upload"
            className="text-lg font-semibold text-blue-100 dark:text-white bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-500 dark:to-purple-700 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
          >
            Upload Cover Image
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`relative mt-3 flex flex-col items-center justify-center p-8 border-2 rounded-xl cursor-pointer transition-all ${
              isDragging
                ? "border-blue-600 bg-gradient-to-br from-cyan-100 to-indigo-200 dark:from-slate-800 dark:to-slate-700"
                : "border-blue-300 bg-gradient-to-br from-cyan-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800"
            } shadow-md hover:shadow-lg dark:border-slate-600`}
          >
            <FiUploadCloud className="text-blue-600 dark:text-blue-400 text-6xl mb-4" />
            <div className="text-center">
              <p className="text-blue-800 dark:text-blue-300 text-lg font-semibold">
                Drag & Drop your image here
              </p>
              <p className="text-md text-indigo-500 dark:text-indigo-300 mt-1">
                or click to browse files
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              id="cover-upload"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
        </>
      ) : (
        <>
          <div className="p-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#1b1b1b] dark:via-[#121212] dark:to-black shadow-xl space-y-6 transition-all duration-300">
            {/* File Details + Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 flex-wrap overflow-hidden">
              {/* File Info */}
              <div className="space-y-1 max-w-full md:max-w-md break-words">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  File Uploaded Successfully
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  <span className="font-medium text-gray-900 dark:text-gray-100 break-all">
                    {uploadData.name}
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {(uploadData.size / 1024).toFixed(2)} KB
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 shrink-0">
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 dark:from-blue-600 dark:via-purple-700 dark:to-pink-600 text-white font-medium px-5 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
                >
                  Reupload
                </Button>
              </div>
            </div>

            {/* Image Preview */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                Cover Image Preview
              </h4>
              <div className="overflow-hidden rounded-2xl border-2 border-dashed border-blue-300 dark:border-purple-600 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md">
                {uploadData.url && (
                  <Image
                    src={
                      typeof uploadData === "string"
                        ? uploadData
                        : uploadData?.url || "/fallback.jpg"
                    }
                    alt="Uploaded Cover"
                    width={1000}
                    height={400}
                    className="object-fit w-full p-4 h-auto max-h-[400px] rounded-xl transition-transform duration-500 hover:scale-[1.03]"
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
