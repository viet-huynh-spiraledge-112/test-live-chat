import { AIReviewTicketCard } from "@/components/AIReviewTicketCard";
import { Ticket } from "@/types/dashboard";
import { Clock } from "lucide-react";

interface YesterdayTicketsSectionProps {
  tickets: {
    ticket_id: string;
    title: string;
    status: string;
    improvements_count: number;
    ai_score: number;
  };
}

export function YesterdayTicketsSection({
  tickets,
}: YesterdayTicketsSectionProps) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-400" />
        Yesterday's Tickets & AI Review
      </h2>
      <div>
        <AIReviewTicketCard ticket={tickets} />
      </div>
    </div>
  );
}
