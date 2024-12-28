import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullHeight?: boolean;
}

export function PageContainer({ 
  children, 
  fullHeight = false,
  className,
  ...props 
}: PageContainerProps) {
  return (
    <div 
      className={cn(
        "flex-1 overflow-y-auto pb-20 md:pb-8",
        fullHeight && "min-h-[calc(100dvh-5rem)]",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {children}
      </div>
    </div>
  );
}