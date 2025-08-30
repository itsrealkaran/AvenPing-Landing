"use client";

import Tag from "@/components/ui/tag";
import Button from "@/components/ui/button2";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
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
    description: "Perfect for small businesses getting started",
    features: [
      "Service Conversations - Unlimited",
      "QR Generator",
      "WhatsApp Button Generator",
      "Profile Manager",
      "Contacts - 1,500",
      "Labels - 10",
      "Attributes - 3",
      "Templates - Unlimited",
      "Phone Numbers - Unlimited",
      "Campaigns - 2,500 recipients",
    ],
    popular: false,
  },
  {
    name: "Premium",
    monthly: { India: "₹3,599", Asia: "$44", Global: "$71" },
    yearly: { India: "₹2,999", Asia: "$36", Global: "$59" },
    period: "per month",
    description: "Ideal for growing businesses and small teams",
    features: [
      "Service Conversations - Unlimited",
      "QR Generator",
      "WhatsApp Button Generator",
      "Profile Manager",
      "Contacts - 3,000",
      "Labels - 10",
      "Attributes - 5",
      "Templates - Unlimited",
      "Phone Numbers - Unlimited",
      "Campaigns - Unlimited",
      "WhatsApp Green Tick Application",
      "Flow Builder - 3 Flows",
      "Analytics",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: { India: "₹5,999", Asia: "$72", Global: "$95" },
    yearly: { India: "₹4,999", Asia: "$60", Global: "$79" },
    period: "per month",
    description: "For large organizations with complex needs",
    features: [
      "Service Conversations - Unlimited",
      "QR Generator",
      "WhatsApp Button Generator",
      "Profile Manager",
      "Contacts - 6,000",
      "Labels - 10",
      "Attributes - 10",
      "Templates - Unlimited",
      "Phone Numbers - Unlimited",
      "Campaigns - Unlimited",
      "WhatsApp Green Tick Application",
      "Flow Builder - 5 Flows",
      "Analytics",
      "AI Chat Bot",
      "Campaign Analytics",
      "Scheduled Campaigns",
      "Priority Support",
      "Mobile App",
    ],
    popular: false,
  },
];

export default function Pricing() {
  // Use a single state to control expansion for all cards
  const [allExpanded, setAllExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRegion, setUserRegion] = useState<Region>("global");
  const [isYearly, setIsYearly] = useState(true);

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

  // Get region config for currency display
  const regionConfig = getRegionConfig(userRegion);

  // Handler to toggle all cards' expanded state
  const handleToggleAll = () => {
    setAllExpanded((prev) => !prev);
  };

  return (
    <section className="py-24 bg-gray-100 ">
      <div className="container max-w-6xl mx-auto p-[1rem] sm:p-[0rem]">
        <div className="flex justify-center">
          <Tag>Pricing</Tag>
        </div>
        <h2 className="text-6xl font-medium text-center mt-6 max-w-2xl mx-auto text-gray-900">
          Choose the perfect <span className="text-cyan-600">plan</span> for
          your business
        </h2>
        <p className="text-center text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
          Simple, transparent pricing that grows with you. Start free and
          upgrade as your business expands.
        </p>

        {/* Monthly/Yearly Toggle */}
        <div className="flex justify-center mt-8">
          <div className="bg-white rounded-full p-1 shadow-sm border">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !isYearly
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isYearly
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const initialFeatures = plan.features.slice(0, 5);
            const additionalFeatures = plan.features.slice(5);
            const hasMoreFeatures = additionalFeatures.length > 0;
            const isExpanded = allExpanded;

            return (
              <div
                key={plan.name}
                className={`bg-white rounded-3xl p-8 shadow-sm border-2 transition-all duration-300 hover:shadow-lg flex flex-col h-full ${
                  plan.popular
                    ? "border-cyan-500 relative"
                    : "border-gray-200 hover:border-cyan-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                      </div>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-gray-900">
                          {getPrice(plan)}
                        </span>
                        <span className="text-gray-600 ml-2">
                          {plan.period}
                        </span>
                        <div className="text-xs text-cyan-600 mt-1">
                          Prices in {regionConfig.currency}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
                    {initialFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check
                          size={20}
                          className="text-cyan-500 mr-3 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="-mt-4 space-y-4 pt-4">
                        {additionalFeatures.map((feature, featureIndex) => (
                          <li
                            key={`additional-${featureIndex}`}
                            className="flex items-start"
                          >
                            <Check
                              size={20}
                              className="text-cyan-500 mr-3 mt-0.5 flex-shrink-0"
                            />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </div>
                    </div>
                  </ul>

                  {hasMoreFeatures && (
                    <button
                      onClick={handleToggleAll}
                      className="flex items-center justify-center w-full -mt-0 text-cyan-600 hover:text-cyan-700 font-medium py-4 transition-colors duration-200"
                    >
                      <span className="mr-1 text-sm">
                        {isExpanded
                          ? "View Less"
                          : `View More (${additionalFeatures.length})`}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  )}
                </div>

                <div className="space-y-3 mt-auto">
                  <Button
                    onClick={() => {
                      window.location.href = "https://app.avenping.com/signup";
                    }}
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full h-12 text-lg"
                  >
                    Get Started
                  </Button>
                  <Link href="/pricing" className="block">
                    <button className="w-full text-cyan-600 hover:text-cyan-700 font-medium py-2">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We're here to help.
          </p>
          <Button
            variant="secondary"
            className="px-8 h-12 text-lg flex items-center gap-2 justify-center mx-auto"
            onClick={() => {
              const subject = encodeURIComponent(
                "Custom Solution Inquiry - AvenPing Pricing"
              );
              const body = encodeURIComponent(`
Dear AvenPing Sales Team,

I am interested in learning more about custom solutions for my business. I would like to discuss:

- My business requirements and scale
- Custom pricing options
- Enterprise features and capabilities
- Implementation timeline
- Support and onboarding process

Please contact me to schedule a consultation.

Best regards,
[Your Name]
[Your Company]
[Your Email]
[Your Phone Number]
[Your Business Size/Industry]
              `);
              window.location.href = `mailto:sales@avenping.com?subject=${subject}&body=${body}`;
            }}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
