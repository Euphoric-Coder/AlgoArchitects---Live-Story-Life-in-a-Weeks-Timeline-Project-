"use client";

import React, { useEffect, useState } from "react";
import { PenBox, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormBackgroundEffect from "./Effect/FormBackgroundEffect";
import ImageUpload from "./ImageUpload";
import NextImage from "next/image";

const AddEvent = ({
  onSubmit,
  isEditing = false,
  data = {
    title: "",
    date: "",
    year: "",
    week: "",
    type: "personal",
    description: "",
    notes: "",
    links: [""],
    coverImage: null,
    coverImageId: null,
    icon: "Users",
    color: "from-rose-500 to-rose-600",
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadData, setUploadData] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    year: "",
    week: "",
    type: "personal",
    description: "",
    notes: "",
    links: [""],
    coverImage: null,
    coverImageId: null,
    icon: "Users",
    color: "from-rose-500 to-rose-600",
  });

  useEffect(() => {
    if (isEditing && data) {
      setFormData({
        ...data,
        links: Array.isArray(data.links) ? data.links : [""],
      });
      setUploadData(data.coverImage || null);
      setFileId(data.coverImageId || null);
    }
  }, [isEditing, data]);

  const categories = [
    {
      value: "milestone",
      label: "Major Milestone",
      icon: "Award",
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "career",
      label: "Career Event",
      icon: "Briefcase",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      value: "personal",
      label: "Personal Event",
      icon: "Users",
      color: "from-rose-500 to-rose-600",
    },
    {
      value: "travel",
      label: "Travel & Adventure",
      icon: "Plane",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      value: "global",
      label: "Global Event",
      icon: "Globe",
      color: "from-amber-500 to-amber-600",
    },
    {
      value: "historical",
      label: "Historical Events",
      icon: "ScrollText",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const deleteFile = async (fileId) => {
    if (!fileId) return;
    console.log("Deleting file with ID:", fileId);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      ...formData,
      coverImage: uploadData?.url || null,
      coverImageId: fileId || null,
    };

    onSubmit(submittedData);
    setFormData({
      title: "",
      date: "",
      year: "",
      week: "",
      type: "personal",
      description: "",
      notes: "",
      links: [""],
      coverImage: "",
      coverImageId: "",
      icon: "Users",
      color: "from-rose-500 to-rose-600",
    });
    setIsOpen(false);
    setUploadData(null);
    setFileId(null);
  };

  const addLink = () =>
    setFormData({ ...formData, links: [...formData.links, ""] });

  const updateLink = (index, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const removeLink = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn9 flex items-center gap-2 [&_svg]:size-6">
          {isEditing ? (
            <>
              <PenBox />
              Edit Event
            </>
          ) : (
            <>
              <Plus />
              Add New Event
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-2 border-blue-200 bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 shadow-2xl">
        <FormBackgroundEffect />
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
            {isEditing ? "Edit Event" : "Add New Event"}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-4">
            Fill out the form to record a new personal or global event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="title"
                className="text-md font-semibold text-blue-100 dark:text-white bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-500 dark:to-purple-700 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
              >
                Title
              </label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-3 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px]"
                placeholder="Enter event title..."
              />
            </div>

            <div>
              <label
                htmlFor="dt"
                className="text-md font-semibold text-blue-100 dark:text-white bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-500 dark:to-purple-700 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
              >
                Date
              </label>
              <Input
                id="dt"
                type="date"
                required
                value={formData.date}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();

                  // --- Age String Calculation ---
                  let years = today.getFullYear() - selectedDate.getFullYear();
                  let months = today.getMonth() - selectedDate.getMonth();
                  let days = today.getDate() - selectedDate.getDate();

                  if (days < 0) {
                    months -= 1;
                    const prevMonth = new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      0
                    );
                    days += prevMonth.getDate();
                  }

                  if (months < 0) {
                    years -= 1;
                    months += 12;
                  }

                  // --- Weeks since 1st Jan of selected year ---
                  const startOfYear = new Date(
                    selectedDate.getFullYear(),
                    0,
                    1
                  ); // Jan 1 of that year
                  const msInWeek = 1000 * 60 * 60 * 24 * 7;
                  const week =
                    Math.floor((selectedDate - startOfYear) / msInWeek) + 1;

                  const year = selectedDate.getFullYear();

                  setFormData({
                    ...formData,
                    date: e.target.value,
                    week: week,
                    year: year,
                  });
                }}
                className="mt-3 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="text-md font-semibold text-blue-100 dark:text-white bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-500 dark:to-purple-700 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
            >
              Category
            </label>
            <Select
              value={formData.type}
              onValueChange={(value) => {
                const selected = categories.find((c) => c.value === value);
                if (selected) {
                  setFormData({
                    ...formData,
                    type: selected.value,
                    icon: selected.icon,
                    color: selected.color,
                  });
                }
              }}
            >
              <SelectTrigger id="category" className="mt-3 input-field">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="select-content mt-2">
                <SelectItem value="personal" className="select-item">
                  Personal Event
                </SelectItem>
                <SelectItem value="milestone" className="select-item">
                  Major Milestone
                </SelectItem>
                <SelectItem value="career" className="select-item">
                  Career Event
                </SelectItem>
                <SelectItem value="travel" className="select-item">
                  Travel & Adventure
                </SelectItem>
                <SelectItem value="global" className="select-item">
                  Global Event
                </SelectItem>
                <SelectItem value="historical" className="select-item">
                  Historical Event
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="descp"
              className="text-md font-semibold text-blue-100 dark:text-white bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-500 dark:to-purple-700 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
            >
              Description
            </label>
            <textarea
              id="descp"
              rows={3}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-3 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px] w-full px-4 py-3 rounded-xl dark:bg-slate-700 resize-none"
              placeholder="Describe what happened..."
            />
          </div>

          <div>
            <label
              htmlFor="add-notes"
              className="text-md font-semibold text-blue-100 dark:text-white bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-500 dark:to-purple-700 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
            >
              Add Notes
            </label>
            <textarea
              id="add-notes"
              rows={2}
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="mt-3 input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px] w-full px-4 py-3 rounded-xl dark:bg-slate-700 resize-none"
              placeholder="Any additional thoughts or context..."
            />
          </div>

          {isEditing && formData.coverImage ? (
            <div className="mb-6">
              <label
                htmlFor="blog-cover-image"
                className="text-lg font-semibold text-blue-100 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105"
              >
                Blog Cover Image
              </label>
              <div className="relative flex flex-col items-center gap-6 mt-4 p-6 border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-cyan-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex-1 max-w-md overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105">
                  <NextImage
                    src={formData.coverImage}
                    alt="Blog Cover"
                    width={500}
                    height={500}
                    className="w-full h-[300px] object-cover rounded-xl"
                    draggable={false}
                  />
                </div>
                <div className="flex flex-col gap-3 justify-center items-center w-full md:w-auto md:items-start text-center md:text-left">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Cover Image Uploaded
                  </h3>
                  <Button
                    type="button"
                    onClick={() => {
                      deleteFile(formData.coverImageId);
                      setFormData({
                        ...formData,
                        coverImage: null,
                        coverImageId: null,
                      });
                      setUploadData(null);
                      setFileId(null);
                    }}
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-medium px-5 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                  >
                    Reupload Image
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <ImageUpload
              uploadData={uploadData}
              setUploadData={setUploadData}
              fileId={fileId}
              setFileId={setFileId}
            />
          )}

          <div>
            <label className="text-md font-semibold text-blue-100 dark:text-white bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-500 dark:to-purple-700 px-3 py-1 rounded-full shadow-md transform -translate-y-12 -translate-x-1/5 transition-all duration-300 ease-in-out z-20 cursor-pointer hover:scale-105">
              Related Links
            </label>
            <div className="space-y-2">
              {(formData.links || [""]).map((link, index) => (
                <div key={index} className="flex gap-2 mt-3">
                  <Input
                    type="url"
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                    placeholder="https://example.com"
                    className="input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px] flex-1"
                  />
                  {(formData.links || [""]).length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="del3 hover:bg-red-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                onClick={addLink}
                className="btn8"
              >
                + Add another link
              </Button>
            </div>
          </div>

          <DialogFooter className="flex gap-3 mt-6">
            <DialogClose asChild>
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full del3 hover:bg-red-200"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full btn4">
              {isEditing ? "Update Event" : "Add Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
