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
        "w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6",
        fullHeight && "h-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}