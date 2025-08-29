"use client";

import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Button from "@/components/ui/button2";
import Tag from "@/components/ui/tag";
import { MapPin, Clock, Mail } from "lucide-react";
import Link from "next/link";

const jobOpenings = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $120k",
    description:
      "Join our team to build beautiful, responsive user interfaces that delight our customers.",
    requirements: [
      "React/Next.js",
      "TypeScript",
      "Tailwind CSS",
      "5+ years experience",
    ],
    learnMoreUrl: "https://avenping.com/careers/senior-frontend-developer",
    applyUrl: "https://avenping.com/careers/apply/senior-frontend-developer",
    isOpen: false,
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $140k",
    description:
      "Lead product strategy and execution for our WhatsApp Business platform.",
    requirements: [
      "Product strategy",
      "User research",
      "Agile methodology",
      "3+ years experience",
    ],
    learnMoreUrl: "https://avenping.com/careers/product-manager",
    applyUrl: "https://avenping.com/careers/apply/product-manager",
    isOpen: false,
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    salary: "$60k - $80k",
    description:
      "Help our customers succeed and grow their businesses with our platform.",
    requirements: [
      "Customer support",
      "CRM tools",
      "Communication skills",
      "2+ years experience",
    ],
    learnMoreUrl: "https://avenping.com/careers/customer-success-manager",
    applyUrl: "https://avenping.com/careers/apply/customer-success-manager",
    isOpen: false,
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    description:
      "Build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: [
      "AWS/Azure",
      "Docker/Kubernetes",
      "CI/CD",
      "4+ years experience",
    ],
    learnMoreUrl: "https://avenping.com/careers/devops-engineer",
    applyUrl: "https://avenping.com/careers/apply/devops-engineer",
    isOpen: false,
  },
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
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-purple-100 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium">
                <Tag>Join Our Team</Tag>
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 mb-8 leading-tight">
              Build the future of{" "}
              <span className="text-cyan-600">business communication</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join our mission to revolutionize how businesses communicate with
              their customers through WhatsApp. We're looking for passionate
              individuals who want to make a real impact.
            </p>
            <div className="flex justify-center">
              <Link href="#openings">
                <Button variant="primary" className="text-lg px-8 h-12">
                  View Open Positions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Current Openings Section */}
      <div id="openings" className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              Current <span className="text-cyan-600">Openings</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Discover exciting opportunities to join our talented and creative
              team. Explore our current openings below and find the perfect role
              to showcase your skills and passion for innovation.
            </p>
          </div>

          {/* Job Listings by Department */}
          <div className="space-y-12">
            {Object.entries(jobsByDepartment).map(([department, jobs]) => (
              <div key={department}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {department}
                </h3>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.title}
                      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-semibold text-gray-900">
                              {job.title}
                            </h4>
                            {!job.isOpen && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                Closed
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">
                            {job.description}
                          </p>
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
                              {job.salary}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          {job.isOpen ? (
                          <Link
                            href={job.learnMoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="secondary" className="h-10">
                              Learn More
                            </Button>
                          </Link>) : (
                            <Button
                              variant="secondary"
                              className="h-10 opacity-50 cursor-not-allowed"
                              disabled
                              onClick={() => {
                                alert("Application Closed");
                              }}
                            >
                              Learn More
                            </Button>
                          )}
                          {job.isOpen ? (
                            <Link
                              href={job.applyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="primary" className="h-10">
                                Apply Now
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="primary"
                              className="h-10 opacity-50 cursor-not-allowed"
                              disabled
                            >
                              Application Closed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <div className="w-full max-w-2xl text-center p-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Don't see the right fit?
              </h3>
              <p className="text-gray-600 mb-6">
                We're always looking for talented individuals. Send us your resume
                and we'll keep you in mind for future opportunities.
              </p>
              <Button
                variant="secondary"
                className="h-12 text-lg flex items-center gap-2 justify-center"
                onClick={() => {
                  const subject = encodeURIComponent(
                    "General Application - AvenPing Careers"
                  );
                  const body = encodeURIComponent(`
Dear AvenPing Team,

I am writing to express my interest in joining the AvenPing team. Although I don't see a specific position that matches my skills at the moment, I would like to be considered for future opportunities.

Please find my resume attached and let me know if there are any upcoming positions that might be a good fit.

Best regards,
[Your Name]
[Your Email]
[Your Phone Number]
                  `);
                  window.location.href = `mailto:careers@avenping.com?subject=${subject}&body=${body}`;
                }}
              >
                <Mail className="w-5 h-5" />
                Send General Application
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
