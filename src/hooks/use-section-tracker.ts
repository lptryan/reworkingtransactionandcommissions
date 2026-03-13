import { useState, useEffect, useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";

export interface Section {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export function useSectionTracker(sections: Section[]) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    isScrollingRef.current = true;
    setActiveSection(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  return { activeSection, scrollTo };
}
