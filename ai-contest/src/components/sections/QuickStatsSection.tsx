import { QuickStats } from "@/components/QuickStats";
import { QuickStats as QuickStatsType } from "@/types/dashboard";

interface QuickStatsSectionProps {
  stats: QuickStatsType;
}

export function QuickStatsSection({ stats }: QuickStatsSectionProps) {
  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
      <QuickStats stats={stats} />
    </div>
  );
}
