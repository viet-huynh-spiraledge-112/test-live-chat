"use client";

import { suggestedTickets } from "@/data/mockData";
import { QuickStatsSection } from "@/components/sections/QuickStatsSection";
import { YesterdayTicketsSection } from "@/components/sections/YesterdayTicketsSection";
import { SuggestedTicketsSection } from "@/components/sections/SuggestedTicketsSection";
import { useEffect, useState } from "react";
import ticketApi from "@/api/ticket-api";
import { QuickStats } from "@/types/dashboard";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<QuickStats>({
    completed: 0,
    storyPoints: 0,
    inProgress: 0,
    avgAiScore: 0,
  });
  const [yesterdayTickets, setYesterdayTickets] = useState<{
    ticket_id: string;
    title: string;
    status: string;
    improvements_count: number;
    ai_score: number;
  }>({
    ticket_id: "",
    title: "",
    status: "",
    improvements_count: 0,
    ai_score: 0,
  });

  const [suggestedTickets, setSuggestedTickets] = useState<
    Array<{
      ticket_id: string;
      priority: string;
      title: string;
      labels: string[];
    }>
  >([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchTickets = async () => {
      try {
        const res = await ticketApi.getTickets();
        setStats({
          completed: res[0].quick_stats.completed_count,
          storyPoints: 16,
          inProgress: res[0].quick_stats.in_progress,
          avgAiScore: res[0].quick_stats.avg_ai_score,
        });
        setYesterdayTickets(res[0].completed_ticket);
        setSuggestedTickets(res[0].today_tickets);
      } catch {
        console.log("Error fetching tickets");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">
          Daily Code Review Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <QuickStatsSection stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <YesterdayTicketsSection tickets={yesterdayTickets} />
        <SuggestedTicketsSection tickets={suggestedTickets} />
      </div>
    </div>
  );
}
