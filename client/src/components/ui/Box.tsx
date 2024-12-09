import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import { cn } from "../../utils/utils";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for Riders and Drivers",
      description:
        "Built for seamless transportation. Whether you're looking for a ride or providing one, Glide is here to connect you with ease.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ease of use",
      description:
        "Booking a ride is as simple as tapping a button. Glide gets you moving with zero hassle, anytime, anywhere.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Affordable Rides, Transparent Pricing",
      description:
        "Our fares are competitive, clear, and fair. No hidden charges, no surprises – just rides you can count on.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Always Reliable (100% Uptime)",
      description:
        "Glide is built to be available 24/7. Our app ensures you’re always connected, even when others aren’t.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-User Support",
      description:
        "Riders, drivers, or fleet managers – Glide’s platform is designed to accommodate everyone effortlessly.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Questions? Issues? Our dedicated support team is available round the clock to ensure your journey is smooth.",
      icon: <IconHelp />,
    },
    {
      title: "Ride Satisfaction Guaranteed",
      description:
        "If you're not satisfied with your ride, we’ll make it right – because your trust and comfort matter most.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "And More Features",
      description:
        "From real-time tracking to flexible payment options, Glide is packed with features to redefine your travel experience.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
