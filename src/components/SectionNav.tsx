import { useRef, useEffect } from "react";
import type { Section } from "@/hooks/use-section-tracker";

interface SectionNavProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export function SectionNav({ sections, activeSection, onSectionClick }: SectionNavProps) {
  const activeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeSection]);

  return (
    <div className="sticky top-12 z-40 bg-subnav border-b border-border shadow-sm">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide px-4 gap-0.5"
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => onSectionClick(section.id)}
              className={`
                relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors shrink-0
                ${isActive
                  ? "text-subnav-active"
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {section.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-subnav-indicator rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
