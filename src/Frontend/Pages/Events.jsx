  import { useState, useEffect } from 'react';

  const Events = () => {
    const [events, setEvents] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const url=  import.meta.env.VITE_API_BASE_URL
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
    const [newEvent, setNewEvent] = useState({
      title: '',
      description: '',
      date: '',
      location: ''
    });
    const [newAnnouncement, setNewAnnouncement] = useState({
      title: '',
      description: ''
    });

    useEffect(() => {
      fetchEvents();
      fetchAnnouncements();
    }, []);

    const fetchEvents = async () => {
      try {
        const response = await fetch(`${url}/api/v1/event/getallevents`);
        const data = await response.json();
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${url}/api/v1/announcement/getallannouncements`);
        const data = await response.json();
        setAnnouncements(data || []);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements([]);
      }
    };

    const handleEventSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${url}/api/v1/event/create-event`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEvent),
        });
        if (response.ok) {
          fetchEvents();
          setNewEvent({ title: '', description: '', date: '', location: '' });
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    };

    const handleAnnouncementSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${url}/api/v1/announcement/create-announcement`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAnnouncement),
        });
        if (response.ok) {
          fetchAnnouncements();
          setNewAnnouncement({ title: '', description: '' });
        }
      } catch (error) {
        console.error('Error creating announcement:', error);
      }
    };

    const handleEventSelection = (eventId) => {
      setSelectedEvents(prev => 
        prev.includes(eventId) 
          ? prev.filter(id => id !== eventId)
          : [...prev, eventId]
      );
    };

    const handleAnnouncementSelection = (announcementId) => {
      setSelectedAnnouncements(prev => 
        prev.includes(announcementId) 
          ? prev.filter(id => id !== announcementId)
          : [...prev, announcementId]
      );
    };

    const handleDeleteEvents = async () => {
      if (selectedEvents.length === 0) return;
      try {
        const response = await fetch(`${url}/api/v1/event/delete-events`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventIds: selectedEvents }),
        });
        if (response.ok) {
          fetchEvents();
          setSelectedEvents([]);
        }
      } catch (error) {
        console.error('Error deleting events:', error);
      }
    };

    const handleDeleteAnnouncements = async () => {
      if (selectedAnnouncements.length === 0) return;
      try {
        const response = await fetch(`${url}/api/v1/announcement/delete-announcement`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ announcementIds: selectedAnnouncements }),
        });
        if (response.ok) {
          fetchAnnouncements();
          setSelectedAnnouncements([]);
        }
      } catch (error) {
        console.error('Error deleting announcements:', error);
      }
    };

    return (
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        {/* Events Section */}
        <div className="w-full lg:w-1/4 h-screen overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-4">

            <h2 className="text-2xl font-bold mb-4 text-gray-500">Events</h2>
          
            {/* Create Event Form */}
            <form onSubmit={handleEventSubmit} className="mb-6">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full mb-2 p-2 border rounded"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
              <textarea
                placeholder="Event Description"
                className="w-full mb-2 p-2 border rounded"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
              <input
                type="text"
                placeholder="Date"
                className="w-full mb-2 p-2 border rounded"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full mb-2 p-2 border rounded"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Create Event
              </button>
            </form>

            {selectedEvents.length > 0 && (
              <button
                onClick={handleDeleteEvents}
                className="w-full mb-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete Selected Events
              </button>
            )}

            {/* Events List */}
            <div className="space-y-4">
              {Array.isArray(events) && events.map((event) => (
                <div key={event._id} className="border p-4 rounded-lg flex items-start">
                  <input
                    type="checkbox"
                    className="mr-2 mt-1"
                    checked={selectedEvents.includes(event._id)}
                    onChange={() => handleEventSelection(event._id)}
                  />
                  <div className="flex-1">


                    <h3 className="font-bold text-gray-500">{event.title}</h3>
                    <p className="text-gray-500">{event.description}</p>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{event.date}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="w-full lg:w-1/4 h-screen overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-4">

            <h2 className="text-2xl font-bold mb-4 text-gray-500">Announcements</h2>
          
            {/* Create Announcement Form */}
            <form onSubmit={handleAnnouncementSubmit} className="mb-6">
              <input
                type="text"
                placeholder="Announcement Title"
                className="w-full mb-2 p-2 border rounded"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
              />
              <textarea
                placeholder="Announcement Description"
                className="w-full mb-2 p-2 border rounded"
                value={newAnnouncement.description}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, description: e.target.value})}
              />
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Create Announcement
              </button>
            </form>

            {selectedAnnouncements.length > 0 && (
              <button
                onClick={handleDeleteAnnouncements}
                className="w-full mb-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete Selected Announcements
              </button>
            )}

            {/* Announcements List */}
            <div className="space-y-4">
              {Array.isArray(announcements) && announcements.map((announcement) => (
                <div key={announcement._id} className="border p-4 rounded-lg flex items-start">
                  <input
                    type="checkbox"
                    className="mr-2 mt-1"
                    checked={selectedAnnouncements.includes(announcement._id)}
                    onChange={() => handleAnnouncementSelection(announcement._id)}
                  />
                  <div className="flex-1">


                    <h3 className="font-bold text-gray-500">{announcement.title}</h3>
                    <p className="text-gray-500">{announcement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default Events;