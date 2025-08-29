"use client";

import { useState, useEffect } from "react";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Headphones,
  BarChart3,
  Settings,
  Database,
  MessageCircle,
  Users,
  Bot,
  Zap,
  Shield,
  QrCode,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WobbleCard } from "@/components/ui/wobble-card";
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo";
import Navbar from "@/components/navbar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Footer } from "@/components/footer";
import Tag from "@/components/ui/tag";
import {
  getUserRegionCached,
  getRegionConfig,
  type Region,
} from "@/lib/region";

const plans = [
  {
    name: "Basic",
    monthly: { India: "₹1199", Asia: "$14", Global: "$35" },
    yearly: { India: "₹999", Asia: "$12", Global: "$29" },
    period: "per month",
    yearlyNote: "Save $72 yearly",
    description: "Perfect for small businesses getting started",
    features: [
      { name: "Service Conversations - Unlimited", included: true },
      { name: "QR Generator", included: true },
      { name: "WhatsApp Button Generator", included: true },
      { name: "Profile Manager", included: true },
      { name: "Contacts - 1,500", included: true },
      { name: "Labels - 10", included: true },
      { name: "Attributes - 3", included: true },
      { name: "Templates - Unlimited", included: true },
      { name: "Phone Numbers - Unlimited", included: true },
      { name: "Campaigns - 2,500 recipients", included: true },
      { name: "WhatsApp Green Tick Application", included: false },
      { name: "Catalogue", included: false },
      { name: "Flow Builder", included: false },
      { name: "Analytics", included: false },
      { name: "AI Chat Bot", included: false },
      { name: "Campaign Analytics", included: false },
      { name: "Scheduled Campaigns", included: false },
      { name: "Priority Support", included: false },
      { name: "Mobile App", included: false },
    ],
    popular: false,
  },
  {
    name: "Premium",
    monthly: { India: "₹3,599", Asia: "$44", Global: "$71" },
    yearly: { India: "₹2,999", Asia: "$36", Global: "$59" },
    period: "per month",
    yearlyNote: "Save $144 yearly",
    description: "Ideal for growing businesses and small teams",
    features: [
      { name: "Service Conversations - Unlimited", included: true },
      { name: "QR Generator", included: true },
      { name: "WhatsApp Button Generator", included: true },
      { name: "Profile Manager", included: true },
      { name: "Contacts - 3,000", included: true },
      { name: "Labels - 10", included: true },
      { name: "Attributes - 5", included: true },
      { name: "Templates - Unlimited", included: true },
      { name: "Phone Numbers - Unlimited", included: true },
      { name: "Campaigns - Unlimited", included: true },
      { name: "WhatsApp Green Tick Application", included: true },
      { name: "Catalogue", included: true },
      { name: "Flow Builder - 3 Flows", included: true },
      { name: "Analytics", included: true },
      { name: "AI Chat Bot", included: false },
      { name: "Campaign Analytics", included: false },
      { name: "Scheduled Campaigns", included: false },
      { name: "Priority Support", included: false },
      { name: "Mobile App", included: false },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: { India: "₹5,999", Asia: "$72", Global: "$95" },
    yearly: { India: "₹4,999", Asia: "$60", Global: "$79" },
    period: "per month",
    yearlyNote: "Save $192 yearly",
    description: "For large organizations with complex needs",
    features: [
      { name: "Service Conversations - Unlimited", included: true },
      { name: "QR Generator", included: true },
      { name: "WhatsApp Button Generator", included: true },
      { name: "Profile Manager", included: true },
      { name: "Contacts - 6,000", included: true },
      { name: "Labels - 10", included: true },
      { name: "Attributes - 10", included: true },
      { name: "Templates - Unlimited", included: true },
      { name: "Phone Numbers - Unlimited", included: true },
      { name: "Campaigns - Unlimited", included: true },
      { name: "WhatsApp Green Tick Application", included: true },
      { name: "Catalogue", included: true },
      { name: "Flow Builder - 5 Flows", included: true },
      { name: "Analytics", included: true },
      { name: "AI Chat Bot", included: true },
      { name: "Campaign Analytics", included: true },
      { name: "Scheduled Campaigns", included: true },
      { name: "Priority Support", included: true },
      { name: "Mobile App", included: true },
    ],
    popular: false,
  },
];

const allFeatures = [
  "Service Conversations - Unlimited",
  "QR Generator",
  "WhatsApp Button Generator",
  "Profile Manager",
  "Contacts - 1,500",
  "Contacts - 3,000",
  "Contacts - 6,000",
  "Labels - 10",
  "Attributes - 3",
  "Attributes - 5",
  "Attributes - 10",
  "Templates - Unlimited",
  "Phone Numbers - Unlimited",
  "Campaigns - 2,500 recipients",
  "Campaigns - Unlimited",
  "WhatsApp Green Tick Application",
  "Catalogue",
  "Flow Builder - 3 Flows",
  "Flow Builder - 5 Flows",
  "Analytics",
  "AI Chat Bot",
  "Campaign Analytics",
  "Scheduled Campaigns",
  "Priority Support",
  "Mobile App",
];

const addOns = [
  {
    title: "Additional Flow",
    description:
      "Add one more flow to your flow builder for creating advanced customer journeys and automated sequences.",
    link: "More Detail",
    icon: <Settings size={24} className="text-cyan-600" />,
    monthly: { India: "₹399", Asia: "$5", Global: "$5" },
    yearly: { India: "₹3,999", Asia: "$50", Global: "$50" },
  },
  {
    title: "Extra Contacts (1,000)",
    description:
      "Expand your contact database with 1,000 additional contacts to manage more customers effectively.",
    link: "More Detail",
    icon: <Users size={24} className="text-cyan-600" />,
    monthly: { India: "₹599", Asia: "$7", Global: "$7" },
    yearly: { India: "₹5,999", Asia: "$70", Global: "$70" },
  },
  {
    title: "Mobile App Access",
    description:
      "Get full access to our mobile application for managing your WhatsApp business on the go.",
    link: "More Detail",
    icon: <Smartphone size={24} className="text-cyan-600" />,
    monthly: { India: "₹1,599", Asia: "$19", Global: "$19" },
    yearly: { India: "₹15,999", Asia: "$190", Global: "$190" },
  },
  {
    title: "Auto-Sync Feature",
    description:
      "Automatically sync incoming recipients to edit contacts from chat screen without manual intervention.",
    link: "More Detail",
    icon: <Database size={24} className="text-cyan-600" />,
    monthly: {
      India: "Included in Premium+",
      Asia: "Included in Premium+",
      Global: "Included in Premium+",
    },
    yearly: {
      India: "Included in Premium+",
      Asia: "Included in Premium+",
      Global: "Included in Premium+",
    },
  },
  {
    title: "Priority Support",
    description:
      "Get 24/7 priority access to our support team with faster response times and dedicated assistance.",
    link: "More Detail",
    icon: <Headphones size={24} className="text-cyan-600" />,
    monthly: {
      India: "Enterprise Only",
      Asia: "Enterprise Only",
      Global: "Enterprise Only",
    },
    yearly: {
      India: "Enterprise Only",
      Asia: "Enterprise Only",
      Global: "Enterprise Only",
    },
  },
  {
    title: "Advanced Analytics",
    description:
      "Deep dive into your campaign performance with detailed analytics, reports, and customer insights.",
    link: "More Detail",
    icon: <BarChart3 size={24} className="text-cyan-600" />,
    monthly: { India: "Premium+", Asia: "Premium+", Global: "Premium+" },
    yearly: { India: "Premium+", Asia: "Premium+", Global: "Premium+" },
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userRegion, setUserRegion] = useState<Region>("global");

  // Get user region on component mount
  useEffect(() => {
    const detectRegion = async () => {
      try {
        const region = await getUserRegionCached();
        setUserRegion(region);
      } catch (error) {
        console.warn("Failed to detect user region:", error);
        setUserRegion("global");
      } finally {
        setIsLoading(false);
      }
    };

    detectRegion();
  }, []);

  // Get the correct price for the current region and billing period
  const getPrice = (plan: (typeof plans)[0]) => {
    const regionKey =
      userRegion === "india"
        ? "India"
        : userRegion === "asia"
        ? "Asia"
        : "Global";
    const pricing = isYearly ? plan.yearly : plan.monthly;
    return pricing[regionKey as keyof typeof pricing];
  };

  // Get add-on price for the current region and billing period
  const getAddOnPrice = (addOn: (typeof addOns)[0]) => {
    const regionKey =
      userRegion === "india"
        ? "India"
        : userRegion === "asia"
        ? "Asia"
        : "Global";
    const pricing = isYearly ? addOn.yearly : addOn.monthly;
    return pricing[regionKey as keyof typeof pricing];
  };

  // Get region config for currency display
  const regionConfig = getRegionConfig(userRegion);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-purple-100 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium">
                <Tag>Pricing Plans</Tag>
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 mb-8 leading-tight">
              Select an AvenPing Plan That Matches Your <br />
              <span className="text-cyan-600">Goals!</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Take control of your WhatsApp business from start to finish.
              You'll never miss a step along the way.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm font-medium ${
                !isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly billing
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isYearly ? "bg-cyan-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Annual billing
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-6 px-6 font-semibold text-gray-900">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.name}
                        className={`text-center py-6 px-6 relative ${
                          plan.popular ? "bg-cyan-50" : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                              Most Popular
                            </span>
                          </div>
                        )}
                        <div className="mt-2">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {plan.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {plan.description}
                          </p>
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>
                            </div>
                          ) : (
                            <>
                              <div className="text-3xl font-bold text-gray-900 mb-1">
                                {getPrice(plan)}
                              </div>
                              <div className="text-sm text-gray-600">
                                {plan.period}
                              </div>
                              <div className="text-xs text-cyan-600 mt-1">
                                Prices in {regionConfig.currency}
                              </div>
                            </>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, featureIndex) => (
                    <tr
                      key={featureIndex}
                      className="border-b border-gray-100 hover:bg-gray-50/50"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {feature}
                      </td>
                      {plans.map((plan) => {
                        const planFeature = plan.features.find(
                          (f) => f.name === feature
                        );
                        return (
                          <td
                            key={`${plan.name}-${featureIndex}`}
                            className={`text-center py-4 px-6 ${
                              plan.popular ? "bg-cyan-50/30" : ""
                            }`}
                          >
                            {planFeature ? (
                              planFeature.included ? (
                                <Check
                                  size={20}
                                  className="text-cyan-500 mx-auto"
                                />
                              ) : (
                                <X
                                  size={20}
                                  className="text-gray-300 mx-auto"
                                />
                              )
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50/50">
                    <td className="py-6 px-6"></td>
                    {plans.map((plan) => (
                      <td
                        key={`button-${plan.name}`}
                        className={`text-center py-6 px-6 ${
                          plan.popular ? "bg-cyan-50/50" : ""
                        }`}
                      >
                        <Button
                          onClick={() => {
                            window.open(
                              "https://app.avenping.com/signup",
                              "_blank"
                            );
                          }}
                          className={`w-full max-w-xs h-12 text-lg rounded-full ${
                            plan.popular
                              ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                          }`}
                        >
                          Get Started
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-16 mt-20">
            <div className="text-center mb-8 ">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Enhance Your Plan with{" "}
                <span className="text-cyan-600">Add-Ons</span>{" "}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                Customize your AvenPing experience with these powerful add-ons
                designed to scale with your business needs.
              </p>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full text-sm font-medium">
                6 Add-ons Available
              </span>
            </div>
            <HoverEffect
              items={addOns.map((addOn) => ({
                ...addOn,
                price: getAddOnPrice(addOn),
              }))}
            />
          </div>

          {/* Enhanced Experience Section with Wobble Cards - Consistent Colors */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Experience the Power of{" "}
                <span className="text-cyan-600">AvenPing</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how AvenPing transforms your WhatsApp business
                communications with cutting-edge features and seamless
                integrations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
              <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-cyan-500 to-cyan-600 min-h-[500px] lg:min-h-[300px]">
                <div className="max-w-xs">
                  <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    AvenPing powers your entire WhatsApp business
                  </h2>
                  <p className="mt-4 text-left text-base/6 text-neutral-200">
                    With over 10,000+ active business users, AvenPing is the
                    most trusted WhatsApp business platform for modern
                    companies.
                  </p>
                </div>
                <img
                  src="/message_page.png"
                  width={500}
                  height={500}
                  alt="linear demo image"
                  className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
                />
              </WobbleCard>

              <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-cyan-400 to-cyan-500">
                <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Smart automation, seamless experience.
                </h2>
                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                  Automate responses, manage contacts, and track analytics all
                  in one powerful platform.
                </p>
                <div className="absolute -right-4 -bottom-4">
                  <Bot size={80} className="text-white/30" />
                </div>
              </WobbleCard>

              <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-br from-cyan-600 to-blue-600 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div className="max-w-sm">
                  <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Join businesses already using AvenPing for WhatsApp success!
                  </h2>
                  <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                    From small startups to enterprise companies, AvenPing scales
                    with your business needs and delivers results.
                  </p>
                </div>

                <img
                  src="/avenping_dashboard.png"
                  width={500}
                  height={500}
                  alt="linear demo image"
                  className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain"
                />
              </WobbleCard>
            </div>
          </div>

          {/* Customer Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our <span className="text-cyan-600">Customers Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what real businesses are
                saying about AvenPing.
              </p>
            </div>
            <InfiniteMovingCardsDemo />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
