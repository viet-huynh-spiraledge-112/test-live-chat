import { Ticket } from "@/types/dashboard";
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Brain,
  ExternalLinkIcon,
  Settings2,
  Settings,
  Loader2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import ticketApi from "@/api/ticket-api";
import { CodeCard } from "./CodeCard";

interface AIReviewTicketCardProps {
  ticket: {
    ticket_id: string;
    title: string;
    status: string;
    improvements_count: number;
    ai_score: number;
  };
}

export function AIReviewTicketCard({ ticket }: AIReviewTicketCardProps) {
  const getTextColor = () => {
    switch (ticket.status) {
      case "completed":
        return "text-green-500";
      case "in progress":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const [previewList, setPreviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPreviewList = async () => {
      try {
        const res = await ticketApi.getPreviewList();
        setPreviewList(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreviewList();
  }, []);

  return (
    <div className="mb-4 p-5 rounded bg-blue-50">
      <div className="flex items-start justify-between pb-6">
        <div className="flex items-center gap-4">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                {ticket.ticket_id}
              </span>
              {ticket.status === "completed" && (
                <Badge variant="default" className="rounded-full">
                  completed
                </Badge>
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-700">
              {ticket.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center gap-2 text-black">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-semibold">AI Review</span>
          </div>
          <span className={`text-sm font-semibold ${getTextColor()}`}>
            {ticket.ai_score ? ticket.ai_score : "7"}/10
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              View Improvements
              <ExternalLinkIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle asChild>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Code Improvements for {ticket.ticket_id}
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
            {isLoading ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {previewList.map((item: any) => (
                  <CodeCard key={item.id} codeSug={item} />
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
