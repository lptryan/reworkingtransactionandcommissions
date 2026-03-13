import { TopNav } from "@/components/TopNav";
import { SectionNav } from "@/components/SectionNav";
import { TransactionSection } from "@/components/TransactionSection";
import { TransactionStatus } from "@/components/TransactionStatus";
import { CommissionWidget, RevShareWidget } from "@/components/CommissionWidget";
import { ConditionsSection } from "@/components/ConditionsSection";
import { DocumentsSection } from "@/components/DocumentsSection";
import { FloatingActions } from "@/components/FloatingActions";
import { useSectionTracker, type Section } from "@/hooks/use-section-tracker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, FileText, CheckCircle, Clock, AlertCircle, Plus, ChevronRight } from "lucide-react";

const sections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "commission", label: "Commission" },
  { id: "conditions", label: "Conditions" },
  { id: "documents", label: "Documents" },
  { id: "clients", label: "Clients" },
  { id: "parties", label: "Parties" },
  { id: "receivables", label: "Receivables" },
  { id: "payables", label: "Payables" },
  { id: "trade-record", label: "Trade Record" },
  { id: "notes", label: "Notes" },
];

function StatCard({ label, value, sub, status }: { label: string; value: string; sub?: string; status?: "pending" | "approved" }) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      {status && (
        <span className={`inline-flex items-center gap-1 mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
          status === "approved" ? "bg-status-approved/10 text-status-approved" : "bg-status-pending/10 text-status-pending"
        }`}>
          {status === "approved" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          {status === "approved" ? "Approved" : "Pending"}
        </span>
      )}
    </div>
  );
}

function PersonCard({ name, role, email, phone }: { name: string; role?: string; email?: string; phone?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
        {(email || phone) && (
          <div className="mt-3 space-y-1">
            {email && (
              <a href={`mailto:${email}`} className="text-xs text-primary underline flex items-center gap-1.5 hover:text-primary/80">
                <Mail className="h-3 w-3" /> {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="text-xs text-primary underline flex items-center gap-1.5 hover:text-primary/80">
                <Phone className="h-3 w-3" /> {phone}
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DocumentRow({ name, status, date }: { name: string; status: "received" | "pending" | "missing"; date?: string }) {
  const statusConfig = {
    received: { color: "bg-status-approved/10 text-status-approved", icon: CheckCircle, label: "Received" },
    pending: { color: "bg-status-pending/10 text-status-pending", icon: Clock, label: "Pending" },
    missing: { color: "bg-destructive/10 text-destructive", icon: AlertCircle, label: "Missing" },
  };
  const cfg = statusConfig[status];
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        {date && <span className="text-xs text-muted-foreground">{date}</span>}
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>
          <cfg.icon className="h-3 w-3" /> {cfg.label}
        </span>
      </div>
    </div>
  );
}

function PayableTable({ title, rows }: { title: string; rows: { desc: string; deduction: string; amount: string }[] }) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-3">{title}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-muted-foreground font-medium pb-2">Description</th>
                <th className="text-right text-muted-foreground font-medium pb-2">Deduction</th>
                <th className="text-right text-muted-foreground font-medium pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-2 text-foreground">{r.desc}</td>
                  <td className="py-2 text-right text-muted-foreground">{r.deduction}</td>
                  <td className="py-2 text-right text-foreground font-medium">{r.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary/5">
                <td className="py-2 font-semibold text-foreground">Total</td>
                <td></td>
                <td className="py-2 text-right font-bold text-primary">
                  ${rows.reduce((s, r) => s + parseFloat(r.amount.replace(/[,$]/g, "")), 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

const Index = () => {
  const { activeSection, scrollTo } = useSectionTracker(sections);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <SectionNav sections={sections} activeSection={activeSection} onSectionClick={scrollTo} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Transaction & Commission</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <MapPin className="h-3.5 w-3.5" /> 4 Kelly St, San Antonio, TX 78223
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-status-pending/10 text-status-pending border-status-pending/20">Pending</Badge>
              <Badge variant="outline" className="bg-status-info/10 text-status-info border-status-info/20">In Progress</Badge>
            </div>
          </div>
        </div>

        {/* Transaction Status Banner */}
        <TransactionStatus />

        {/* Overview */}
        <TransactionSection id="overview" title="Overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="List Price" value="$125,000.00" status="pending" />
            <StatCard label="Contract Price" value="$80,000.00" status="approved" />
            <StatCard label="Commission" value="$2,400.00" sub="3% of contract price" />
            <StatCard label="Close Date" value="03/12/2026" sub="Estimated" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <StatCard label="Company Split" value="$572.00" />
            <StatCard label="Agent Split" value="$0.00" />
            <StatCard label="Listing Date" value="01/11/2026" />
            <StatCard label="Expiration" value="03/12/2026" />
          </div>
        </TransactionSection>

        {/* Commission & Rev Share */}
        <TransactionSection id="commission" title="Commission & Rev Share">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommissionWidget />
            <RevShareWidget />
          </div>
        </TransactionSection>

        {/* Conditions */}
        <TransactionSection id="conditions" title="Conditions">
          <ConditionsSection />
        </TransactionSection>

        {/* Documents */}
        <TransactionSection
          id="documents"
          title="Documents"
          action={<Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/80"><Plus className="h-3.5 w-3.5" /> Upload</Button>}
        >
          <DocumentsSection />
        </TransactionSection>

        {/* Clients */}
        <TransactionSection
          id="clients"
          title="Clients"
          action={<Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/80"><Plus className="h-3.5 w-3.5" /> New Client</Button>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PersonCard name="Rafael Hernandez III" role="Buyer" email="rafael@email.com" phone="(555) 234-5678" />
            <PersonCard name="Kenneth Pruski ETAL" role="Seller" email="kenneth@email.com" phone="(555) 345-6789" />
          </div>
        </TransactionSection>

        {/* Parties */}
        <TransactionSection
          id="parties"
          title="Parties"
          action={<Button size="sm" variant="outline" className="gap-1"><Plus className="h-3.5 w-3.5" /> Add Party</Button>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PersonCard name="LPT Realty" role="Listing Brokerage" email="info@lptrealty.com" />
            <PersonCard name="Maria Neill" role="Listing Agent" email="maria@lptrealty.com" phone="(555) 456-7890" />
            <PersonCard name="Shar Collar" role="Transaction Coordinator" email="shar@email.com" />
            <PersonCard name="Kenneth Pruski" role="Seller's Attorney" email="kpruski@law.com" />
            <PersonCard name="Ryse Realty" role="Cooperating Brokerage" email="info@ryserealty.com" />
            <PersonCard name="Gina Neill" role="Buyer's Agent" email="gina@ryserealty.com" />
            <PersonCard name="Midnight Title - Lisa Azar" role="Title Company" email="lisa@midnighttitle.com" />
          </div>
        </TransactionSection>

        {/* Receivables */}
        <TransactionSection id="receivables" title="Receivables">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-foreground">LPT Realty Commission Receivable</span>
                <span className="text-sm font-bold text-foreground">$2,400.00</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-muted-foreground">Total Receivables</span>
                <span className="text-sm font-bold text-primary">$2,400.00</span>
              </div>
            </CardContent>
          </Card>
        </TransactionSection>

        {/* Payables */}
        <TransactionSection id="payables" title="Payables">
          <PayableTable
            title="Commission Payable to Maria Neill"
            rows={[
              { desc: "Agent commission - Maria Neill", deduction: "", amount: "1,200.00" },
              { desc: "E&O Insurance (quarterly)", deduction: "$65.00", amount: "1,135.00" },
              { desc: "Tech Fee - Transaction Mgmt", deduction: "$49.00", amount: "1,086.00" },
            ]}
          />
          <PayableTable
            title="Commission Payable to Robert Moats"
            rows={[
              { desc: "Agent commission - Robert Moats", deduction: "", amount: "600.00" },
              { desc: "E&O Insurance (quarterly)", deduction: "$32.50", amount: "567.50" },
            ]}
          />
          <PayableTable
            title="Commission Payable to David Lewis"
            rows={[
              { desc: "Agent commission - David Lewis", deduction: "", amount: "600.00" },
              { desc: "E&O Insurance (quarterly)", deduction: "$32.50", amount: "567.50" },
              { desc: "Desk fee - Office Suite", deduction: "$175.00", amount: "392.50" },
              { desc: "Marketing fund contribution", deduction: "$50.00", amount: "342.50" },
            ]}
          />
        </TransactionSection>

        {/* Trade Record */}
        <TransactionSection
          id="trade-record"
          title="Trade Record"
          action={<Button size="sm" className="gap-1 bg-status-approved text-primary-foreground hover:bg-status-approved/90">Ready to Submit Trade Record</Button>}
        >
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">No trade record has been submitted yet. Complete all required fields and documents before submitting.</p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p className="text-2xl font-bold text-foreground">6</p>
                  <p className="text-xs text-muted-foreground">Documents</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p className="text-2xl font-bold text-status-approved">2</p>
                  <p className="text-xs text-muted-foreground">Received</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p className="text-2xl font-bold text-status-pending">2</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p className="text-2xl font-bold text-destructive">2</p>
                  <p className="text-xs text-muted-foreground">Missing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TransactionSection>

        {/* Notes */}
        <TransactionSection
          id="notes"
          title="Notes"
          action={<Button size="sm" variant="outline" className="gap-1"><Plus className="h-3.5 w-3.5" /> Add Note</Button>}
        >
          <Card>
            <CardContent className="p-4 space-y-4">
              {[
                { date: "03/12/2026", author: "Maria Neill", text: "Spoke with buyer's agent regarding inspection timeline. Agreed to extend by 5 days." },
                { date: "03/10/2026", author: "Shar Collar", text: "Title commitment received from Midnight Title. Reviewing for any issues." },
                { date: "03/05/2026", author: "Maria Neill", text: "Property showing completed. Buyer expressed strong interest. Awaiting formal offer." },
              ].map((note, i) => (
                <div key={i} className={`${i > 0 ? "border-t border-border pt-4" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary">{note.author}</span>
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <p className="text-sm text-foreground">{note.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TransactionSection>

        <div className="h-20" />
      </main>

      <FloatingActions />
    </div>
  );
};

export default Index;
