import Tag from "./ui/tag";
import shopifyIcon from "@/public/images/shopify.svg";
import woocommerceIcon from "@/public/images/woocommerce.svg";
import whatsappIcon from "@/public/images/whatsapp.svg";
import zapierIcon from "@/public/images/zapier.svg";
import googleSheetsIcon from "@/public/images/google_sheets.svg";
import avencrmIcon from "@/public/images/avencrm.svg";
import IntegrationColumn from "./ui/integration-column";

const integrations = [
  {
    name: "Shopify",
    icon: shopifyIcon,
    description:
      "Connect your Shopify store with WhatsApp for seamless order management.",
  },
  {
    name: "WooCommerce",
    icon: woocommerceIcon,
    description:
      "Integrate WooCommerce to handle customer inquiries and orders via WhatsApp.",
  },
  {
    name: "WhatsApp",
    icon: whatsappIcon,
    description:
      "Allow you agents to handle client inquiries and orders via there personal WhatsApp.",
  },
  {
    name: "Zapier",
    icon: zapierIcon,
    description: "Automate workflows by connecting AvenPing with 5000+ apps.",
  },
  {
    name: "Google Sheets",
    icon: googleSheetsIcon,
    description:
      "Export contacts and conversation data to Google Sheets automatically.",
  },
  {
    name: "CRM Systems",
    icon: avencrmIcon,
    description:
      "Sync customer data with popular CRM platforms like HubSpot and Salesforce.",
  },
];

export type IntegrationsType = typeof integrations;

export default function Integrations() {
  return (
    <section className="py-24 overflow-hidden bg-white">
      <div className="container max-w-6xl mx-auto p-[1rem] sm:p-[0rem]">
        <div className="grid lg:grid-cols-2 items-center lg:gap-16">
          <div>
            <Tag>Integrations</Tag>
            <h2 className="text-6xl font-medium mt-6 text-gray-900">
              Connects with your{" "}
              <span className="text-cyan-600">favorite tools</span>
            </h2>

            <p className="text-gray-600 mt-4 text-lg">
              AvenPing seamlessly integrates with your existing business tools
              and platforms. Connect your e-commerce store, CRM, and
              productivity apps to create a unified workflow.
            </p>
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-4 lg:h-[800px] h-[400px] lg:mt-0 mt-8 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
              <IntegrationColumn integrations={integrations} />
              <IntegrationColumn
                integrations={integrations.slice().reverse()}
                className="hidden md:flex"
                reverse
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
