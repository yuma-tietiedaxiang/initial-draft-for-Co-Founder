import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Lightbulb, TrendingDown, Star, Users, Clock, DollarSign, CheckCircle, X } from 'lucide-react';

const toolRecommendations = [
  {
    id: 1,
    current: 'Slack Business+',
    currentCost: 960,
    alternative: 'Microsoft Teams',
    alternativeCost: 600,
    savings: 360,
    confidence: 88,
    reason: 'Similar features, better integration with existing Microsoft tools',
    features: ['Video calls up to 1000 people', 'Unlimited chat history', 'Advanced security'],
    users: '2.1M companies',
    rating: 4.4
  },
  {
    id: 2,
    current: 'Figma Pro',
    currentCost: 144,
    alternative: 'Adobe XD',
    alternativeCost: 120,
    savings: 24,
    confidence: 72,
    reason: 'Adobe Creative Cloud integration, similar design capabilities',
    features: ['Advanced prototyping', 'Cloud sync', 'Team collaboration'],
    users: '500K+ designers',
    rating: 4.2
  },
  {
    id: 3,
    current: 'AWS EC2',
    currentCost: 280,
    alternative: 'DigitalOcean Droplets',
    alternativeCost: 160,
    savings: 120,
    confidence: 85,
    reason: 'Simpler pricing, suitable for current scale, excellent performance',
    features: ['SSD storage', 'One-click apps', 'Global data centers'],
    users: '600K+ developers',
    rating: 4.6
  }
];

const categoryRecommendations = [
  {
    category: 'Project Management',
    current: ['Notion Pro', 'Trello Business'],
    recommendation: 'Linear',
    reason: 'Built for modern development teams, better issue tracking',
    potentialSavings: 180,
    adoptionRate: 92
  },
  {
    category: 'Analytics',
    current: ['Google Analytics', 'Mixpanel'],
    recommendation: 'PostHog',
    reason: 'Open source, privacy-focused, all-in-one product analytics',
    potentialSavings: 400,
    adoptionRate: 78
  },
  {
    category: 'Customer Support',
    current: ['Zendesk'],
    recommendation: 'Intercom',
    reason: 'Better user engagement features, modern interface',
    potentialSavings: -50,
    adoptionRate: 85
  }
];

const industryTrends = [
  {
    tool: 'Vercel',
    category: 'Deployment',
    trendScore: 95,
    adoptionGrowth: 147,
    description: 'Leading platform for frontend deployment with excellent DX'
  },
  {
    tool: 'Supabase',
    category: 'Backend-as-a-Service',
    trendScore: 92,
    adoptionGrowth: 203,
    description: 'Open source Firebase alternative with PostgreSQL'
  },
  {
    tool: 'Tailwind CSS',
    category: 'CSS Framework',
    trendScore: 89,
    adoptionGrowth: 85,
    description: 'Utility-first CSS framework for rapid UI development'
  }
];

export function SmartRecommendations() {
  const [dismissedRecommendations, setDismissedRecommendations] = useState(new Set());

  const dismissRecommendation = (id: number) => {
    setDismissedRecommendations(prev => new Set(prev).add(id));
  };

  const activeRecommendations = toolRecommendations.filter(rec => !dismissedRecommendations.has(rec.id));
  const totalPotentialSavings = activeRecommendations.reduce((sum, rec) => sum + rec.savings, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Potential Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">${totalPotentialSavings}/year</div>
            <p className="text-xs text-muted-foreground">From {activeRecommendations.length} recommendations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Tools Analyzed</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">23</div>
            <p className="text-xs text-muted-foreground">Current SaaS subscriptions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg. Confidence</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">82%</div>
            <p className="text-xs text-muted-foreground">AI recommendation accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alternatives" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alternatives">Tool Alternatives</TabsTrigger>
          <TabsTrigger value="categories">Category Analysis</TabsTrigger>
          <TabsTrigger value="trends">Industry Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="alternatives" className="space-y-4">
          {activeRecommendations.map((rec) => (
            <Card key={rec.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-green-500" />
                      Replace {rec.current} with {rec.alternative}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Save ${rec.savings}/year ({Math.round((rec.savings / rec.currentCost) * 100)}% reduction)
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{rec.confidence}% confident</Badge>
                    <Button variant="ghost" size="sm" onClick={() => dismissRecommendation(rec.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-2">Why this recommendation?</h4>
                    <p className="text-sm text-muted-foreground mb-4">{rec.reason}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current cost:</span>
                        <span>${rec.currentCost}/year</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>New cost:</span>
                        <span>${rec.alternativeCost}/year</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium text-green-600">
                        <span>Annual savings:</span>
                        <span>${rec.savings}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">{rec.alternative} Features</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                      {rec.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {rec.users}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {rec.rating}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button>Learn More</Button>
                  <Button variant="outline">Start Trial</Button>
                  <Button variant="ghost">Dismiss</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {categoryRecommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{rec.category}</CardTitle>
                <CardDescription>
                  Current: {rec.current.join(', ')} → Recommended: {rec.recommendation}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">{rec.reason}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Startup Adoption Rate</span>
                        <span className="text-sm">{rec.adoptionRate}%</span>
                      </div>
                      <Progress value={rec.adoptionRate} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Potential Impact:</span>
                      <span className={`text-sm font-medium ${rec.potentialSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {rec.potentialSavings > 0 ? '+' : ''}${rec.potentialSavings}/year
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm">Explore {rec.recommendation}</Button>
                    <Button variant="outline" size="sm">Compare Features</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Tools in Your Industry</CardTitle>
              <CardDescription>Based on adoption by similar-stage startups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {industryTrends.map((trend, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{trend.tool}</h4>
                      <p className="text-sm text-muted-foreground">{trend.category}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Trend Score: {trend.trendScore}</Badge>
                      <p className="text-xs text-green-600 mt-1">+{trend.adoptionGrowth}% growth</p>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3">{trend.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <Progress value={trend.trendScore} className="flex-1 max-w-[200px] h-2" />
                    <Button variant="outline" size="sm">
                      <Clock className="h-3 w-3 mr-1" />
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}