import { Button } from "@/components/ui/button";
import { Ticket } from "@/types/dashboard";
import { ArrowRight, Send } from "lucide-react";
import { Badge } from "./ui/badge";

interface SuggestedTicketCardProps {
  ticket: {
    ticket_id: string;
    priority: string;
    title: string;
    labels: string[];
  };
}

export function SuggestedTicketCard({ ticket }: SuggestedTicketCardProps) {
  const getBadgeBgColor = () => {
    switch (ticket.priority) {
      case "high":
        return "bg-red-600 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{ticket.ticket_id}</span>
          {ticket.priority && (
            <Badge
              variant="default"
              className={`rounded-full ${getBadgeBgColor()}`}
            >
              {ticket.priority}
            </Badge>
          )}
        </div>
        <h3 className="text-sm text-gray-900">{ticket.title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {ticket.labels && ticket.labels.length > 0 && (
            <div className="flex gap-2">
              {ticket.labels.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ArrowRight className="w-4 h-4 text-gray-400" />
        <Button
          variant="default"
          size="sm"
          className="bg-black text-white hover:bg-gray-800 rounded"
        >
          <Send className="w-4 h-4" />
          Submit
        </Button>
      </div>
    </div>
  );
}
