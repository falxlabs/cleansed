import { cn } from "@/lib/utils";

interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContentSection({ 
  children, 
  className,
  ...props 
}: ContentSectionProps) {
  return (
    <section 
      className={cn(
        "space-y-6 sm:space-y-8 md:space-y-10",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}