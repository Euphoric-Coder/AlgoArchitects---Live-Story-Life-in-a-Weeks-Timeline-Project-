"use client";

import React, { useState } from "react";
import { Calendar, Tag, FileText, Link, Upload, Image, X } from "lucide-react";
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

const AddEvent = ({ onSubmit }) => {
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
    coverImage: "",
    coverImageId: "",
    icon: "Users",
    color: "from-blue-500 to-blue-600",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      ...formData,
      coverImage: uploadData?.url || "",
      coverImageId: fileId || "",
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
  };

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
        <Button className="btn9">+ Add Event</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-2 border-blue-200 bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 shadow-2xl">
        <FormBackgroundEffect />
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
            Add New Event
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-4">
            Fill out the form to record a new personal or global event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <FileText className="w-4 h-4" /> Title
              </label>
              <Input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px]"
                placeholder="Enter event title..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <Input
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

                  const ageString = `${years} years ${months} months ${days} days`;

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

                  console.log("Age:", ageString);
                  console.log("Week:", week, "Year:", year);

                  setFormData({
                    ...formData,
                    date: e.target.value,
                    week: week,
                    year: year,
                  });
                }}
                className="input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px]"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Tag className="w-4 h-4" /> Category
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
              <SelectTrigger className="input-field">
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
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px] w-full px-4 py-3 rounded-xl dark:bg-slate-700 resize-none"
              placeholder="Describe what happened..."
            />
          </div>

          <div>
            <label className="text-sm font-medium">Additional Notes</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px] w-full px-4 py-3 rounded-xl dark:bg-slate-700 resize-none"
              placeholder="Any additional thoughts or context..."
            />
          </div>

          {/* <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Image className="w-4 h-4" /> Cover Image URL
            </label>
            <Input
              type="url"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
            />
          </div> */}
          <ImageUpload
            uploadData={uploadData}
            setUploadData={setUploadData}
            fileId={fileId}
            setFileId={setFileId}
          />

          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Link className="w-4 h-4" /> Related Links
            </label>
            <div className="space-y-2">
              {formData.links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="url"
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                    placeholder="https://example.com"
                    className="input-field focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-[3px] flex-1"
                  />
                  {formData.links.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="bg-red-100 text-red-600 px-3 py-2 rounded-lg mb-2"
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

          {/* <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Upload className="w-4 h-4" /> File Attachments
            </label>
            <div
              className={`relative border-2 border-dashed p-6 rounded-xl ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-slate-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-slate-500">
                  Supports images, documents, and more
                </p>
              </div>
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files)
                    console.log("Files selected:", e.target.files);
                }}
              />
            </div>
          </div> */}

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full del3 hover:bg-red-200"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full btn4">
              Add Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
