import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4 w-full",
                className
            )}
        >
            {children}
        </div >
    );
}

interface BentoGridItemProps {
    children: ReactNode;
    className?: string;
    colSpan?: number;
}

export function BentoGridItem({ children, className, colSpan = 1 }: BentoGridItemProps) {
    return (
        <div className={cn(
            "h-full",
            colSpan === 2 && "md:col-span-2",
            colSpan === 3 && "md:col-span-3", // Full width
            className
        )}>
            {children}
        </div>
    )
}
