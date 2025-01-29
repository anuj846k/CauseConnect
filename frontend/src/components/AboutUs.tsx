import React from 'react';
import { Card } from "@/components/ui/card";
import bgImage from '../assets/bg.jpg';
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
  CheckCircle2,
  Building2,
  CheckCircle,
  X,
  Rocket,
  Shield,
  Zap
} from "lucide-react";
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Volunteers" },
    { icon: Building2, value: "1,200+", label: "Partner Organizations" },
    { icon: Calendar, value: "10K+", label: "Monthly Events" },
    { icon: HandHeart, value: "1M+", label: "Lives Impacted" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in the power of community service to transform both volunteers and those they serve."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Making a difference locally while contributing to global sustainable development goals."
    },
    {
      icon: Target,
      title: "Meaningful Connections",
      description: "Creating lasting relationships between volunteers and organizations that share common goals."
    },
    {
      icon: TreePine,
      title: "Sustainable Change",
      description: "Focusing on long-term solutions that create lasting positive impact in communities."
    }
  ];

  const features = [
    "Smart matching algorithm connects volunteers with their perfect opportunities",
    "Real-time event tracking and hour logging",
    "Comprehensive impact measurement and reporting",
    "Built-in community features and volunteer recognition",
    "Integrated training and skill development programs",
    "Mobile-first design for on-the-go volunteering"
  ];

  const PricingCard = ({ plan }) => (
    <Card className="p-6 flex flex-col h-full hover:shadow-2xl transition-all transform hover:scale-105">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full mb-4">
          <plan.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
        <div className="flex items-center justify-center mb-2">
          <span className="text-gray-600 text-lg">$</span>
          <span className="text-4xl font-bold text-gray-900 mx-1">{plan.price}</span>
          {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
        </div>
        <p className="text-gray-700">{plan.description}</p>
      </div>

      <div className="flex-grow">
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5 mr-2" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="mt-6 w-full px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center">
        Get Started <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </Card>
  );

  return (
    <div
      className="bg-cover bg-fixed bg-center min-h-screen"
      style={{
        backgroundImage: "url('https://media.istockphoto.com/id/1252584401/vector/heart-and-hands-painting.jpg?s=612x612&w=0&k=20&c=tcOGpdSUJkI_Uv9kcWVHnlzuiqrJZcufGRXrkgWO6_U=')",
      }}
    >
      <div className="bg-white bg-opacity-80">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16 py-20">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-xl md:text-6xl lg:text-7xl drop-shadow-md">
              Connecting Hearts, Creating Impact
            </h1>
            <p className="text-2xl text-blue-900 max-w-3xl mx-auto">
              We're on a mission to make volunteering accessible, meaningful, and impactful for everyone. Join us in creating positive change in communities around the world.
            </p>
          </div>

          {/* Stats Section */}
          <Card className="p-8 mb-16 bg-gradient-to-br from-blue-400 to-purple-300 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="text-center p-6 bg-white rounded-lg shadow-lg transition-all transform hover:scale-105"
                >
                  <Icon className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-indigo-800 mb-1">{value}</div>
                  <div className="text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Our Values Section */}
          <div className="mb-16">
  <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">
    Our Values
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {values.map(({ icon: Icon, title, description }, index) => {
      const bgColors = ["bg-pink-100", "bg-blue-100", "bg-green-100", "bg-yellow-100"]; // Array of light background colors
      const bgColor = bgColors[index % bgColors.length]; // Rotate through colors if more than 4 values
      return (
        <Card
          key={title}
          className={`p-6 text-center hover:shadow-lg transition-all hover:scale-105 ${bgColor}`} // Apply the background color here
        >
          <Icon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-indigo-900 mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </Card>
      );
    })}
  </div>
</div>

          {/* Features Section */}
<Card className="relative p-8 mb-16 bg-gradient-to-br from-yellow-300 to-yellow-90 rounded-xl shadow-xl overflow-hidden">
  {/* Background Image */}
  <img 
    src={bgImage}
    alt="Volunteering Doodle"
    className="absolute bottom-0 right-0 w-48 opacity-90 pointer-events-none"
  />

  {/* Main Content */}
  <div className="relative z-10 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-indigo-900 text-center mb-8">
      Built for Modern Volunteering
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature) => (
        <div key={feature} className="flex items-start space-x-2">
          <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-1" />
          <span className="text-gray-700">{feature}</span>
        </div>
      ))}
    </div>
  </div>
</Card>

        </div>
      
      {/* CTA Section */}
      <div className='p-9'>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join our community of changemakers and start your volunteering journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to='/events' className="bg-yellow-400 text-blue-900 font-bold text-lg sm:text-l py-3 px-3 rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
            Find Opportunities 
          </Link>
        </div>
        
      </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
