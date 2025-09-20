import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, AlertTriangle, Target, Brain, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart, ComposedChart } from 'recharts';

const historicalData = [
  { month: 'Jul 2023', actual: 4200, predicted: null, saas: 1800, infrastructure: 1200, office: 800, services: 400 },
  { month: 'Aug 2023', actual: 4800, predicted: null, saas: 2100, infrastructure: 1400, office: 900, services: 400 },
  { month: 'Sep 2023', actual: 5200, predicted: null, saas: 2200, infrastructure: 1600, office: 950, services: 450 },
  { month: 'Oct 2023', actual: 4900, predicted: null, saas: 2000, infrastructure: 1500, office: 900, services: 500 },
  { month: 'Nov 2023', actual: 6100, predicted: null, saas: 2800, infrastructure: 1800, office: 1000, services: 500 },
  { month: 'Dec 2023', actual: 5800, predicted: null, saas: 2600, infrastructure: 1700, office: 1000, services: 500 },
  { month: 'Jan 2024', actual: 6900, predicted: 6850, saas: 3200, infrastructure: 2000, office: 1200, services: 500 },
  { month: 'Feb 2024', actual: null, predicted: 7200, saas: 3300, infrastructure: 2100, office: 1300, services: 500 },
  { month: 'Mar 2024', actual: null, predicted: 7800, saas: 3600, infrastructure: 2200, office: 1500, services: 500 },
  { month: 'Apr 2024', actual: null, predicted: 8200, saas: 3800, infrastructure: 2400, office: 1500, services: 500 },
  { month: 'May 2024', actual: null, predicted: 8600, saas: 4000, infrastructure: 2600, office: 1500, services: 500 },
  { month: 'Jun 2024', actual: null, predicted: 9100, saas: 4200, infrastructure: 2800, office: 1600, services: 500 }
];

const modelMetrics = [
  { model: 'Prophet (Time Series)', accuracy: 92.5, description: 'Seasonal trend analysis with growth forecasting' },
  { model: 'XGBoost (ML)', accuracy: 89.2, description: 'Feature-based prediction using business metrics' },
  { model: 'Linear Regression', accuracy: 76.8, description: 'Simple trend-based forecasting baseline' },
  { model: 'Ensemble Average', accuracy: 94.1, description: 'Combined prediction from multiple models' }
];

const upcomingEvents = [
  { event: 'Q1 Marketing Campaign', impact: 2400, month: 'Feb 2024', confidence: 88, type: 'increase' },
  { event: 'AWS Reserved Instance Discount', impact: -800, month: 'Mar 2024', confidence: 95, type: 'decrease' },
  { event: 'New Hire (2 Developers)', impact: 1800, month: 'Apr 2024', confidence: 75, type: 'increase' },
  { event: 'Office Lease Renewal', impact: 1200, month: 'May 2024', confidence: 92, type: 'increase' }
];

const categoryBreakdown = [
  { category: 'SaaS Tools', current: 3200, predicted: 4200, growth: 31.25, confidence: 90 },
  { category: 'Infrastructure', current: 2000, predicted: 2800, growth: 40, confidence: 85 },
  { category: 'Office & Operations', current: 1200, predicted: 1600, growth: 33.33, confidence: 78 },
  { category: 'Professional Services', current: 500, predicted: 500, growth: 0, confidence: 95 }
];

export function ExpenditurePrediction() {
  const [selectedModel, setSelectedModel] = useState('ensemble');
  const [predictionHorizon, setPredictionHorizon] = useState('6');

  const currentMonthSpend = 6900;
  const nextMonthPrediction = 7200;
  const increasePercentage = ((nextMonthPrediction - currentMonthSpend) / currentMonthSpend) * 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Next Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${nextMonthPrediction.toLocaleString()}</div>
            <p className="text-xs text-blue-600">+{increasePercentage.toFixed(1)}% from current</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Model Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">94.1%</div>
            <p className="text-xs text-muted-foreground">Ensemble model performance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Burn Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${(currentMonthSpend / 30).toFixed(0)}/day</div>
            <p className="text-xs text-muted-foreground">Current daily average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">Predicted expense events</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forecast">Forecast Overview</TabsTrigger>
          <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
          <TabsTrigger value="models">Model Performance</TabsTrigger>
          <TabsTrigger value="events">Event Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expenditure Forecast</CardTitle>
              <CardDescription>
                AI-powered predictions based on historical spending patterns and business growth
              </CardDescription>
              <div className="flex gap-4">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ensemble">Ensemble Model</SelectItem>
                    <SelectItem value="prophet">Prophet (Time Series)</SelectItem>
                    <SelectItem value="xgboost">XGBoost (ML)</SelectItem>
                    <SelectItem value="linear">Linear Regression</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={predictionHorizon} onValueChange={setPredictionHorizon}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Forecast period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months ahead</SelectItem>
                    <SelectItem value="6">6 months ahead</SelectItem>
                    <SelectItem value="12">12 months ahead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`$${value?.toLocaleString()}`, name === 'actual' ? 'Actual' : 'Predicted']} />
                  <Area type="monotone" dataKey="predicted" fill="#8884d8" fillOpacity={0.3} stroke="none" />
                  <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="predicted" stroke="#8884d8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 15% monthly growth trend detected</li>
                    <li>• SaaS spending accelerating (+31%)</li>
                    <li>• Seasonal patterns in Q4 spending</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Confidence Intervals</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Next month: ±5% ($6,840 - $7,560)</li>
                    <li>• 3 months: ±12% ($6,864 - $8,736)</li>
                    <li>• 6 months: ±20% ($7,280 - $10,920)</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Risk Factors</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• New hire impact uncertainty</li>
                    <li>• Marketing campaign budget TBD</li>
                    <li>• Economic conditions variable</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Growth Predictions</CardTitle>
              <CardDescription>Detailed forecasts for each spending category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((cat, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{cat.category}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{cat.confidence}% confident</Badge>
                        <Badge variant={cat.growth > 20 ? 'destructive' : cat.growth > 0 ? 'secondary' : 'default'}>
                          {cat.growth > 0 ? '+' : ''}{cat.growth.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current (Jan):</span>
                        <p className="font-medium">${cat.current.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Predicted (Jun):</span>
                        <p className="font-medium">${cat.predicted.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">6-month increase:</span>
                        <p className="font-medium">${(cat.predicted - cat.current).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Category Spending Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={historicalData.slice(-8)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Amount']} />
                      <Area type="monotone" dataKey="saas" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="infrastructure" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="office" stackId="1" stroke="#ffc658" fill="#ffc658" />
                      <Area type="monotone" dataKey="services" stackId="1" stroke="#ff7300" fill="#ff7300" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Comparison</CardTitle>
              <CardDescription>
                Different AI models used for expenditure prediction and their accuracy scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelMetrics.map((model, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{model.model}</h4>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                      </div>
                      <Badge variant={model.accuracy > 90 ? 'default' : 'secondary'}>
                        {model.accuracy}% accurate
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Prediction accuracy on test data</span>
                        <span>{model.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${model.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Ensemble Model Selected</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      We use a weighted combination of Prophet and XGBoost models to achieve the highest accuracy. 
                      The ensemble automatically adjusts weights based on recent performance to maintain optimal predictions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predicted Impact Events</CardTitle>
              <CardDescription>
                Business events that may significantly affect future expenditures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{event.event}</h4>
                        <p className="text-sm text-muted-foreground">{event.month}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{event.confidence}% likely</Badge>
                        <Badge variant={event.type === 'increase' ? 'destructive' : 'default'}>
                          {event.impact > 0 ? '+' : ''}${event.impact.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {event.type === 'increase' ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />
                      )}
                      <span className="text-sm">
                        {event.type === 'increase' ? 'Expected to increase' : 'Expected to decrease'} monthly spend
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Impact Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={upcomingEvents}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Impact']} />
                        <Bar dataKey="impact" fill={(entry) => entry.impact > 0 ? '#ef4444' : '#22c55e'} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}