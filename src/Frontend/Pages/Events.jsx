import { useState, useEffect } from "react";
import Toast from "../Components/Toast";
import Cookies from "js-cookie";
import {
  CreateEvent,
  DeleteEvent,
  CreateAnnouncement,
  DeleteAnnouncement,
} from "../../Frontend/Route";
import axios from "axios";
import { X, Plus } from "lucide-react"; // Make sure to import these icons

const Events = () => {
  const token = Cookies.get("token");
  const url = import.meta.env.VITE_API_BASE_URL;

  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState("events");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIcon, setToastIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    content: "",
    eventDate: "",
    venue: "",
  });
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}event/getallevents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("events: ", response.data.data.events);
      setEvents(response.data.data.events || []);
    } catch (error) {
      setToastMessage("Error fetching events");
      setToastIcon("wrong");
      setShowToast(true);
      setEvents([]);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${url}announcement/getallannouncements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnnouncements(response.data || []);
    } catch (error) {
      setToastMessage("Error fetching announcements");
      setToastIcon("wrong");
      setShowToast(true);
      setAnnouncements([]);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}event/create-event`,
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        await fetchEvents();
        setNewEvent({ title: "", content: "", eventDate: "", venue: "" });
        setToastMessage("Event created successfully");
        setToastIcon("right");
        setShowToast(true);
        setShowEventForm(false); // Close the form after successful submission
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error creating event");
      setToastIcon("wrong");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}announcement/create-announcement`,
        newAnnouncement,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        await fetchAnnouncements();
        setNewAnnouncement({ title: "", description: "" });
        setToastMessage("Announcement created successfully");
        setToastIcon("right");
        setShowToast(true);
        setShowAnnouncementForm(false); // Close the form after successful submission
      } else {
        throw new Error("Failed to create announcement");
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error creating announcement");
      setToastIcon("wrong");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventSelection = (eventId) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleAnnouncementSelection = (announcementId) => {
    setSelectedAnnouncements((prev) =>
      prev.includes(announcementId)
        ? prev.filter((id) => id !== announcementId)
        : [...prev, announcementId]
    );
  };

  const handleDeleteEvents = async () => {
    if (selectedEvents.length === 0) return;
    setIsLoading(true);
    try {
      const response = await axios.delete(`${url}event/delete-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { eventIds: selectedEvents },
      });
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        await fetchEvents();
        setSelectedEvents([]);
        setToastMessage("Events deleted successfully");
        setToastIcon("right");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Error deleting events");
      setToastIcon("wrong");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAnnouncements = async () => {
    if (selectedAnnouncements.length === 0) return;
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${url}announcement/delete-announcement`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { announcementIds: selectedAnnouncements },
        }
      );
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        await fetchAnnouncements();
        setSelectedAnnouncements([]);
        setToastMessage("Announcements deleted successfully");
        setToastIcon("right");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Error deleting announcements");
      setToastIcon("wrong");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Event Form Modal
  const EventFormModal = () => (
    <div
      className={`
        fixed inset-0 flex items-center justify-center 
        bg-black bg-opacity-50 z-50 
        ${
          showEventForm
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }
        transition-all duration-300 ease-in-out
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowEventForm(false);
        }
      }}
    >
      <div
        className={`
          relative rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto 
          bg-white p-6
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-slate-200 
          [&::-webkit-scrollbar-thumb]:rounded-full
          ${
            showEventForm
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          }
          transition-all duration-300 ease-in-out
          transform origin-center
        `}
      >
        <button
          onClick={() => setShowEventForm(false)}
          className="absolute top-6 right-6 p-2 bg-white rounded-full text-black hover:scale-110"
        >
          <X size={24} />
        </button>
        <h2 className="h2 mb-[32px] text-left">Create Event</h2>

        {/* Event Form */}
        <form onSubmit={handleEventSubmit} className="mb-[16px]">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full mb-4 p-2 border-2 rounded bg-transparent border-black-100 focus:outline focus:outline-2 focus:outline-primaryBlue text-gray-600"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <textarea
            placeholder="Event Description"
            className="w-full h-32 mb-4 p-2 border-2 rounded bg-transparent border-black-100 focus:outline focus:outline-2 focus:outline-primaryBlue text-gray-600 resize-none"
            value={newEvent.content}
            onChange={(e) =>
              setNewEvent({ ...newEvent, content: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Date"
            className="w-full mb-4 p-2 border-2 rounded bg-transparent border-black-100 focus:outline focus:outline-2 focus:outline-primaryBlue text-gray-600"
            value={newEvent.eventDate}
            onChange={(e) =>
              setNewEvent({ ...newEvent, eventDate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full mb-4 p-2 border-2 rounded bg-transparent border-black-100 focus:outline focus:outline-2 focus:outline-primaryBlue text-gray-600"
            value={newEvent.venue}
            onChange={(e) =>
              setNewEvent({ ...newEvent, venue: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-success-500 text-white p-2 rounded flex items-center justify-center hover:scale-105 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Create Event"
            )}
          </button>
        </form>
      </div>
    </div>
  );

  // Announcement Form Modal
  const AnnouncementFormModal = () => (
    <div
      className={`
        fixed inset-0 flex items-center justify-center 
        bg-black bg-opacity-50 z-50 
        ${
          showAnnouncementForm
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }
        transition-all duration-300 ease-in-out
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowAnnouncementForm(false);
        }
      }}
    >
      <div
        className={`
          relative rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto 
          bg-white p-6
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-slate-200 
          [&::-webkit-scrollbar-thumb]:rounded-full
          ${
            showAnnouncementForm
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          }
          transition-all duration-300 ease-in-out
          transform origin-center
        `}
      >
        <button
          onClick={() => setShowAnnouncementForm(false)}
          className="absolute top-6 right-6 p-2 bg-white rounded-full text-black hover:scale-110"
        >
          <X size={24} />
        </button>
        <h2 className="h2 mb-[32px] text-left">Create Announcement</h2>

        {/* Announcement Form */}
        <form onSubmit={handleAnnouncementSubmit} className="space-y-[16px]">
          <div className="text-left space-y-2">
            <label htmlFor="announcementTitle" className="h3 cursor-pointer">
              Title
            </label>
            <input
              type="text"
              placeholder="Announcement Title"
              className="w-full mb-4 p-2 border-2 rounded bg-transparent border-black-100 focus:outline focus:outline-2 focus:outline-black-200 text-black"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="text-left space-y-2">
            <label
              htmlFor="announcementDescription"
              className="h3 cursor-pointer"
            >
              Description
            </label>
            <textarea
              placeholder="Announcement Description"
              className="w-full h-32 mb-4 p-2 border-2 rounded bg-transparent border-black-100 focus:outline focus:outline-2 focus:outline-black-200 text-black resize-none"
              value={newAnnouncement.description}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  description: e.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="mt-[16px] w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center hover:scale-105 transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Create Announcement"
            )}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="p-4 relative sm:px-16 px-6 sm:py-16 py-10">
      {showToast && <Toast message={toastMessage} iconName={toastIcon} />}

      {/* Modals */}
      <EventFormModal />
      <AnnouncementFormModal />

      {/* Tabs */}
      <div className="flex mb-4 border-b">
        <button
          className={`px-4 py-2 subtitle-1 transition-all duration-300 ${
            activeTab === "events"
              ? "border-b-2 border-purpleColor text-purpleColor"
              : "hover:text-purpleColor"
          }`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
        <button
          className={`px-4 py-2 subtitle-1 ml-4 transition-all duration-300 ${
            activeTab === "announcements"
              ? "border-b-2 border-purpleColor text-purpleColor"
              : "hover:text-purpleColor"
          }`}
          onClick={() => setActiveTab("announcements")}
        >
          Announcements
        </button>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Events Section */}
        <div
          className={`transform transition-all duration-300 ${
            activeTab === "events"
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 hidden"
          }`}
        >
          {/* Header with Add Button and Delete Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Events</h2>
            <div className="flex items-center gap-4">
              {selectedEvents.length > 0 && (
                <button
                  onClick={handleDeleteEvents}
                  className="bg-danger text-white px-4 py-2 rounded flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Delete Selected"
                  )}
                </button>
              )}
              <button
                onClick={() => setShowEventForm(true)}
                className="flex items-center p-2 bg-success-500 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg p-4 w-full">
            <div className="space-y-4">
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event, index) => (
                  <div
                    key={event._id}
                    className={`p-4 rounded-lg flex items-start ${
                      index % 3 === 0
                        ? "bg-lamaPurpleLight"
                        : index % 3 === 1
                        ? "bg-lamaYellowLight"
                        : "bg-lamaSkyLight"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2 mt-1"
                      checked={selectedEvents.includes(event._id)}
                      onChange={() => handleEventSelection(event._id)}
                    />
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold text-black">
                        {event.title}
                      </h3>
                      <p className="text-sm text-black mt-1">{event.content}</p>
                      <div className="flex justify-between mt-2 text-sm text-black">
                        <span>{event.eventDate}</span>
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No events available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div
          className={`transform transition-all duration-300 ${
            activeTab === "announcements"
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 hidden"
          }`}
        >
          {/* Header with Add Button and Delete Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
            <div className="flex items-center gap-4">
              {selectedAnnouncements.length > 0 && (
                <button
                  onClick={handleDeleteAnnouncements}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Delete Selected"
                  )}
                </button>
              )}
              <button
                onClick={() => setShowAnnouncementForm(true)}
                className="flex items-center p-2 bg-green-500 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Announcements List */}
          <div className="bg-white rounded-lg p-4 w-full">
            <div className="space-y-4">
              {Array.isArray(announcements) && announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <div
                    key={announcement._id}
                    className="border p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        {announcement.title}
                      </h3>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleAnnouncementSelection(announcement._id)
                        }
                        checked={selectedAnnouncements.includes(
                          announcement._id
                        )}
                        className="h-5 w-5 focus:outline focus:outline-2 focus:outline-primaryBlue"
                      />
                    </div>
                    <p className="mt-2 text-gray-600">
                      {announcement.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No announcements available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
