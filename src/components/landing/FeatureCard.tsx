interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-8 text-center bg-white shadow-lg border-0 rounded-3xl">
    <div className="text-4xl mb-6 flex justify-center">
      <div className="w-16 h-16 rounded-2xl bg-duo-50 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
);