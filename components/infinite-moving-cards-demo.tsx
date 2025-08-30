"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "AvenPing has completely transformed how we handle customer communications in real estate. Our response time improved by 300% and client satisfaction is at an all-time high.",
    name: "David Allen",
    title: "Recruiter, eXp Realty",
  },
  {
    quote:
      "AvenPing's onboarding process was seamless and intuitive. Our team was up and running in no time, and the support resources made the transition effortless.",
    name: "Wasim Menon",
    title: "Operations Manager, DreamLaunch",
  },
  {
    quote:
      "What impressed me most is the seamless integration with our existing CRM. AvenPing made it so easy to centralize all our customer data in one place.",
    name: "Shashila",
    title: "Marketing Director, Ask Maestro",
  },
  {
    quote:
      "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions about our customer engagement strategy across all our global operations.",
    name: "Jagjeet Singh",
    title: "Senior Realtor, eXp Global",
  },
  {
    quote:
      "The automation features are incredible. We can now handle thousands of WhatsApp messages without missing a single customer inquiry. It's been a game-changer for our restaurant business.",
    name: "Harinder Singh",
    title: "Managing Director, Dear Mom",
  },
  {
    quote:
      "The WhatsApp Business integration has revolutionized our customer service. We can now provide instant support and build stronger relationships with our clients.",
    name: "Zain Humayoun",
    title: "CEO, ZHI Real Estate LLC.",
  },
  {
    quote:
      "AvenPing's scalability is perfect for our growing business. We started small and now handle enterprise-level customer communications effortlessly.",
    name: "Vibhansh",
    title: "Founder, ArdacityUI",
  },
];
