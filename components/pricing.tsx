"use client";

import Tag from "@/components/ui/tag";
import Button from "@/components/ui/button2";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { convertPrice, initializeCurrency, type PriceData } from "@/lib/currency-utils";

const plans = [
  {
    name: "Basic",
    price: "$35",
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
    price: "$71",
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
      "Catalogue",
      "Flow Builder - 3 Flows",
      "Analytics",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$95",
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
      "Catalogue",
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
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});
  const [convertedPrices, setConvertedPrices] = useState<{ [key: string]: PriceData }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrency, setUserCurrency] = useState<string>('USD');

  const toggleExpanded = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Initialize currency conversion
  useEffect(() => {
    async function setupCurrency() {
      try {
        setIsLoading(true);
        const currencyData = await initializeCurrency();
        setUserCurrency(currencyData.currency);

        // Convert all prices
        const priceMap: { [key: string]: PriceData } = {};
        for (const plan of plans) {
          const usdPrice = parseInt(plan.price.replace('$', ''));
          const converted = await convertPrice(usdPrice, currencyData.currency);
          priceMap[plan.name] = converted;
        }
        setConvertedPrices(priceMap);
      } catch (error) {
        console.error('Error setting up currency:', error);
        // Fallback to USD
        const priceMap: { [key: string]: PriceData } = {};
        for (const plan of plans) {
          priceMap[plan.name] = {
            amount: plan.price,
            currency: 'USD',
            symbol: '$'
          };
        }
        setConvertedPrices(priceMap);
      } finally {
        setIsLoading(false);
      }
    }

    setupCurrency();
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const initialFeatures = plan.features.slice(0, 5);
            const additionalFeatures = plan.features.slice(5);
            const hasMoreFeatures = additionalFeatures.length > 0;
            const isExpanded = expandedCards[index];

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
                          {convertedPrices[plan.name]?.amount || plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">{plan.period}</span>
                        {userCurrency !== 'USD' && (
                          <div className="text-xs text-cyan-600 mt-1">
                            Prices in {userCurrency}
                          </div>
                        )}
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
                      onClick={() => toggleExpanded(index)}
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
          <Button variant="secondary" className="px-8">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
