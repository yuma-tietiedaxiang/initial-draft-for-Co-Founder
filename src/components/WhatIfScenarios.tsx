import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calculator, Users, DollarSign, TrendingUp, AlertTriangle, Target, Plus, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Scenario {
  id: string;
  name: string;
  description: string;
  assumptions: {
    newHires: number;
    salaryPerHire: number;
    additionalSaas: number;
    marketingBudget: number;
    officeExpansion: number;
  };
  results: {
    monthlyIncrease: number;
    runwayChange: number;
    newRunway: number;
    confidenceScore: number;
  };
}

const currentMetrics = {
  monthlyBurn: 6900,
  currentRunway: 18,
  cashOnHand: 124200,
  teamSize: 8
};

const predefinedScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Aggressive Growth',
    description: 'Rapid team expansion with increased marketing spend',
    assumptions: {
      newHires: 4,
      salaryPerHire: 8000,
      additionalSaas: 2000,
      marketingBudget: 5000,
      officeExpansion: 1500
    },
    results: {
      monthlyIncrease: 40500,
      runwayChange: -15.2,
      newRunway: 2.8,
      confidenceScore: 85
    }
  },
  {
    id: '2',
    name: 'Conservative Growth',
    description: 'Modest expansion focusing on operational efficiency',
    assumptions: {
      newHires: 2,
      salaryPerHire: 7500,
      additionalSaas: 800,
      marketingBudget: 2000,
      officeExpansion: 0
    },
    results: {
      monthlyIncrease: 17800,
      runwayChange: -7.8,
      newRunway: 10.2,
      confidenceScore: 92
    }
  },
  {
    id: '3',
    name: 'Cost Optimization',
    description: 'Focus on reducing expenses while maintaining team',
    assumptions: {
      newHires: 0,
      salaryPerHire: 0,
      additionalSaas: -1200,
      marketingBudget: -1000,
      officeExpansion: -800
    },
    results: {
      monthlyIncrease: -3000,
      runwayChange: 8.5,
      newRunway: 26.5,
      confidenceScore: 88
    }
  }
];

const runwayProjections = [
  { month: 'Current', aggressive: 18, conservative: 18, optimized: 18 },
  { month: 'Month 1', aggressive: 15.2, conservative: 16.3, optimized: 18.8 },
  { month: 'Month 2', aggressive: 12.4, conservative: 14.6, optimized: 19.6 },
  { month: 'Month 3', aggressive: 9.6, conservative: 12.9, optimized: 20.4 },
  { month: 'Month 4', aggressive: 6.8, conservative: 11.2, optimized: 21.2 },
  { month: 'Month 5', aggressive: 4.0, conservative: 9.5, optimized: 22.0 },
  { month: 'Month 6', aggressive: 1.2, conservative: 7.8, optimized: 22.8 }
];

export function WhatIfScenarios() {
  const [customScenario, setCustomScenario] = useState({
    name: '',
    newHires: 0,
    salaryPerHire: 7500,
    additionalSaas: 0,
    marketingBudget: 0,
    officeExpansion: 0
  });

  const [scenarios, setScenarios] = useState(predefinedScenarios);
  const [selectedScenario, setSelectedScenario] = useState<string>('1');

  const calculateScenarioImpact = (assumptions: any) => {
    const monthlySalaryIncrease = assumptions.newHires * assumptions.salaryPerHire;
    const totalMonthlyIncrease = monthlySalaryIncrease + assumptions.additionalSaas + assumptions.marketingBudget + assumptions.officeExpansion;
    const newMonthlyBurn = currentMetrics.monthlyBurn + totalMonthlyIncrease;
    const newRunway = currentMetrics.cashOnHand / newMonthlyBurn;
    const runwayChange = newRunway - currentMetrics.currentRunway;
    
    return {
      monthlyIncrease: totalMonthlyIncrease,
      runwayChange,
      newRunway,
      confidenceScore: 85 // Simplified calculation
    };
  };

  const addCustomScenario = () => {
    if (!customScenario.name) return;
    
    const results = calculateScenarioImpact(customScenario);
    const newScenario: Scenario = {
      id: Date.now().toString(),
      name: customScenario.name,
      description: 'Custom scenario',
      assumptions: {
        newHires: customScenario.newHires,
        salaryPerHire: customScenario.salaryPerHire,
        additionalSaas: customScenario.additionalSaas,
        marketingBudget: customScenario.marketingBudget,
        officeExpansion: customScenario.officeExpansion
      },
      results
    };
    
    setScenarios([...scenarios, newScenario]);
    setCustomScenario({
      name: '',
      newHires: 0,
      salaryPerHire: 7500,
      additionalSaas: 0,
      marketingBudget: 0,
      officeExpansion: 0
    });
  };

  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
    if (selectedScenario === id) {
      setSelectedScenario(scenarios[0]?.id || '');
    }
  };

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);

  return (
    <div className="space-y-6">
      {/* Current State */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Current Financial State
          </CardTitle>
          <CardDescription>Base metrics for scenario planning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="mx-auto h-6 w-6 text-green-500 mb-2" />
              <div className="text-2xl font-medium">${currentMetrics.monthlyBurn.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Monthly Burn Rate</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Target className="mx-auto h-6 w-6 text-blue-500 mb-2" />
              <div className="text-2xl font-medium">{currentMetrics.currentRunway} months</div>
              <p className="text-sm text-muted-foreground">Current Runway</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="mx-auto h-6 w-6 text-purple-500 mb-2" />
              <div className="text-2xl font-medium">${currentMetrics.cashOnHand.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Cash on Hand</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="mx-auto h-6 w-6 text-orange-500 mb-2" />
              <div className="text-2xl font-medium">{currentMetrics.teamSize}</div>
              <p className="text-sm text-muted-foreground">Team Size</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="scenarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scenarios">Scenario Comparison</TabsTrigger>
          <TabsTrigger value="create">Create Scenario</TabsTrigger>
          <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning Dashboard</CardTitle>
              <CardDescription>
                Compare different business scenarios and their impact on runway and expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {scenarios.map((scenario) => (
                  <div 
                    key={scenario.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedScenario === scenario.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{scenario.name}</h4>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                      {scenario.id !== '1' && scenario.id !== '2' && scenario.id !== '3' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteScenario(scenario.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Impact:</span>
                        <span className={scenario.results.monthlyIncrease >= 0 ? 'text-red-600' : 'text-green-600'}>
                          {scenario.results.monthlyIncrease >= 0 ? '+' : ''}${scenario.results.monthlyIncrease.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New Runway:</span>
                        <span className="font-medium">{scenario.results.newRunway.toFixed(1)} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Confidence:</span>
                        <Badge variant="outline">{scenario.results.confidenceScore}%</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedScenarioData && (
            <Card>
              <CardHeader>
                <CardTitle>Scenario Analysis: {selectedScenarioData.name}</CardTitle>
                <CardDescription>Detailed breakdown and runway projection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Assumptions</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New Hires:</span>
                        <span>{selectedScenarioData.assumptions.newHires} @ ${selectedScenarioData.assumptions.salaryPerHire}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Additional SaaS:</span>
                        <span>${selectedScenarioData.assumptions.additionalSaas}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Marketing Budget:</span>
                        <span>${selectedScenarioData.assumptions.marketingBudget}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Office Expansion:</span>
                        <span>${selectedScenarioData.assumptions.officeExpansion}/month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Impact Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Monthly Burn:</span>
                        <span>${currentMetrics.monthlyBurn.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New Monthly Burn:</span>
                        <span>${(currentMetrics.monthlyBurn + selectedScenarioData.results.monthlyIncrease).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>Runway Change:</span>
                        <span className={selectedScenarioData.results.runwayChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {selectedScenarioData.results.runwayChange >= 0 ? '+' : ''}{selectedScenarioData.results.runwayChange.toFixed(1)} months
                        </span>
                      </div>
                    </div>
                    
                    {selectedScenarioData.results.newRunway < 6 && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-700">Critical Runway Warning</span>
                        </div>
                        <p className="text-xs text-red-600 mt-1">
                          This scenario reduces runway to under 6 months. Consider raising funding or reducing burn rate.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Runway Projection Comparison</CardTitle>
              <CardDescription>How different scenarios affect runway over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={runwayProjections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Months Remaining', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value?.toFixed(1)} months`, 'Runway']} />
                  <Line type="monotone" dataKey="aggressive" stroke="#ef4444" strokeWidth={2} name="Aggressive Growth" />
                  <Line type="monotone" dataKey="conservative" stroke="#3b82f6" strokeWidth={2} name="Conservative Growth" />
                  <Line type="monotone" dataKey="optimized" stroke="#22c55e" strokeWidth={2} name="Cost Optimized" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Scenario</CardTitle>
              <CardDescription>
                Define your own assumptions to see how they would impact runway and expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scenario-name">Scenario Name</Label>
                  <Input
                    id="scenario-name"
                    value={customScenario.name}
                    onChange={(e) => setCustomScenario({ ...customScenario, name: e.target.value })}
                    placeholder="e.g., 'Product Launch Phase'"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Team & Personnel</h4>
                  
                  <div>
                    <Label htmlFor="new-hires">New Hires</Label>
                    <Input
                      id="new-hires"
                      type="number"
                      value={customScenario.newHires}
                      onChange={(e) => setCustomScenario({ ...customScenario, newHires: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="salary-per-hire">Average Salary per Hire (monthly)</Label>
                    <Input
                      id="salary-per-hire"
                      type="number"
                      value={customScenario.salaryPerHire}
                      onChange={(e) => setCustomScenario({ ...customScenario, salaryPerHire: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Operational Expenses</h4>
                  
                  <div>
                    <Label htmlFor="additional-saas">Additional SaaS Tools (monthly)</Label>
                    <Input
                      id="additional-saas"
                      type="number"
                      value={customScenario.additionalSaas}
                      onChange={(e) => setCustomScenario({ ...customScenario, additionalSaas: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="marketing-budget">Marketing Budget Change (monthly)</Label>
                    <Input
                      id="marketing-budget"
                      type="number"
                      value={customScenario.marketingBudget}
                      onChange={(e) => setCustomScenario({ ...customScenario, marketingBudget: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="office-expansion">Office/Infrastructure Change (monthly)</Label>
                    <Input
                      id="office-expansion"
                      type="number"
                      value={customScenario.officeExpansion}
                      onChange={(e) => setCustomScenario({ ...customScenario, officeExpansion: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Scenario Preview</h4>
                  <Button onClick={addCustomScenario} disabled={!customScenario.name}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Scenario
                  </Button>
                </div>
                
                {customScenario.name && (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Monthly Impact:</span>
                        <div className="font-medium">
                          ${(customScenario.newHires * customScenario.salaryPerHire + 
                             customScenario.additionalSaas + 
                             customScenario.marketingBudget + 
                             customScenario.officeExpansion).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Estimated New Runway:</span>
                        <div className="font-medium">
                          {(currentMetrics.cashOnHand / (currentMetrics.monthlyBurn + 
                            customScenario.newHires * customScenario.salaryPerHire + 
                            customScenario.additionalSaas + 
                            customScenario.marketingBudget + 
                            customScenario.officeExpansion)).toFixed(1)} months
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sensitivity Analysis</CardTitle>
              <CardDescription>
                How sensitive is runway to different variables in your scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Variable Impact on Runway</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Team Size (+1 hire)</span>
                        <Badge variant="destructive">-1.2 months</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Each additional hire at $7,500/month reduces runway by ~1.2 months
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">SaaS Tools (+$1,000)</span>
                        <Badge variant="secondary">-0.6 months</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Additional $1,000 in SaaS reduces runway by ~0.6 months
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Marketing Spend (+$2,000)</span>
                        <Badge variant="secondary">-1.8 months</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Additional $2,000 in marketing reduces runway by ~1.8 months
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Optimization Opportunities</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-green-50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Revenue Growth</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        +$2,000 monthly revenue extends runway by ~3.2 months
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Cost Reduction</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Reducing SaaS costs by 20% adds ~2.1 months runway
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg bg-purple-50">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Funding Round</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        $500K raise adds ~6.7 months at current burn rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}