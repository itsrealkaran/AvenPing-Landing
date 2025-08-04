"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { ChevronLeft, Eye, EyeOff, MessageCircle, ChevronDown } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import Image from "next/image"

interface SignupData {
  name: string
  industry: string
  customerCount: string
  email: string
  password: string
}

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Consulting",
  "Marketing",
  "Other",
]

const customerRanges = ["1-50 customers", "51-200 customers", "201-1000 customers", "1000+ customers"]

export default function SignupOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
  const router = useRouter()

  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    industry: "",
    customerCount: "",
    email: "",
    password: "",
  })

  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post("/api/auth/signup", signupData)

      if (response.status === 200) {
        toast.success("Account created successfully!")
        router.push("/dashboard")
      } else {
        toast.error("Failed to create account")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkipWhatsApp = () => {
    router.push("/dashboard")
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return signupData.name.trim().length > 0
      case 2:
        return signupData.industry.length > 0
      case 3:
        return signupData.customerCount.length > 0
      case 4:
        return signupData.email.trim().length > 0 && signupData.email.includes("@")
      case 5:
        return signupData.password.length >= 8
      case 6:
        return true
      default:
        return false
    }
  }

  const renderProgressDots = () => (
    <div className="flex justify-center space-x-2 mt-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            index + 1 === currentStep ? "bg-[#43A2C9]" : index + 1 < currentStep ? "bg-[#43A2C9]/60" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What should we call you?</h1>
              <p className="text-gray-600 text-sm sm:text-base">Let's start with your name</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#43A2C9] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                placeholder="Enter your full name"
                autoFocus
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What's your industry?</h1>
              <p className="text-gray-600 text-sm sm:text-base">Help us customize your experience</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#43A2C9] focus:border-transparent transition-all duration-200 text-left flex items-center justify-between"
                >
                  <span className={signupData.industry ? "text-gray-900" : "text-gray-400"}>
                    {signupData.industry || "Choose Your Industry"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${showIndustryDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                {showIndustryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => {
                          setSignupData({ ...signupData, industry })
                          setShowIndustryDropdown(false)
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-900"
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How many customers do you serve?</h1>
              <p className="text-gray-600 text-sm sm:text-base">This helps us recommend the right plan</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {customerRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setSignupData({ ...signupData, customerCount: range })}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                    signupData.customerCount === range
                      ? "border-[#43A2C9] bg-[#43A2C9]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-gray-900 font-medium">{range}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What's your email?</h1>
              <p className="text-gray-600 text-sm sm:text-base">We'll use this to create your account</p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#43A2C9] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                placeholder="Enter your email address"
                autoFocus
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6 ">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create a password</h1>
              <p className="text-gray-600 text-sm sm:text-base">Choose a strong password for your account</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#43A2C9] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 pr-12"
                  placeholder="Enter a strong password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-left">Password should be at least 8 characters long</p>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="text-center space-y-6 ">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16  rounded-full flex items-center justify-center">
                <Image src="/whatsapp.svg" alt="WhatsApp" width={100} height={100} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Connect your WhatsApp</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Connect your WhatsApp Business account to start managing conversations
              </p>
            </div>
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-[#43A2C9] hover:bg-cyan-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-[#43A2C9] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  "Connect to WhatsApp"
                )}
              </button>
              <button
                type="button"
                onClick={handleSkipWhatsApp}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Skip for now
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFFF9] via-white to-[#FDCEFF]">
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        

        <div className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
           <Image src="/AvenLogo.svg" alt="AvenPing" width={40} height={40} />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              <span className="text-[#43A2C9]">AvenPing</span>
            </span>
          </div>
          {/* <p className="text-gray-600 text-xs sm:text-sm">
            Your Business Communication Hub
          </p> */}
        </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-black/10 p-6 sm:p-8 w-full">
            {renderStep()}

            {currentStep < 6 && (
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    currentStep === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isStepValid()
                      ? "bg-[#43A2C9] hover:bg-cyan-600 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {renderProgressDots()}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#43A2C9] hover:text-cyan-600 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
