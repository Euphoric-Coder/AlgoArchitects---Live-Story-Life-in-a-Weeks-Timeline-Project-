"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Calendar,
  Tag,
  FileText,
  Link,
  Image,
  Save,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/dbConfig";
import { set } from "date-fns";
import { Events } from "@/lib/schema";
import { eq } from "drizzle-orm";
import AddEvent from "@/components/AddEvent";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const EventDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, [id]);

  const fetchEventData = async () => {
    const eventData = await db.select().from(Events).where(eq(Events.id, id));
    console.log(eventData[0]);
    setEventData(eventData[0]);
  };

  // Mock event data - in real app, fetch based on ID
  const [eventData, setEventData] = useState(null);

  const refreshData = () => {
    fetchEventData();
  };

  const handleAddEvent = async (eventData) => {
    console.log("Adding event:", eventData);
    const result = await db
      .update(Events)
      .set({
        year: eventData.year,
        date: eventData.date,
        week: eventData.week,
        type: eventData.type,
        title: eventData.title,
        description: eventData.description,
        coverImage: eventData?.coverImage?.url || eventData?.coverImage || null,
        coverImageId: eventData.coverImageId,
        notes: eventData.notes,
        icon: eventData.icon,
        color: eventData.color,
        links: eventData.links,
      })
      .where(eq(Events.id, id));
    refreshData();
    toast.success("Event Updated successfully!");
  };

  const [editForm, setEditForm] = useState({});

  const handleSave = () => {
    setEventData(editForm);
    setIsEditing(false);
    // Here you would save to backend
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      // Here you would delete from backend
      const result = await db
        .delete(Events)
        .where(eq(Events.id, id))
        .returning();
      toast.success("Event deleted successfully!");
      router.push("/dashboard");
      // refreshData();
    }
  };

  const categoryColors = {
    milestone: "from-purple-500 to-purple-600",
    career: "from-emerald-500 to-emerald-600",
    personal: "from-blue-500 to-blue-600",
    travel: "from-cyan-500 to-cyan-600",
    global: "from-amber-500 to-amber-600",
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/dashboard/event")}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400">
            Event Details
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <AddEvent onSubmit={handleAddEvent} data={eventData} isEditing />

          <Button
            className="del3 hover:bg-red-200 [&_svg]:size-6"
            onClick={handleDelete}
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </div>

      {/* Event Card */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={eventData.coverImage || "/dummy.jpg"}
            alt="Event cover"
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div
              className={`inline-flex px-3 py-1 bg-gradient-to-r ${
                categoryColors[eventData.type]
              } rounded-full text-white text-sm font-medium mb-3`}
            >
              {eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1)}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {eventData.title}
            </h2>
          </div>
        </div>
        {/* {eventData.coverImage && (
        )} */}

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Date
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-slate-800 dark:text-white font-medium">
                      {new Date(eventData.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Category
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="milestone">Major Milestone</option>
                      <option value="career">Career Event</option>
                      <option value="personal">Personal Event</option>
                      <option value="travel">Travel & Adventure</option>
                      <option value="global">Global Event</option>
                    </select>
                  ) : (
                    <p className="text-slate-800 dark:text-white font-medium capitalize">
                      {eventData.type.replace("_", " ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {eventData.title}
                </h3>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Description
              </label>
            </div>
            {isEditing ? (
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            ) : (
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {eventData.description}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
              Notes
            </label>
            {isEditing ? (
              <textarea
                value={editForm.notes || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            ) : (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {eventData.notes || "No notes"}
              </p>
            )}
          </div>

          {/* Links */}
          {/* {eventData.links && eventData.links.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Link className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Related Links
                </label>
              </div>
              <div className="space-y-2">
                {eventData.links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )} */}

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Link className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Related Links
              </label>
            </div>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {Array.isArray(eventData.links) &&
              eventData.links.filter((link) => link.trim() !== "").length >
                0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {eventData.links
                    .filter((link) => link.trim() !== "")
                    .map((link, index) => (
                      <li key={index}>
                        <a
                          href={
                            link.startsWith("http") ? link : `https://${link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline break-words"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No Links</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
