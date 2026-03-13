import { Card, CardContent } from "@/components/ui/card";

function CommissionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

export function CommissionWidget() {
  return (
    <Card>
      <div className="bg-primary rounded-t-lg px-4 py-3 flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary-foreground">Commission</h3>
        <button className="text-sm text-primary-foreground/80 underline hover:text-primary-foreground">View Rev Share</button>
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-border">
          <CommissionStat label="Commission Percentage" value="3%" />
          <CommissionStat label="Commission Amount" value="$9,300.00" />
        </div>
        <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
          <CommissionStat label="Brokerage Commission" value="$2,325.00" />
          <CommissionStat label="Check Payment Amount" value="$0.00" />
        </div>
        <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
          <CommissionStat label="Direct Payment Amount" value="$0.00" />
          <CommissionStat label="Commission Paid At" value="--/--/-----" />
        </div>
      </CardContent>
    </Card>
  );
}

export function RevShareWidget() {
  return (
    <Card>
      <div className="bg-primary rounded-t-lg px-4 py-3 flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary-foreground">Rev Share</h3>
        <button className="text-sm text-primary-foreground/80 underline hover:text-primary-foreground">View Commission</button>
      </div>
      <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground text-sm font-medium">Not Applicable</p>
      </CardContent>
    </Card>
  );
}
