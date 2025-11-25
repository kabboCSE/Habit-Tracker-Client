// ========================================
// 📄 src/pages/Home.jsx
// ========================================
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBrain,
  FaChartLine,
  FaHeart,
  FaTrophy,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  const [featuredHabits, setFeaturedHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/habits/featured`)
      .then((res) => {
        setFeaturedHabits(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const benefits = [
    {
      icon: <FaBrain className="text-5xl text-blue-500" />,
      title: "Better Focus",
      desc: "Improve concentration and mental clarity",
    },
    {
      icon: <FaChartLine className="text-5xl text-green-500" />,
      title: "Track Progress",
      desc: "Visualize your growth over time",
    },
    {
      icon: <FaHeart className="text-5xl text-red-500" />,
      title: "Reduced Stress",
      desc: "Build routines that calm your mind",
    },
    {
      icon: <FaTrophy className="text-5xl text-yellow-500" />,
      title: "Achieve Goals",
      desc: "Turn dreams into daily actions",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-[600px]"
      >
        <SwiperSlide>
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
            <div className="text-center px-4">
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                Build Better Habits
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl mb-8"
              >
                Track your progress, build streaks, achieve your goals
              </motion.p>
              <Link
                to="/add-habit"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 inline-flex items-center gap-2"
              >
                Start Your Journey <FaArrowRight />
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-full bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center text-white">
            <div className="text-center px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Track Your Streaks
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Stay consistent and watch your habits grow
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center text-white">
            <div className="text-center px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Achieve Your Goals
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                One habit at a time, one day at a time
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Featured Habits */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-4xl font-bold text-center mb-12"
        >
          Featured Habits
        </motion.h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHabits.map((habit, index) => (
              <motion.div
                key={habit._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <img
                  src={habit.imageUrl || "https://via.placeholder.com/400x200"}
                  alt={habit.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {habit.category}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{habit.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {habit.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          habit.userPhotoURL || "https://via.placeholder.com/30"
                        }
                        alt={habit.userName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600">
                        {habit.userName}
                      </span>
                    </div>
                    <span className="text-orange-500 font-semibold">
                      🔥 {habit.currentStreak} day streak
                    </span>
                  </div>
                  <Link
                    to={`/habit/${habit._id}`}
                    className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Why Build Habits */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Build Habits?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-8">
            Join Thousands of Habit Builders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-5xl font-bold mb-2">10,000+</p>
              <p className="text-xl">Active Users</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50,000+</p>
              <p className="text-xl">Habits Tracked</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">1M+</p>
              <p className="text-xl">Days Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                text: "This app changed my life! I've built consistent habits that stuck.",
                avatar: "https://i.pravatar.cc/150?img=1",
              },
              {
                name: "Mike Chen",
                text: "The streak feature keeps me motivated every single day.",
                avatar: "https://i.pravatar.cc/150?img=2",
              },
              {
                name: "Emily Davis",
                text: "Best habit tracker I've ever used. Simple and effective.",
                avatar: "https://i.pravatar.cc/150?img=3",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
