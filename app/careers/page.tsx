"use client"

import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Button from "@/components/ui/button2";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, DollarSign } from 'lucide-react';
import Link from "next/link";

const jobOpenings = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $120k",
    description: "Join our team to build beautiful, responsive user interfaces that delight our customers.",
    requirements: ["React/Next.js", "TypeScript", "Tailwind CSS", "5+ years experience"]
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $140k",
    description: "Lead product strategy and execution for our WhatsApp Business platform.",
    requirements: ["Product strategy", "User research", "Agile methodology", "3+ years experience"]
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    salary: "$60k - $80k",
    description: "Help our customers succeed and grow their businesses with our platform.",
    requirements: ["Customer support", "CRM tools", "Communication skills", "2+ years experience"]
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: ["AWS/Azure", "Docker/Kubernetes", "CI/CD", "4+ years experience"]
  }
];

// Group jobs by department
const jobsByDepartment = jobOpenings.reduce((acc, job) => {
  if (!acc[job.department]) {
    acc[job.department] = [];
  }
  acc[job.department].push(job);
  return acc;
}, {} as Record<string, typeof jobOpenings>);

export default function CareersPage() {
  return (
    <div className="bg-[#cbf9fe] selection:bg-cyan-500 selection:text-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-24 overflow-x-clip bg-gradient-to-b from-cyan-100 via-purple-100 to-white w-full relative">
        <div className="container max-w-6xl mx-auto relative p-[1rem] sm:p-[0rem]">
          <div className="flex justify-center">
            <div className="inline-flex py-1 px-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full text-white font-semibold">
              Join Our Team
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6 text-gray-900 selection:bg-cyan-500 selection:text-white"
          >
            Build the future of <span className="text-cyan-600">business communication</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="selection:bg-cyan-500 selection:text-white text-center text-xl text-gray-600 mt-8 max-w-3xl mx-auto"
          >
            Join our mission to revolutionize how businesses communicate with their customers through WhatsApp. 
            We're looking for passionate individuals who want to make a real impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <Link href="#openings">
              <Button size="lg" variant="primary" className="text-lg px-8 ">
                View Open Positions
                
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section id="openings" className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-[1rem] sm:px-[0rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6">
              Current <span className="text-cyan-600">Openings</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover exciting opportunities to join our talented and creative team. Explore our current openings below and find the perfect role to showcase your skills and passion for innovation.
            </p>
          </motion.div>

          {/* Job Listings by Department */}
          <div className="space-y-12">
            {Object.entries(jobsByDepartment).map(([department, jobs], deptIndex) => (
              <motion.div
                key={department}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: deptIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{department}</h3>
                <div className="space-y-4">
                  {jobs.map((job, index) => (
                    <div
                      key={job.title}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-cyan-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                            {job.title.includes("Senior") && (
                              <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="secondary" size="sm">
                            Learn More
                          </Button>
                          <Button variant="primary" size="sm">
                            Apply Now
                           
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Don't see the right fit?
            </h3>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button variant="secondary" size="lg">
              Send General Application
             
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
