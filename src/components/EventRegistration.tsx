import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Filter,
  Search,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

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

export function EventRegistration() {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof matchedEvents)[0] | null
  >(null);

  const filteredEvents = matchedEvents.filter((event) => {
    const matchesType =
      filterType === "all" ||
      event.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default";
      case "draft":
        return "secondary";
      case "registered":
        return "default";
      default:
        return "outline";
    }
  };

  const getUrgencyColor = (deadline: string) => {
    const daysUntil = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (daysUntil <= 7) return "destructive";
    if (daysUntil <= 14) return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Matched Events</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{matchedEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              AI-curated opportunities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>High Match</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {matchedEvents.filter((e) => e.matchScore >= 85).length}
            </div>
            <p className="text-xs text-muted-foreground">85%+ compatibility</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Auto-Fill Ready</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {matchedEvents.filter((e) => e.autoFillReady).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Forms ready to submit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Urgent Deadlines</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {
                matchedEvents.filter((e) => {
                  const daysUntil = Math.ceil(
                    (new Date(e.deadline).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return daysUntil <= 7;
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Within 7 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Event Opportunities</TabsTrigger>
          <TabsTrigger value="funding">Funding Opportunities</TabsTrigger>
          <TabsTrigger value="tracking">Application Tracking</TabsTrigger>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Matched Events & Competitions</CardTitle>
              <CardDescription>
                Automatically discovered opportunities based on your company
                profile and interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="conference">Conferences</SelectItem>
                    <SelectItem value="accelerator">Accelerators</SelectItem>
                    <SelectItem value="competition">Competitions</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{event.name}</h4>
                          <Badge variant="outline">{event.type}</Badge>
                          <Badge variant={getUrgencyColor(event.deadline)}>
                            Due {event.deadline}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.cost}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="default">
                            {event.matchScore}% match
                          </Badge>
                          {event.autoFillReady && (
                            <Badge variant="outline">Auto-fill ready</Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedEvent(event)}
                          >
                            View Details
                          </Button>
                          {event.autoFillReady ? (
                            <Button size="sm">Quick Apply</Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit Site
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            AI Insight
                          </p>
                          <p className="text-xs text-blue-700">
                            {event.aiInsights}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedEvent.name} - Detailed Information
                </CardTitle>
                <CardDescription>
                  Complete event details and application guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Event Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>{selectedEvent.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{selectedEvent.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Application Deadline:
                        </span>
                        <span>{selectedEvent.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cost:</span>
                        <span>{selectedEvent.cost}</span>
                      </div>
                    </div>

                    <h4 className="font-medium mb-3 mt-6">
                      Eligibility Requirements
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stage:</span>
                        <span>{selectedEvent.eligibility.stage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span>{selectedEvent.eligibility.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span>{selectedEvent.eligibility.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{selectedEvent.eligibility.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Key Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      {selectedEvent.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">
                        Match Analysis
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">
                            Compatibility Score
                          </span>
                          <span className="text-sm font-medium text-green-900">
                            {selectedEvent.matchScore}%
                          </span>
                        </div>
                        <Progress
                          value={selectedEvent.matchScore}
                          className="h-2"
                        />
                        <p className="text-xs text-green-600">
                          {selectedEvent.aiInsights}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      {selectedEvent.autoFillReady ? (
                        <Button className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Auto-Fill & Submit
                        </Button>
                      ) : (
                        <Button className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Manually
                        </Button>
                      )}
                      <Button variant="outline">Add to Calendar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funding & Investment Opportunities</CardTitle>
              <CardDescription>
                Accelerators, competitions, and grants matched to your startup
                profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fundingOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{opportunity.name}</h4>
                          <Badge variant="outline">{opportunity.type}</Badge>
                          <Badge
                            variant={getUrgencyColor(opportunity.deadline)}
                          >
                            Due {opportunity.deadline}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{opportunity.amount}</span>
                          {opportunity.equity !== "0%" && (
                            <span>{opportunity.equity} equity</span>
                          )}
                          <span>{opportunity.duration}</span>
                          <span>{opportunity.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Focus: {opportunity.focus}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">
                          {opportunity.matchScore}% match
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">
                          Requirements
                        </h5>
                        <ul className="text-xs space-y-1">
                          {opportunity.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Benefits</h5>
                        <ul className="text-xs space-y-1">
                          {opportunity.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Start Application</Button>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                      <Button variant="ghost" size="sm">
                        Save for Later
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Tracking</CardTitle>
              <CardDescription>
                Monitor the status of your event and funding applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationTracking.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{app.eventName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {app.submittedDate
                            ? `Submitted ${app.submittedDate}`
                            : "Not submitted yet"}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(app.status) as any}>
                        {app.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {app.nextStep}</span>
                        <span>{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Deadline: {app.deadline}</span>
                        <span>
                          {Math.ceil(
                            (new Date(app.deadline).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days left
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      {app.status === "draft" && (
                        <Button size="sm">Complete Application</Button>
                      )}
                      {app.status === "submitted" && (
                        <Button variant="outline" size="sm">
                          View Submission
                        </Button>
                      )}
                      {app.status === "registered" && (
                        <Button variant="outline" size="sm">
                          Event Details
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile for Event Matching</CardTitle>
              <CardDescription>
                AI uses this information to find the most relevant opportunities
                for your startup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Company Information</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Company Name</Label>
                      <Input value="StartupOps AI" disabled />
                    </div>
                    <div>
                      <Label>Industry</Label>
                      <Select defaultValue="saas">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saas">SaaS/Software</SelectItem>
                          <SelectItem value="fintech">FinTech</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Stage</Label>
                      <Select defaultValue="seed">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Idea Stage</SelectItem>
                          <SelectItem value="mvp">MVP</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Preferences</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Event Types (select multiple)</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Conferences
                        </Button>
                        <Button variant="default" size="sm">
                          Accelerators
                        </Button>
                        <Button variant="default" size="sm">
                          Competitions
                        </Button>
                        <Button variant="outline" size="sm">
                          Networking
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Geographic Preference</Label>
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local/Regional</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">AI Matching Enabled</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll automatically scan for new opportunities weekly
                    </p>
                  </div>
                  <Button>Update Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
