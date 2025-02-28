  import { useState, useEffect } from 'react';
  import Toast from '../Components/Toast'
  import Cookies from "js-cookie";
  const Events = () => {
    const token = Cookies.get('token');
    const url=  import.meta.env.VITE_API_BASE_URL

    const [events, setEvents] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
    const [activeTab, setActiveTab] = useState('events');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        const response = await fetch(`${url}/api/v1/event/getallevents`);
        const data = await response.json();
        setEvents(data || []);
      } catch (error) {
        setToastMessage('Error fetching events');
        setToastIcon('wrong');
        setShowToast(true);
        setEvents([]);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${url}/api/v1/announcement/getallannouncements`);
        const data = await response.json();
        setAnnouncements(data || []);
      } catch (error) {
        setToastMessage('Error fetching announcements');
        setToastIcon('wrong');
        setShowToast(true);
        setAnnouncements([]);
      }
    };

    const handleEventSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/v1/event/create-event`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(newEvent),
        });
        if (response.ok) {
          await fetchEvents();
          setNewEvent({ title: '', description: '', date: '', location: '' });
          setToastMessage('Event created successfully');
          setToastIcon('right');
          setShowToast(true);
        } else {
          throw new Error('Failed to create event');
        }
      } catch (error) {
        setToastMessage('Error creating event');
        setToastIcon('wrong');
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    const handleAnnouncementSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await fetch(`${url}/api/v1/announcement/create-announcement`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(newAnnouncement),
        });
        if (response.ok) {
          await fetchAnnouncements();
          setNewAnnouncement({ title: '', description: '' });
          setToastMessage('Announcement created successfully');
          setToastIcon('right');
          setShowToast(true);
        } else {
          throw new Error('Failed to create announcement');
        }
      } catch (error) {
        setToastMessage('Error creating announcement');
        setToastIcon('wrong');
        setShowToast(true);
      } finally {
        setIsLoading(false);
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
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/v1/event/delete-events`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ eventIds: selectedEvents }),
        });
        if (response.ok) {
          await fetchEvents();
          setSelectedEvents([]);
          setToastMessage('Events deleted successfully');
          setToastIcon('right');
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage('Error deleting events');
        setToastIcon('wrong');
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    const handleDeleteAnnouncements = async () => {
      if (selectedAnnouncements.length === 0) return;
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/v1/announcement/delete-announcement`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ announcementIds: selectedAnnouncements }),
        });
        if (response.ok) {
          await fetchAnnouncements();
          setSelectedAnnouncements([]);
          setToastMessage('Announcements deleted successfully');
          setToastIcon('right');
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage('Error deleting announcements');
        setToastIcon('wrong');
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="p-4">
        {showToast && <Toast message={toastMessage} iconName={toastIcon} />}
        {/* Tabs */}
        <div className="flex justify-center mb-4 border-b">
          <button
            className={`px-4 py-2 transition-all duration-300 ${
              activeTab === 'events'
                ? 'border-b-2 border-purpleColor text-purpleColor'
                : 'text-gray-500 hover:text-purpleColor'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={`px-4 py-2 ml-4 transition-all duration-300 ${
              activeTab === 'announcements'
                ? 'border-b-2 border-purpleColor text-purpleColor'
                : 'text-gray-500 hover:text-purpleColor'
            }`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
        </div>

        {/* Content */}
        <div className="w-full max-w-2xl mx-auto">
          {/* Events Section */}
          <div className={`transform transition-all duration-300 ${
            activeTab === 'events' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'
          }`}>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-500">Events</h2>
              
              {/* Create Event Form */}
              <form onSubmit={handleEventSubmit} className="mb-6">
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full mb-2 p-2 border rounded bg-primary-300 text-black-300 border-lamaSkyLight"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <textarea
                  placeholder="Event Description"
                  className="w-full mb-2 p-2 border rounded bg-primary-300 text-black-300 border-lamaSkyLight"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full mb-2 p-2 border rounded bg-primary-300 text-black-300 border-lamaSkyLight"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full mb-2 p-2 border rounded bg-primary-300 text-black-300 border-lamaSkyLight"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Create Event'
                  )}
                </button>
              </form>

              {selectedEvents.length > 0 && (
                <button
                  onClick={handleDeleteEvents}
                  className="w-full mb-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Delete Selected Events'
                  )}
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
          <div className={`transform transition-all duration-300 ${
            activeTab === 'announcements' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 hidden'
          }`}>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-500">Announcements</h2>
              
              {/* Create Announcement Form */}
              <form onSubmit={handleAnnouncementSubmit} className="mb-6">
                <input
                  type="text"
                  placeholder="Announcement Title"
                  className="w-full mb-2 p-2 border rounded bg-primary-300 text-black-300 border-lamaSkyLight"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                />
                <textarea
                  placeholder="Announcement Description"
                  className="w-full mb-2 p-2 border rounded bg-primary-300 text-black-300 border-lamaSkyLight"
                  value={newAnnouncement.description}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, description: e.target.value})}
                />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Create Announcement'
                  )}
                </button>
              </form>

              {selectedAnnouncements.length > 0 && (
                <button
                  onClick={handleDeleteAnnouncements}
                  className="w-full mb-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Delete Selected Announcements'
                  )}
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
      </div>
    );
  };

  export default Events;