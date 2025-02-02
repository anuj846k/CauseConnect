import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { 
  FiLogOut, 
  FiGrid,
  FiCalendar,
  FiUser,
  FiBarChart2,
  FiBell,
  FiPlus,
  FiMoreVertical,
  FiTrendingUp,
  FiClock,
  FiAward
} from "react-icons/fi";
import { motion } from "framer-motion";
import VolunteerCertificateGenerator from "./certificateGen";

// Interfaces
interface User {
  username: string;
  email: string;
  role: "volunteer" | "organizer";
  registeredEvents: Event[];
  createdEvents: Event[];
}

interface Event {
  _id: string;
  title: string;
  date: string;
  status: string;
}

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const navigate = useNavigate();

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = localStorage.getItem("token");
        if (userToken) {
          const decodedToken: any = jwtDecode(userToken);
          setUserId(decodedToken?.userId);
          const response = await fetch("https://causeconnect-dgu1.onrender.com//api/users/curr", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: decodedToken?.userId }),
          });
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const stats = [
    {
      label: 'Total Hours',
      value: '284',
      change: '+12.5%',
      icon: FiClock,
      color: 'violet'
    },
    {
      label: 'Events Completed',
      value: user?.createdEvents?.length.toString() || '0',
      change: '+5.2%',
      icon: FiCalendar,
      color: 'emerald'
    },
    {
      label: 'Impact Score',
      value: '94',
      change: '+7.8%',
      icon: FiTrendingUp,
      color: 'blue'
    },
    {
      label: 'Active Events',
      value: user?.createdEvents?.filter(e => e.status === 'active').length.toString() || '0',
      change: '+2.3%',
      icon: FiBarChart2,
      color: 'indigo'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Volunteer Hub
              </h1>
              <nav className="hidden md:flex space-x-1">
                {['Overview', 'Events', 'Impact', 'Community'].map((item) => (
                  <button
                    key={item}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setOpenNotifications(!openNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full"
              >
                <FiBell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              
              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-medium">
                  {user?.username?.charAt(0) || 'U'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user?.username || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Role'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.username || 'Volunteer'}!</h2>
          <p className="text-gray-600 mt-1">Here's what's happening with your volunteer work today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                <button className="flex items-center px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <FiPlus className="w-4 h-4 mr-2" />
                  New Event
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {user?.registeredEvents?.slice(0, 4).map((event) => (
                <motion.div
                  key={event._id}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                  className="p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FiCalendar className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        event.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-50 text-gray-700"
                      }`}>
                        {event.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FiMoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Impact Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Monthly Goal</span>
                    <span className="text-sm text-blue-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Hours Completed</span>
                    <span className="text-sm text-emerald-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Impact Score</span>
                    <span className="text-sm text-violet-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-violet-500 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  {['Community Champion', 'Event Organizer', '100 Hours Club'].map((achievement) => (
                    <div key={achievement} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <FiAward className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-sm text-gray-600">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certificate Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <VolunteerCertificateGenerator />
        </motion.div>
      </main>

      {/* Notifications Panel - Slide-in overlay */}
      {openNotifications && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l z-20"
        >
          <div className="sticky top-0 bg-white border-b p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <button
                onClick={() => setOpenNotifications(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-64px)]">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <p className="text-sm text-gray-800 mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;