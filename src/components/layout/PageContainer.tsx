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
        "w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6",
        "overflow-y-auto scrollbar-none",
        fullHeight && "h-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}