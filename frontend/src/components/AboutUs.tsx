import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Users,
  Globe,
  Award,
  Calendar,
  HandHeart,
  TreePine,
  Target,
  ArrowRight,
  CheckCircle,
  X,
  Rocket,
  Shield,
} from "lucide-react";

const AboutUs = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Volunteers" },
    { icon: Award, value: "1,200+", label: "Partner Organizations" },
    { icon: Calendar, value: "10K+", label: "Monthly Events" },
    { icon: HandHeart, value: "1M+", label: "Lives Impacted" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "We believe in the power of community service to transform both volunteers and those they serve.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Making a difference locally while contributing to global sustainable development goals.",
    },
    {
      icon: Target,
      title: "Meaningful Connections",
      description:
        "Creating lasting relationships between volunteers and organizations that share common goals.",
    },
    {
      icon: TreePine,
      title: "Sustainable Change",
      description:
        "Focusing on long-term solutions that create lasting positive impact in communities.",
    },
  ];

  const features = [
    "Smart matching algorithm connects volunteers with their perfect opportunities",
    "Real-time event tracking and hour logging",
    "Comprehensive impact measurement and reporting",
    "Built-in community features and volunteer recognition",
    "Integrated training and skill development programs",
    "Mobile-first design for on-the-go volunteering",
  ];

  return (
    <div className="bg-gradient-to-b from-pink-100 via-yellow-100 to-indigo-100 min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h1
          className="text-5xl font-bold text-blue-900 mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Connecting Hearts, Creating Impact
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          We're on a mission to make volunteering accessible, meaningful, and
          impactful for everyone. Join us in creating positive change in
          communities around the world.
        </motion.p>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <Card className="bg-gradient-to-tr from-teal-300 to-purple-500 shadow-2xl p-8 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div
                key={label}
                className="text-center group"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center mb-2">
                  <Icon className="w-14 h-14 text-white group-hover:text-pink-600 transition-all" />
                </div>
                <div className="text-4xl font-extrabold text-white group-hover:text-yellow-300">
                  {value}
                </div>
                <p className="text-white group-hover:text-yellow-200">{label}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              className="p-6 bg-gradient-to-br from-orange-200 via-purple-100 to-teal-200 rounded-2xl shadow-2xl hover:shadow-2xl hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <Icon className="w-14 h-14 text-teal-600 hover:text-yellow-400 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 text-center mb-2">
                {title}
              </h3>
              <p className="text-gray-700 text-center">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          Why Choose Us
        </h2>
        <div className="bg-gradient-to-r from-pink-200 to-indigo-300 shadow-2xl rounded-xl p-8">
          <ul className="space-y-4">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center space-x-4 text-gray-700"
              >
                <CheckCircle className="w-6 h-6 text-teal-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-teal-500 text-white rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default AboutUs;
