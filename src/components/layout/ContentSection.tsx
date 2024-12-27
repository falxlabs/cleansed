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
        "space-y-6 py-6 md:py-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}