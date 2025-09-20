import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { 
  Factory, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Calculator, 
  Calendar, 
  Briefcase,
  Package,
  Lightbulb,
  AlertTriangle,
  Target,
  Home
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { ProcurementTracker } from './components/ProcurementTracker';
import { SmartRecommendations } from './components/SmartRecommendations';
import { StockReplenishment } from './components/StockReplenishment';
import { InvoiceScanner } from './components/InvoiceScanner';
import { ExpenditurePrediction } from './components/ExpenditurePrediction';
import { WhatIfScenarios } from './components/WhatIfScenarios';
import { EventRegistration } from './components/EventRegistration';
import { TenderBidding } from './components/TenderBidding';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { 
    label: 'Operations & Inventory', 
    icon: Factory,
    items: [
      { id: 'procurement', label: 'Procurement Tracker', icon: Package },
      { id: 'recommendations', label: 'Smart Recommendations', icon: Lightbulb },
      { id: 'stock', label: 'Stock Replenishment', icon: AlertTriangle }
    ]
  },
  { 
    label: 'Finance & Forecasting', 
    icon: DollarSign,
    items: [
      { id: 'invoices', label: 'Invoice Scanner', icon: FileText },
      { id: 'prediction', label: 'Expenditure Prediction', icon: TrendingUp },
      { id: 'scenarios', label: 'What-if Scenarios', icon: Calculator }
    ]
  },
  { 
    label: 'Growth & Opportunities', 
    icon: Target,
    items: [
      { id: 'events', label: 'Event Registration', icon: Calendar },
      { id: 'tenders', label: 'Tender Bidding', icon: Briefcase }
    ]
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'procurement':
        return <ProcurementTracker />;
      case 'recommendations':
        return <SmartRecommendations />;
      case 'stock':
        return <StockReplenishment />;
      case 'invoices':
        return <InvoiceScanner />;
      case 'prediction':
        return <ExpenditurePrediction />;
      case 'scenarios':
        return <WhatIfScenarios />;
      case 'events':
        return <EventRegistration />;
      case 'tenders':
        return <TenderBidding />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div className="p-4">
              <h2 className="mb-4">StartupOps AI</h2>
            </div>
            {menuItems.map((item, index) => (
              <SidebarGroup key={index}>
                {item.items ? (
                  <>
                    <SidebarGroupLabel className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.id}>
                            <SidebarMenuButton
                              onClick={() => setActiveSection(subItem.id)}
                              isActive={activeSection === subItem.id}
                            >
                              <subItem.icon className="h-4 w-4" />
                              {subItem.label}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </>
                ) : (
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => setActiveSection(item.id)}
                          isActive={activeSection === item.id}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <SidebarTrigger />
              <h1 className="text-3xl">
                {menuItems.find(item => item.id === activeSection)?.label || 
                 menuItems.find(item => item.items?.some(subItem => subItem.id === activeSection))?.items?.find(subItem => subItem.id === activeSection)?.label ||
                 'Dashboard'}
              </h1>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}