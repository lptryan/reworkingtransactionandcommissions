import { useState } from "react";
import { CheckCircle, XCircle, ClipboardList, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Section } from "@/hooks/use-section-tracker";

interface SidebarNavProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export function SidebarNav({ sections, activeSection, onSectionClick }: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="fixed top-14 left-2 z-50 lg:hidden h-8 w-8 rounded-md bg-card border border-border shadow flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </button>

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
          fixed top-12 left-0 z-40 h-[calc(100vh-3rem)] bg-card border-r border-border
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
        <div className={`border-b border-border p-2 ${collapsed ? "flex justify-center" : ""}`}>
          {collapsed ? (
            <button title="Intake Wizard" className="h-8 w-8 rounded-md animate-pulse-blue text-primary-foreground flex items-center justify-center">
              <ClipboardList className="h-4 w-4" />
            </button>
          ) : (
            <Button size="sm" className="w-full justify-start gap-1.5 animate-pulse-blue text-primary-foreground text-xs">
              <ClipboardList className="h-3.5 w-3.5" /> Intake Wizard
            </Button>
          )}
        </div>

        {/* Section navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-1.5">
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-2 mb-2">
              Sections
            </p>
          )}
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSectionClick(s.id);
                  if (window.innerWidth < 1024) setCollapsed(true);
                }}
                title={collapsed ? s.label : undefined}
                className={`
                  w-full text-left text-xs rounded-md transition-colors mb-0.5 flex items-center gap-2
                  ${collapsed ? "px-1.5 py-2 justify-center" : "px-2.5 py-2"}
                  ${isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-primary hover:bg-muted"
                  }
                `}
              >
                {s.icon && <s.icon className="h-3.5 w-3.5 shrink-0" />}
                {!collapsed && <span>{s.label}</span>}
              </button>
            );
          })}
          {/* Divider + action buttons */}
          <div className="border-t border-border mt-2 pt-2 mx-1">
            {collapsed ? (
              <div className="flex flex-col items-center gap-1.5">
                <button title="Confirm Closed" className="h-8 w-8 rounded-md bg-status-approved text-primary-foreground flex items-center justify-center hover:bg-status-approved/90">
                  <CheckCircle className="h-4 w-4" />
                </button>
                <button title="Did Not Close" className="h-8 w-8 rounded-md border border-destructive text-destructive flex items-center justify-center hover:bg-destructive hover:text-primary-foreground">
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
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
