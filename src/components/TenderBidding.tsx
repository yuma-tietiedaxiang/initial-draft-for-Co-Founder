import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { FileText, Search, Filter, Calendar, DollarSign, CheckCircle, AlertTriangle, Download, Upload, Bot } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const tenderNotices = [
  {
    id: 1,
    title: 'Digital Transformation Platform for Municipal Services',
    organization: 'City of Austin',
    value: '$250,000',
    deadline: '2024-02-15',
    industry: 'Government/Public Sector',
    description: 'Development of a comprehensive digital platform to streamline municipal services including permit applications, utility billing, and citizen services portal.',
    eligibilityScore: 92,
    requirements: ['Small business certification', 'Local business preference', 'Previous government experience'],
    deliverables: ['Web platform development', 'Mobile app', 'API integration', '2-year maintenance'],
    status: 'eligible',
    competitiveAdvantage: 'Strong match for SaaS expertise and operations management focus',
    estimatedCompetitors: 12,
    winProbability: 78
  },
  {
    id: 2,
    title: 'AI-Powered Inventory Management System',
    organization: 'Texas Department of Transportation',
    value: '$180,000',
    deadline: '2024-01-30',
    industry: 'Transportation/Logistics',
    description: 'Implementation of machine learning algorithms for predictive inventory management across multiple depot locations.',
    eligibilityScore: 88,
    requirements: ['AI/ML experience', 'Scalable architecture', 'Security clearance (obtainable)'],
    deliverables: ['ML model development', 'Dashboard interface', 'Training and documentation'],
    status: 'eligible',
    competitiveAdvantage: 'AI prediction capabilities align perfectly with offering',
    estimatedCompetitors: 8,
    winProbability: 85
  },
  {
    id: 3,
    title: 'Small Business Financial Management Tools',
    organization: 'Austin Economic Development',
    value: '$95,000',
    deadline: '2024-03-01',
    industry: 'Economic Development',
    description: 'Development of financial planning and management tools specifically designed for small businesses and startups.',
    eligibilityScore: 95,
    requirements: ['Local business', 'FinTech experience', 'Small business focus'],
    deliverables: ['Financial planning software', 'Educational content', 'User training'],
    status: 'high-match',
    competitiveAdvantage: 'Perfect alignment with financial forecasting and what-if scenarios',
    estimatedCompetitors: 5,
    winProbability: 91
  },
  {
    id: 4,
    title: 'Enterprise Resource Planning Integration',
    organization: 'University of Texas System',
    value: '$420,000',
    deadline: '2024-02-28',
    industry: 'Education',
    description: 'Integration of multiple ERP systems across university campuses with centralized reporting and analytics.',
    eligibilityScore: 65,
    requirements: ['Higher education experience', 'Large-scale integration', 'Certified partners'],
    deliverables: ['System integration', 'Data migration', 'Training programs'],
    status: 'review-needed',
    competitiveAdvantage: 'Limited experience in higher education sector',
    estimatedCompetitors: 15,
    winProbability: 45
  }
];

const proposalTemplates = [
  {
    id: 1,
    name: 'Government SaaS Platform',
    description: 'Template for municipal/government software solutions',
    sections: ['Executive Summary', 'Technical Approach', 'Project Timeline', 'Team Qualifications', 'Pricing'],
    lastUsed: '2024-01-05',
    successRate: 87
  },
  {
    id: 2,
    name: 'AI/ML Implementation',
    description: 'Template for artificial intelligence and machine learning projects',
    sections: ['Solution Overview', 'ML Methodology', 'Data Requirements', 'Implementation Plan', 'ROI Analysis'],
    lastUsed: '2024-01-12',
    successRate: 92
  },
  {
    id: 3,
    name: 'Financial Software Development',
    description: 'Template for financial technology and planning tools',
    sections: ['Product Overview', 'Security Framework', 'Compliance Approach', 'Development Process', 'Support Model'],
    lastUsed: 'Never used',
    successRate: 0
  }
];

const activeProposals = [
  {
    id: 1,
    tenderTitle: 'Digital Transformation Platform',
    status: 'draft',
    completion: 75,
    deadline: '2024-02-15',
    lastEdited: '2024-01-18',
    sections: {
      executive: 'complete',
      technical: 'complete',
      timeline: 'in-progress',
      team: 'complete',
      pricing: 'pending'
    }
  },
  {
    id: 2,
    tenderTitle: 'AI Inventory Management',
    status: 'review',
    completion: 95,
    deadline: '2024-01-30',
    lastEdited: '2024-01-19',
    sections: {
      executive: 'complete',
      technical: 'complete',
      timeline: 'complete',
      team: 'complete',
      pricing: 'complete'
    }
  }
];

export function TenderBidding() {
  const [selectedTender, setSelectedTender] = useState<typeof tenderNotices[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTenders = tenderNotices.filter(tender => {
    const matchesStatus = filterStatus === 'all' || tender.status === filterStatus;
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.organization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'default';
      case 'high-match': return 'default';
      case 'review-needed': return 'secondary';
      default: return 'outline';
    }
  };

  const getUrgencyColor = (deadline: string) => {
    const daysUntil = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 7) return 'destructive';
    if (daysUntil <= 14) return 'secondary';
    return 'outline';
  };

  const generateProposal = async (tender: typeof tenderNotices[0]) => {
    setIsGenerating(true);
    // Simulate AI proposal generation
    setTimeout(() => {
      setIsGenerating(false);
      // Add to active proposals or show success message
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Tenders</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{tenderNotices.length}</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>High Match</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{tenderNotices.filter(t => t.eligibilityScore >= 90).length}</div>
            <p className="text-xs text-muted-foreground">90%+ eligibility score</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$945K</div>
            <p className="text-xs text-muted-foreground">Available opportunities</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Proposals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{activeProposals.length}</div>
            <p className="text-xs text-muted-foreground">In development</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tenders">Available Tenders</TabsTrigger>
          <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
          <TabsTrigger value="templates">Proposal Templates</TabsTrigger>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="tenders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Government & Enterprise Tender Opportunities</CardTitle>
              <CardDescription>
                AI-curated tender notices based on your company capabilities and eligibility criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tenders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="eligible">Eligible</SelectItem>
                    <SelectItem value="high-match">High Match</SelectItem>
                    <SelectItem value="review-needed">Review Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredTenders.map((tender) => (
                  <div key={tender.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{tender.title}</h4>
                          <Badge variant={getStatusColor(tender.status) as any}>
                            {tender.status.replace('-', ' ')}
                          </Badge>
                          <Badge variant={getUrgencyColor(tender.deadline)}>
                            Due {tender.deadline}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{tender.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{tender.organization}</span>
                          <span>{tender.industry}</span>
                          <span>{tender.value}</span>
                          <span>{tender.estimatedCompetitors} competitors</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{tender.eligibilityScore}% eligible</Badge>
                          <Badge variant="outline">{tender.winProbability}% win prob.</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTender(tender)}
                          >
                            View Details
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => generateProposal(tender)}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <>
                                <Bot className="h-3 w-3 mr-1 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              'Generate Proposal'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h5 className="font-medium text-green-900 text-sm mb-1">Competitive Advantage</h5>
                        <p className="text-xs text-green-700">{tender.competitiveAdvantage}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 text-sm mb-1">Key Requirements</h5>
                        <div className="text-xs text-blue-700">
                          {tender.requirements.slice(0, 2).map((req, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              {req}
                            </div>
                          ))}
                          {tender.requirements.length > 2 && (
                            <span>+{tender.requirements.length - 2} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedTender && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedTender.title} - Detailed Analysis</CardTitle>
                <CardDescription>
                  Comprehensive tender analysis and eligibility assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Tender Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Organization:</span>
                        <span>{selectedTender.organization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Value:</span>
                        <span>{selectedTender.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span>{selectedTender.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span>{selectedTender.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Competition:</span>
                        <span>{selectedTender.estimatedCompetitors} bidders expected</span>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3 mt-6">Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      {selectedTender.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-medium mb-3 mt-6">Deliverables</h4>
                    <ul className="space-y-2 text-sm">
                      {selectedTender.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-blue-500" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Eligibility Analysis</h4>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Overall Eligibility</span>
                          <Badge variant="default">{selectedTender.eligibilityScore}%</Badge>
                        </div>
                        <Progress value={selectedTender.eligibilityScore} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Based on company profile, experience, and requirements match
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Win Probability</span>
                          <Badge variant="outline">{selectedTender.winProbability}%</Badge>
                        </div>
                        <Progress value={selectedTender.winProbability} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Estimated based on competition level and company strengths
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-2">AI Recommendations</h5>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Emphasize AI/ML capabilities in technical approach</li>
                        <li>• Highlight previous SaaS platform experience</li>
                        <li>• Include detailed security and compliance framework</li>
                        <li>• Consider partnering for local business requirements</li>
                      </ul>
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <Button className="flex-1" onClick={() => generateProposal(selectedTender)}>
                        <Bot className="h-4 w-4 mr-2" />
                        Generate AI Proposal
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download RFP
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="proposals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Proposal Development</CardTitle>
              <CardDescription>
                Proposals currently being developed with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{proposal.tenderTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last edited: {proposal.lastEdited} • Deadline: {proposal.deadline}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={proposal.status === 'draft' ? 'secondary' : 'default'}>
                          {proposal.status}
                        </Badge>
                        <Badge variant="outline">{proposal.completion}% complete</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{proposal.completion}%</span>
                      </div>
                      <Progress value={proposal.completion} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {Object.entries(proposal.sections).map(([section, status]) => (
                        <div key={section} className="text-center">
                          <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                            status === 'complete' ? 'bg-green-500 text-white' :
                            status === 'in-progress' ? 'bg-yellow-500 text-white' :
                            'bg-gray-200 text-gray-500'
                          }`}>
                            {status === 'complete' ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">
                                {section.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <p className="text-xs capitalize">{section}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm">Continue Editing</Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Export Draft
                      </Button>
                      {proposal.completion === 100 && (
                        <Button variant="default" size="sm">Submit Proposal</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Proposal Templates</CardTitle>
              <CardDescription>
                Pre-built templates optimized for different types of tenders and industries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposalTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{template.successRate}% success rate</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last used: {template.lastUsed}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-sm mb-2">Template Sections</h5>
                      <div className="flex flex-wrap gap-2">
                        {template.sections.map((section, index) => (
                          <Badge key={index} variant="outline">{section}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm">Use Template</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button variant="ghost" size="sm">Customize</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Create Custom Template</CardTitle>
                  <CardDescription>
                    Build a new proposal template for specific industries or tender types
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="template-name">Template Name</Label>
                      <Input id="template-name" placeholder="e.g., Healthcare IT Solutions" />
                    </div>
                    <div>
                      <Label htmlFor="template-industry">Target Industry</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="template-description">Description</Label>
                    <Textarea 
                      id="template-description" 
                      placeholder="Describe when and how this template should be used..."
                    />
                  </div>
                  
                  <Button>Create Template</Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Capabilities Profile</CardTitle>
              <CardDescription>
                Your profile helps AI match relevant tenders and assess eligibility automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Company Information</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Business Classification</Label>
                      <Select defaultValue="small-business">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small-business">Small Business</SelectItem>
                          <SelectItem value="minority-owned">Minority-Owned</SelectItem>
                          <SelectItem value="woman-owned">Woman-Owned</SelectItem>
                          <SelectItem value="veteran-owned">Veteran-Owned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Primary Industry</Label>
                      <Select defaultValue="software">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software">Software Development</SelectItem>
                          <SelectItem value="consulting">IT Consulting</SelectItem>
                          <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
                          <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Years in Business</Label>
                      <Input defaultValue="3" type="number" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Capabilities & Certifications</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Security Clearances</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button variant="outline" size="sm">None</Button>
                        <Button variant="outline" size="sm">Public Trust</Button>
                        <Button variant="outline" size="sm">Secret</Button>
                        <Button variant="outline" size="sm">Top Secret</Button>
                      </div>
                    </div>
                    <div>
                      <Label>Technical Expertise</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button variant="default" size="sm">SaaS Development</Button>
                        <Button variant="default" size="sm">AI/ML</Button>
                        <Button variant="default" size="sm">Cloud Platforms</Button>
                        <Button variant="outline" size="sm">Mobile Apps</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Past Performance</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-medium">12</div>
                    <p className="text-sm text-muted-foreground">Government Contracts</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-medium">$2.1M</div>
                    <p className="text-sm text-muted-foreground">Total Contract Value</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-medium">98%</div>
                    <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <h4 className="font-medium">Auto-Bidding Preferences</h4>
                  <p className="text-sm text-muted-foreground">
                    Let AI automatically generate proposals for high-match opportunities
                  </p>
                </div>
                <Button>Update Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}