import { SuggestedTicketCard } from "@/components/SuggestedTicketCard";
import { Ticket } from "@/types/dashboard";
import { HelpCircle } from "lucide-react";

interface SuggestedTicketsSectionProps {
  tickets: Array<{
    ticket_id: string;
    priority: string;
    title: string;
    labels: string[];
  }>;
}

export function SuggestedTicketsSection({
  tickets,
}: SuggestedTicketsSectionProps) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-gray-400" />
        Suggested Related Tickets
      </h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <SuggestedTicketCard key={ticket.ticket_id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
