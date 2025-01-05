import { Card } from "@/components/ui/card";

export interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

export const FeatureCard = ({ emoji, title, description }: FeatureCardProps) => (
  <Card className="p-3 sm:p-4 text-center bg-white/90">
    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{emoji}</div>
    <h3 className="text-base font-bold mb-1.5 text-center">{title}</h3>
    <p className="text-sm text-gray-600 text-center">{description}</p>
  </Card>
);