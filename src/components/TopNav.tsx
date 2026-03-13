import { Home, Users, FileText, Calendar, Settings, Bell, Search, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Users, label: "Contacts" },
  { icon: FileText, label: "Transactions" },
  { icon: Calendar, label: "Calendar" },
  { icon: Settings, label: "Settings" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-nav border-b border-nav-active/20">
      <div className="flex items-center justify-between px-4 h-12">
        <div className="flex items-center gap-1">
          <span className="text-nav-foreground font-bold text-lg tracking-tight mr-6">
            demo<span className="text-nav-active">CRM</span>
          </span>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-nav-foreground/70 hover:text-nav-foreground hover:bg-nav-active/10 transition-colors text-sm"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-nav-foreground/60 hover:text-nav-foreground transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button className="text-nav-foreground/60 hover:text-nav-foreground transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <div className="h-7 w-7 rounded-full bg-nav-active/30 flex items-center justify-center">
            <User className="h-4 w-4 text-nav-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
