import type { FinancialMovement } from "@/lib/financial-types";
import { formatCurrency } from "@/lib/financial-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IncomeListProps {
  incomes: FinancialMovement[];
  loading: boolean;
  error: string | null;
}

function formatMovementDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function IncomeList({ incomes, loading, error }: IncomeListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income movements</CardTitle>
        <CardDescription>Income by date and amount</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p role="status" className="text-sm text-muted-foreground">
            Loading income movements...
          </p>
        ) : error ? (
          <p role="alert" className="text-sm text-destructive-foreground">
            {error}
          </p>
        ) : incomes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No income movements found.</p>
        ) : (
          <div className="max-h-96 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-card text-muted-foreground">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">Date</th>
                  <th scope="col" className="px-3 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {incomes.map((income, index) => (
                  <tr key={`${income.create_date}-${index}`}>
                    <td className="px-3 py-2">
                      <time dateTime={income.create_date}>
                        {formatMovementDate(income.create_date)}
                      </time>
                    </td>
                    <td className="px-3 py-2 text-right font-medium tabular-nums">
                      {formatCurrency(income.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}