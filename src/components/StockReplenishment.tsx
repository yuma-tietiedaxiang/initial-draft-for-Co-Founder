import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertTriangle, Package, Calendar, TrendingUp, Bell, Settings, ShoppingCart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const stockItems = [
  {
    id: 1,
    name: 'AWS Credits',
    category: 'Software Credits',
    current: 150,
    total: 500,
    unit: 'USD',
    burnRate: 75,
    daysLeft: 8,
    status: 'critical',
    autoReplenish: true,
    supplier: 'AWS',
    lastRefill: '2023-12-01'
  },
  {
    id: 2,
    name: 'Printer Paper (A4)',
    category: 'Office Supplies',
    current: 8,
    total: 20,
    unit: 'reams',
    burnRate: 2,
    daysLeft: 14,
    status: 'warning',
    autoReplenish: false,
    supplier: 'OfficeMax',
    lastRefill: '2024-01-05'
  },
  {
    id: 3,
    name: 'Coffee Pods',
    category: 'Office Supplies',
    current: 25,
    total: 100,
    unit: 'pods',
    burnRate: 8,
    daysLeft: 5,
    status: 'critical',
    autoReplenish: true,
    supplier: 'Nespresso',
    lastRefill: '2024-01-10'
  },
  {
    id: 4,
    name: 'GPU Compute Hours',
    category: 'Software Credits',
    current: 120,
    total: 200,
    unit: 'hours',
    burnRate: 15,
    daysLeft: 28,
    status: 'good',
    autoReplenish: false,
    supplier: 'Google Cloud',
    lastRefill: '2024-01-01'
  },
  {
    id: 5,
    name: 'Sticky Notes',
    category: 'Office Supplies',
    current: 3,
    total: 12,
    unit: 'packs',
    burnRate: 1,
    daysLeft: 21,
    status: 'warning',
    autoReplenish: false,
    supplier: '3M',
    lastRefill: '2023-12-20'
  }
];

const usageHistory = [
  { month: 'Aug', aws: 480, office: 180, gpu: 150 },
  { month: 'Sep', aws: 520, office: 165, gpu: 180 },
  { month: 'Oct', aws: 450, office: 200, gpu: 160 },
  { month: 'Nov', aws: 600, office: 190, gpu: 200 },
  { month: 'Dec', aws: 580, office: 175, gpu: 185 },
  { month: 'Jan', aws: 350, office: 155, gpu: 80 }
];

const predictedNeeds = [
  { item: 'AWS Credits', predicted: 75, confidence: 92, trigger: 100 },
  { item: 'Coffee Pods', predicted: 8, confidence: 88, trigger: 20 },
  { item: 'Printer Paper', predicted: 2, confidence: 85, trigger: 5 },
  { item: 'GPU Hours', predicted: 15, confidence: 90, trigger: 50 }
];

export function StockReplenishment() {
  const [autoReplenishSettings, setAutoReplenishSettings] = useState({
    enabled: true,
    threshold: 20,
    bufferDays: 7
  });

  const criticalItems = stockItems.filter(item => item.status === 'critical');
  const warningItems = stockItems.filter(item => item.status === 'warning');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'outline';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 20) return 'bg-red-500';
    if (percentage < 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-red-700">Critical Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-700">{criticalItems.length}</div>
            <p className="text-xs text-red-600">Require immediate attention</p>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-yellow-700">Warning Items</CardTitle>
            <Package className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-700">{warningItems.length}</div>
            <p className="text-xs text-yellow-600">Need replenishment soon</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Auto-Replenish</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stockItems.filter(item => item.autoReplenish).length}/{stockItems.length}</div>
            <p className="text-xs text-muted-foreground">Items with auto-replenish enabled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Stock</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="usage">Usage History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Levels</CardTitle>
              <CardDescription>Real-time inventory tracking with AI-powered depletion predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockItems.map((item) => {
                  const percentage = (item.current / item.total) * 100;
                  return (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(item.status) as any}>
                            {item.status}
                          </Badge>
                          {item.autoReplenish && (
                            <Badge variant="outline" className="ml-2">
                              Auto-replenish
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {item.current} {item.unit}</span>
                          <span>Burn rate: {item.burnRate} {item.unit}/month</span>
                        </div>
                        
                        <div className="relative">
                          <Progress value={percentage} className="h-3" />
                          <div className={`absolute inset-0 rounded-full ${getProgressColor(percentage)} opacity-70`} 
                               style={{ width: `${percentage}%` }} />
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className={item.daysLeft <= 7 ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                            {item.daysLeft} days remaining
                          </span>
                          <div className="flex gap-2">
                            {item.daysLeft <= 7 && (
                              <Button size="sm" variant="outline">
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Reorder Now
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <Bell className="h-3 w-3 mr-1" />
                              Set Alert
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Consumption Predictions</CardTitle>
              <CardDescription>Machine learning forecasts based on usage patterns and business growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictedNeeds.map((pred, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{pred.item}</h4>
                      <Badge variant="outline">{pred.confidence}% confident</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Predicted monthly usage:</span>
                        <p className="font-medium">{pred.predicted} units/month</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reorder trigger:</span>
                        <p className="font-medium">{pred.trigger} units remaining</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Recommendation:</span>
                        <p className="font-medium text-blue-600">Order in 5 days</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Prediction confidence</span>
                        <span className="text-xs">{pred.confidence}%</span>
                      </div>
                      <Progress value={pred.confidence} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Historical consumption patterns to improve prediction accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="aws" stroke="#8884d8" name="AWS Credits" strokeWidth={2} />
                  <Line type="monotone" dataKey="office" stroke="#82ca9d" name="Office Supplies" strokeWidth={2} />
                  <Line type="monotone" dataKey="gpu" stroke="#ffc658" name="GPU Hours" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Consumption by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usageHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="aws" stackId="a" fill="#8884d8" />
                  <Bar dataKey="office" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="gpu" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Replenishment Settings</CardTitle>
              <CardDescription>Configure automatic reordering thresholds and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4>Enable Auto-Replenishment</h4>
                    <p className="text-sm text-muted-foreground">Automatically reorder items when they reach critical levels</p>
                  </div>
                  <Button variant={autoReplenishSettings.enabled ? "default" : "outline"}>
                    {autoReplenishSettings.enabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Default Reorder Threshold</label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Reorder when stock falls below</span>
                    <span className="text-sm font-medium">{autoReplenishSettings.threshold}%</span>
                  </div>
                  <Progress value={autoReplenishSettings.threshold} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Safety Buffer</label>
                  <p className="text-sm text-muted-foreground">
                    Order {autoReplenishSettings.bufferDays} days before predicted depletion
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="mb-3">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slack alerts</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile push notifications</span>
                    <Button variant="outline" size="sm">Configure</Button>
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