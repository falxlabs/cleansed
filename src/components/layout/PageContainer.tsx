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
        "page-container min-h-[100dvh] pb-24 md:pb-8",
        fullHeight && "flex flex-col",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1">
        {children}
      </div>
    </div>
  );
}