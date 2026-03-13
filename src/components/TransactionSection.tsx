import { ReactNode } from "react";

interface TransactionSectionProps {
  id: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export function TransactionSection({ id, title, children, action }: TransactionSectionProps) {
  return (
    <section id={id} className="scroll-mt-[7rem] mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
