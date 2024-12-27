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
        "w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8",
        fullHeight && "min-h-[calc(100vh-4rem)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}