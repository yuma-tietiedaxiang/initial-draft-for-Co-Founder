import React, { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Proposal {
  id: string;
  name: string;
  date: Date;
  type: "submitted" | "upcoming" | "deadline";
  match?: number;
  status: "pending" | "approved" | "rejected" | "draft" | "registered";
  eventType?: string;
  location?: string;
  cost?: string;
}

// Helper functions for date formatting
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatMonth = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const addMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const subMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
};

// Convert EventRegistration data to calendar format
const matchedEvents = [
  {
    id: 1,
    name: "TechCrunch Disrupt 2024",
    type: "Conference",
    location: "San Francisco, CA",
    date: "2024-03-15",
    deadline: "2024-02-01",
    description:
      "The premier startup conference featuring top entrepreneurs, investors, and tech leaders",
    matchScore: 95,
    eligibility: {
      stage: "Series A & below",
      industry: "Technology",
      revenue: "Any",
      location: "Global",
    },
    benefits: [
      "Networking with 10,000+ attendees",
      "Pitch competition ($100K prize)",
      "Media exposure",
      "Investor meetings",
    ],
    registrationStatus: "available",
    cost: "$2,995",
    autoFillReady: true,
    aiInsights:
      "Perfect fit for your AI/SaaS startup. High networking value and investor presence.",
  },
  {
    id: 2,
    name: "Y Combinator Demo Day",
    type: "Accelerator",
    location: "Mountain View, CA",
    date: "2024-04-20",
    deadline: "2024-01-15",
    description: "Exclusive demo day for YC alumni and portfolio companies",
    matchScore: 88,
    eligibility: {
      stage: "Pre-seed to Series A",
      industry: "Tech/SaaS",
      revenue: "$0-$10M ARR",
      location: "US preferred",
    },
    benefits: [
      "Access to YC network",
      "Investor introductions",
      "Mentorship opportunities",
      "Product feedback",
    ],
    registrationStatus: "application",
    cost: "Free (by invitation)",
    autoFillReady: true,
    aiInsights:
      "Strong alignment with your business model. YC network valuable for SaaS growth.",
  },
  {
    id: 3,
    name: "Startup Grind Global Conference",
    type: "Networking",
    location: "Silicon Valley, CA",
    date: "2024-02-28",
    deadline: "2024-01-30",
    description:
      "Global startup community gathering with founders, investors, and ecosystem partners",
    matchScore: 72,
    eligibility: {
      stage: "Any",
      industry: "Any",
      revenue: "Any",
      location: "Global",
    },
    benefits: [
      "Global founder network",
      "Investor connections",
      "Partnership opportunities",
      "Learning workshops",
    ],
    registrationStatus: "available",
    cost: "$1,299",
    autoFillReady: true,
    aiInsights:
      "Good for early-stage networking and learning. Less investor-focused than other options.",
  },
  {
    id: 4,
    name: "SaaS Summit 2024",
    type: "Industry Conference",
    location: "Austin, TX",
    date: "2024-05-10",
    deadline: "2024-03-15",
    description:
      "The definitive conference for SaaS founders, covering growth, metrics, and scaling",
    matchScore: 85,
    eligibility: {
      stage: "Any",
      industry: "SaaS/Software",
      revenue: "Any",
      location: "Global",
    },
    benefits: [
      "SaaS-specific content",
      "Growth strategies",
      "Metrics workshops",
      "Tool vendor expo",
    ],
    registrationStatus: "available",
    cost: "$1,899",
    autoFillReady: false,
    aiInsights:
      "Highly relevant for SaaS-specific learning and best practices. Strong ROI for product teams.",
  },
];

const fundingOpportunities = [
  {
    id: 1,
    name: "Techstars Boston 2024",
    type: "Accelerator",
    amount: "$120,000",
    equity: "6%",
    deadline: "2024-02-15",
    matchScore: 92,
    duration: "3 months",
    location: "Boston, MA",
    focus: "B2B SaaS, AI/ML",
    requirements: ["MVP ready", "Founding team", "Market traction"],
    benefits: ["Funding", "Mentorship", "Demo day", "Alumni network"],
    applicationStatus: "open",
  },
  {
    id: 2,
    name: "AWS Startup Challenge",
    type: "Competition",
    amount: "$100,000",
    equity: "0%",
    deadline: "2024-01-31",
    matchScore: 78,
    duration: "6 months",
    location: "Remote",
    focus: "Cloud-native startups",
    requirements: ["AWS usage", "Scalable product", "Growth metrics"],
    benefits: [
      "Cash prize",
      "AWS credits",
      "Technical mentoring",
      "Customer introductions",
    ],
    applicationStatus: "open",
  },
  {
    id: 3,
    name: "Google for Startups Accelerator",
    type: "Accelerator",
    amount: "$200,000",
    equity: "0%",
    deadline: "2024-03-01",
    matchScore: 85,
    duration: "3 months",
    location: "Mountain View, CA",
    focus: "AI/ML applications",
    requirements: ["AI/ML focus", "Series A ready", "Diverse founding team"],
    benefits: [
      "Funding",
      "Google mentors",
      "Product credits",
      "Go-to-market support",
    ],
    applicationStatus: "open",
  },
];

const applicationTracking = [
  {
    id: 1,
    eventName: "TechCrunch Disrupt",
    status: "submitted",
    submittedDate: "2024-01-10",
    nextStep: "Awaiting review",
    progress: 25,
    deadline: "2024-02-01",
  },
  {
    id: 2,
    eventName: "Startup Grind",
    status: "draft",
    submittedDate: null,
    nextStep: "Complete application",
    progress: 60,
    deadline: "2024-01-30",
  },
  {
    id: 3,
    eventName: "SaaS Summit",
    status: "registered",
    submittedDate: "2024-01-08",
    nextStep: "Prepare presentation",
    progress: 100,
    deadline: "2024-03-15",
  },
];

// Convert the data to calendar format
const convertToCalendarData = (): Proposal[] => {
  const proposals: Proposal[] = [];

  // Add events with deadlines
  matchedEvents.forEach((event) => {
    proposals.push({
      id: `event-${event.id}`,
      name: event.name,
      date: new Date(event.deadline),
      type: "deadline",
      match: event.matchScore,
      status: "draft",
      eventType: event.type,
      location: event.location,
      cost: event.cost,
    });
  });

  // Add funding opportunities with deadlines
  fundingOpportunities.forEach((opportunity) => {
    proposals.push({
      id: `funding-${opportunity.id}`,
      name: opportunity.name,
      date: new Date(opportunity.deadline),
      type: "deadline",
      match: opportunity.matchScore,
      status: "draft",
      eventType: opportunity.type,
      location: opportunity.location,
      cost: opportunity.amount,
    });
  });

  // Add application tracking
  applicationTracking.forEach((app) => {
    const status =
      app.status === "submitted"
        ? "pending"
        : app.status === "registered"
        ? "approved"
        : "draft";

    proposals.push({
      id: `app-${app.id}`,
      name: app.eventName,
      date: new Date(app.deadline),
      type: app.status === "submitted" ? "submitted" : "deadline",
      status: status as any,
      eventType: "Application",
    });
  });

  return proposals;
};

export function ProposalCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const mockProposals = convertToCalendarData();

  const getProposalsForDate = (date: Date) => {
    return mockProposals.filter((proposal) => isSameDay(proposal.date, date));
  };

  const getProposalsForMonth = (month: Date) => {
    return mockProposals.filter(
      (proposal) =>
        proposal.date.getMonth() === month.getMonth() &&
        proposal.date.getFullYear() === month.getFullYear()
    );
  };

  const selectedProposals = selectedDate
    ? getProposalsForDate(selectedDate)
    : [];
  const monthProposals = getProposalsForMonth(currentMonth);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "registered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "submitted":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "deadline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-green-500" />
          Proposals & Opportunities Calendar
        </CardTitle>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-200 border border-green-300 rounded"></div>
            <span className="text-sm">Submitted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
            <span className="text-sm">Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-200 border border-red-300 rounded"></div>
            <span className="text-sm">Deadline</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg">{formatMonth(currentMonth)}</h3>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
              modifiers={{
                hasSubmitted: (date) =>
                  getProposalsForDate(date).some((p) => p.type === "submitted"),
                hasUpcoming: (date) =>
                  getProposalsForDate(date).some((p) => p.type === "upcoming"),
                hasDeadline: (date) =>
                  getProposalsForDate(date).some((p) => p.type === "deadline"),
              }}
              modifiersClassNames={{
                hasSubmitted:
                  "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
                hasUpcoming:
                  "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
                hasDeadline:
                  "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
              }}
            />
          </div>

          {/* Proposal Details */}
          <div className="space-y-4">
            {selectedDate && (
              <div>
                <h3 className="text-lg mb-3">{formatDate(selectedDate)}</h3>

                {selectedProposals.length > 0 ? (
                  <div className="space-y-3">
                    {selectedProposals.map((proposal) => (
                      <div key={proposal.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{proposal.name}</h4>
                          <div className="flex gap-2">
                            <Badge
                              variant="outline"
                              className={getTypeColor(proposal.type)}
                            >
                              {proposal.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={getStatusColor(proposal.status)}
                            >
                              {proposal.status}
                            </Badge>
                          </div>
                        </div>
                        {proposal.match && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              Match:
                            </span>
                            <Badge variant="outline">{proposal.match}%</Badge>
                          </div>
                        )}
                        {proposal.eventType && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              Type:
                            </span>
                            <span className="text-sm">
                              {proposal.eventType}
                            </span>
                          </div>
                        )}
                        {proposal.location && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              Location:
                            </span>
                            <span className="text-sm">{proposal.location}</span>
                          </div>
                        )}
                        {proposal.cost && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              Cost:
                            </span>
                            <span className="text-sm">{proposal.cost}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No proposals or opportunities on this date.
                  </p>
                )}
              </div>
            )}

            {/* Month Summary */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">This Month Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Proposals:</span>
                  <span>{monthProposals.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Submitted:</span>
                  <span>
                    {
                      monthProposals.filter((p) => p.type === "submitted")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Upcoming Deadlines:</span>
                  <span>
                    {monthProposals.filter((p) => p.type === "deadline").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Opportunities:</span>
                  <span>
                    {monthProposals.filter((p) => p.type === "upcoming").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
