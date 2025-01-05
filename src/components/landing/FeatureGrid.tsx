import { FeatureCard, FeatureCardProps } from "./FeatureCard";

interface FeatureGridProps {
  features: FeatureCardProps[];
}

export const FeatureGrid = ({ features }: FeatureGridProps) => (
  <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
    {features.map((feature, index) => (
      <FeatureCard key={index} {...feature} />
    ))}
  </div>
);