import { Card, CardContent } from "@/components/ui/card";
import { QuickStats as QuickStatsType } from "@/types/dashboard";

interface QuickStatsProps {
  stats: {
    completed: number;
    storyPoints: number;
    inProgress: number;
    avgAiScore: number;
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-100 p-6 rounded">
        <div className="text-center">
          <div className="text-2xl font-semibold text-green-600">
            {stats.completed}
          </div>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded">
        <div className="text-center">
          <div className="text-2xl font-semibold text-blue-500">
            {stats.storyPoints}
          </div>
          <p className="text-sm text-gray-500">Story Points</p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded">
        <div className="text-center">
          <div className="text-2xl font-semibold text-orange-500">
            {stats.inProgress}
          </div>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded">
        <div className="text-center">
          <div className="text-2xl font-semibold text-purple-500">
            {stats.avgAiScore}
          </div>
          <p className="text-sm text-gray-500">Avg AI Score</p>
        </div>
      </div>
    </div>
  );
}
