import { Card } from "@/components/ui/card";

export const WelcomeCard = () => (
  <Card className="p-3 sm:p-4 md:p-6 bg-white/80 backdrop-blur shadow-xl">
    <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-duo-100 flex items-center justify-center shrink-0">
        <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce">🕊️</span>
      </div>
      <div className="flex-1 space-y-2 sm:space-y-3 text-center md:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          Hi there, I'm Grace.
        </h2>
        <p className="text-sm sm:text-base text-gray-700">
          Your companion in overcoming daily temptations through Christ.
        </p>
      </div>
    </div>
  </Card>
);