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
        "flex-1 overflow-y-auto pb-16 md:pb-6",
        fullHeight && "min-h-full",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-3xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
        {children}
      </div>
    </div>
  );
}