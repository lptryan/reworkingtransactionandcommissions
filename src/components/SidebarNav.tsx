import { useState, useEffect } from "react";
import { CheckCircle, XCircle, ClipboardList, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Section } from "@/hooks/use-section-tracker";

interface SidebarNavProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function SidebarNav({ sections, activeSection, onSectionClick, onCollapsedChange }: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    onCollapsedChange?.(collapsed);
  }, [collapsed, onCollapsedChange]);

  return (
    <>
      {/* Mobile toggle - own row below TopNav, themed to match nav */}
      <div className="fixed top-12 left-0 right-0 z-50 lg:hidden h-10 bg-nav border-b border-border flex items-center px-2">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="h-8 w-8 rounded-md bg-nav-active/20 border border-nav-active/30 flex items-center justify-center text-nav-foreground hover:bg-nav-active/40 transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Overlay for mobile when open */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[5.5rem] lg:top-12 left-0 z-40 h-[calc(100vh-5.5rem)] lg:h-[calc(100vh-3rem)] bg-card border-r border-border
          flex flex-col transition-all duration-200 ease-in-out
          ${collapsed ? "-translate-x-full lg:translate-x-0 lg:w-12" : "translate-x-0 w-56"}
        `}
      >
        {/* Desktop collapse toggle */}
        <div className="hidden lg:flex items-center justify-end p-2 border-b border-border">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="h-7 w-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Intake Wizard */}
        <div className={`border-b border-border p-2 ${collapsed ? "flex flex-col items-center" : "flex flex-col items-center"}`}>
          {collapsed ? (
            <div className="group relative">
              <button className="h-8 w-8 rounded-md animate-pulse-blue text-primary-foreground flex items-center justify-center">
                <ClipboardList className="h-4 w-4" />
              </button>
              <span className="sidebar-tooltip group-hover:scale-100">Intake Wizard</span>
            </div>
          ) : (
            <div className="w-[95%]">
              <p className="text-[10px] font-bold text-destructive uppercase tracking-wide mb-1 px-1">Do this first!</p>
              <Button size="sm" className="w-full justify-start gap-1.5 animate-pulse-blue text-primary-foreground text-xs">
                <ClipboardList className="h-3.5 w-3.5" /> Intake Wizard
              </Button>
            </div>
          )}
        </div>

        {/* Section navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-2">
              Sections
            </p>
          )}
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return collapsed ? (
              <div key={s.id} className="group relative">
                <button
                  onClick={() => {
                    onSectionClick(s.id);
                    if (window.innerWidth < 1024) setCollapsed(true);
                  }}
                  style={{ fontSize: "0.9rem" }}
                  className={`
                    w-full text-left transition-all duration-200 flex items-center gap-2 font-bold
                    px-1.5 py-2 justify-center
                    ${isActive
                      ? "bg-muted text-foreground border-r-[3px] border-r-primary shadow-[inset_0_3px_6px_-2px_rgba(0,0,0,0.15),inset_0_-2px_4px_-2px_rgba(0,0,0,0.08)]"
                      : "text-primary hover:bg-primary hover:text-primary-foreground"
                    }
                  `}
                >
                  {s.icon && <s.icon className="h-3.5 w-3.5 shrink-0" />}
                </button>
                <span className="sidebar-tooltip group-hover:scale-100">{s.label}</span>
              </div>
            ) : (
              <button
                key={s.id}
                onClick={() => {
                  onSectionClick(s.id);
                  if (window.innerWidth < 1024) setCollapsed(true);
                }}
                style={{ fontSize: "0.9rem" }}
                className={`
                  w-full text-left transition-all duration-200 flex items-center gap-2 font-bold
                  px-3 py-2
                  ${isActive
                    ? "bg-muted text-foreground border-r-[3px] border-r-primary shadow-[inset_0_3px_6px_-2px_rgba(0,0,0,0.15),inset_0_-2px_4px_-2px_rgba(0,0,0,0.08)]"
                    : "text-primary hover:bg-primary hover:text-primary-foreground"
                  }
                `}
              >
                {s.icon && <s.icon className="h-3.5 w-3.5 shrink-0" />}
                <span>{s.label}</span>
              </button>
            );
          })}
          {/* Divider + action buttons */}
          <div className="mt-2 pt-2 px-1 mx-auto w-[95%]" style={{ boxShadow: "inset 0 2px 4px -2px hsl(var(--border)), inset 0 -2px 4px -2px hsl(var(--border))" }}>
            {collapsed ? (
              <div className="flex flex-col items-center gap-1.5 py-1">
                <div className="group relative">
                  <button className="h-8 w-8 rounded-md bg-status-approved text-primary-foreground flex items-center justify-center hover:bg-status-approved/90">
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <span className="sidebar-tooltip group-hover:scale-100">Confirm Closed</span>
                </div>
                <div className="group relative">
                  <button className="h-8 w-8 rounded-md border border-destructive text-destructive flex items-center justify-center hover:bg-destructive hover:text-primary-foreground">
                    <XCircle className="h-4 w-4" />
                  </button>
                  <span className="sidebar-tooltip group-hover:scale-100">Did Not Close</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 py-1">
                <Button size="sm" className="w-full justify-start gap-1.5 bg-status-approved text-primary-foreground hover:bg-status-approved/90 text-xs">
                  <CheckCircle className="h-3.5 w-3.5" /> Confirm Closed
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start gap-1.5 border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground text-xs">
                  <XCircle className="h-3.5 w-3.5" /> Did Not Close
                </Button>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
