import { QuickStats, Ticket } from "@/types/dashboard";

export const quickStats: QuickStats = {
  completed: 2,
  storyPoints: 16,
  inProgress: 1,
  avgAiScore: 8.27
};

export const yesterdayTickets: Ticket[] = [
  {
    id: "DEV-1234",
    title: "Implement user authentication flow",
    status: "completed",
    storyPoints: 8,
    aiScore: 7.5,
    description: "Good implementation with some security and performance improvements needed",
  },
  {
    id: "DEV-1235",
    title: "Fix responsive layout issues on mobile",
    status: "completed",
    storyPoints: 5,
    aiScore: 9.2,
    description: "Excellent code quality with clean implementation and proper responsive design patterns",
  },
  {
    id: "DEV-1236",
    title: "Add error handling to API endpoints",
    status: "in progress",
    storyPoints: 3,
    aiScore: 8.1,
    description: "Well-structured error handling with comprehensive coverage",
  },
];

export const suggestedTickets: Ticket[] = [
  {
    id: "DEV-1237",
    title: "Implement password reset functionality",
    storyPoints: 5,
    status: "in progress",
    priority: "high priority",
    tags: ["authentication", "security"],
  },
  {
    id: "DEV-1238",
    title: "Add unit tests for auth components",
    storyPoints: 3,
    status: "in progress",
    priority: "medium priority",
    tags: ["testing", "authentication"],
  },
  {
    id: "DEV-1239",
    title: "Optimize database queries for user lookup",
    storyPoints: 8,
    status: "in progress",
    priority: "medium priority",
    tags: ["performance", "database"],
  },
  {
    id: "DEV-1240",
    title: "Update API documentation",
    storyPoints: 2,
    status: "in progress",
    priority: "low priority",
    tags: ["documentation"],
  },
]; 