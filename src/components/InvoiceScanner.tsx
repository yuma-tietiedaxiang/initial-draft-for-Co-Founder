import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, FileText, Eye, Download, Check, X, Loader2, Scan } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';

const scannedInvoices = [
  {
    id: 1,
    filename: 'slack_invoice_jan2024.pdf',
    date: '2024-01-15',
    vendor: 'Salesforce (Slack)',
    amount: 960,
    extractedFields: {
      invoiceNumber: 'SLK-2024-001',
      dueDate: '2024-02-15',
      tax: 96,
      total: 1056,
      lineItems: [
        { description: 'Slack Business+ Plan', quantity: 1, unitPrice: 960, total: 960 }
      ]
    },
    confidence: 96,
    status: 'processed',
    category: 'SaaS'
  },
  {
    id: 2,
    filename: 'aws_billing_jan2024.pdf',
    date: '2024-01-10',
    vendor: 'Amazon Web Services',
    amount: 285.50,
    extractedFields: {
      invoiceNumber: 'AWS-2024-001234',
      dueDate: '2024-01-25',
      tax: 28.55,
      total: 314.05,
      lineItems: [
        { description: 'EC2 Instances', quantity: 1, unitPrice: 200, total: 200 },
        { description: 'S3 Storage', quantity: 1, unitPrice: 45.50, total: 45.50 },
        { description: 'CloudFront CDN', quantity: 1, unitPrice: 40, total: 40 }
      ]
    },
    confidence: 92,
    status: 'processed',
    category: 'Infrastructure'
  },
  {
    id: 3,
    filename: 'office_supplies_receipt.jpg',
    date: '2024-01-08',
    vendor: 'Staples',
    amount: 156.78,
    extractedFields: {
      invoiceNumber: 'STP-789456',
      dueDate: null,
      tax: 12.54,
      total: 169.32,
      lineItems: [
        { description: 'Printer Paper (5 reams)', quantity: 5, unitPrice: 8.99, total: 44.95 },
        { description: 'Blue Pens (12-pack)', quantity: 3, unitPrice: 12.99, total: 38.97 },
        { description: 'Sticky Notes Assorted', quantity: 4, unitPrice: 18.22, total: 72.88 }
      ]
    },
    confidence: 88,
    status: 'processed',
    category: 'Office Supplies'
  },
  {
    id: 4,
    filename: 'figma_subscription.pdf',
    date: '2024-01-05',
    vendor: 'Figma Inc.',
    amount: 144,
    extractedFields: {
      invoiceNumber: 'FIG-2024-5678',
      dueDate: '2024-01-20',
      tax: 14.40,
      total: 158.40,
      lineItems: [
        { description: 'Figma Professional Plan', quantity: 1, unitPrice: 144, total: 144 }
      ]
    },
    confidence: 94,
    status: 'processed',
    category: 'SaaS'
  }
];

const processingQueue = [
  {
    id: 5,
    filename: 'google_workspace_bill.pdf',
    progress: 75,
    stage: 'Extracting line items...',
    estimatedTime: '30 seconds'
  },
  {
    id: 6,
    filename: 'hardware_invoice.jpg',
    progress: 45,
    stage: 'OCR text recognition...',
    estimatedTime: '1 minute'
  }
];

export function InvoiceScanner() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof scannedInvoices[0] | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const totalAmount = scannedInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const avgConfidence = scannedInvoices.reduce((sum, invoice) => sum + invoice.confidence, 0) / scannedInvoices.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Processed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{scannedInvoices.length}</div>
            <p className="text-xs text-muted-foreground">Invoices this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Amount</CardTitle>
            <Scan className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Extracted from invoices</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg. Confidence</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{avgConfidence.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">OCR accuracy</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Processing</CardTitle>
            <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{processingQueue.length}</div>
            <p className="text-xs text-muted-foreground">In queue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload & Scan</TabsTrigger>
          <TabsTrigger value="processed">Processed Invoices</TabsTrigger>
          <TabsTrigger value="queue">Processing Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Invoice</CardTitle>
              <CardDescription>
                Upload PDF, JPG, or PNG files. Our AI will extract vendor, amount, line items, and other key details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-lg">Drop files here or click to upload</p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, JPG, PNG up to 10MB
                  </p>
                </div>
                <div className="mt-4">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild>
                      <span>Choose Files</span>
                    </Button>
                  </label>
                </div>
              </div>

              {isUploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading and processing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Scan className="mx-auto h-6 w-6 text-blue-500 mb-2" />
                  <h4 className="font-medium">OCR Extraction</h4>
                  <p className="text-sm text-muted-foreground">Advanced text recognition</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Check className="mx-auto h-6 w-6 text-green-500 mb-2" />
                  <h4 className="font-medium">Data Validation</h4>
                  <p className="text-sm text-muted-foreground">AI-powered accuracy checks</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <FileText className="mx-auto h-6 w-6 text-purple-500 mb-2" />
                  <h4 className="font-medium">Auto-Categorization</h4>
                  <p className="text-sm text-muted-foreground">Smart expense classification</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processed Invoices</CardTitle>
              <CardDescription>Successfully extracted invoice data ready for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scannedInvoices.map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{invoice.filename}</h4>
                        <p className="text-sm text-muted-foreground">
                          {invoice.vendor} • {invoice.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{invoice.confidence}% confident</Badge>
                        <Badge>{invoice.category}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Invoice #:</span>
                        <p className="font-medium">{invoice.extractedFields.invoiceNumber}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <p className="font-medium">${invoice.amount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span>
                        <p className="font-medium">{invoice.extractedFields.dueDate || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total (inc. tax):</span>
                        <p className="font-medium">${invoice.extractedFields.total}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Export Data
                      </Button>
                      <Button size="sm" variant="outline">Add to Expenses</Button>
                      <Button size="sm" variant="ghost">
                        <X className="h-3 w-3 mr-1" />
                        Mark Incorrect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Invoice View Modal */}
          {selectedInvoice && (
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details: {selectedInvoice.filename}</CardTitle>
                <CardDescription>
                  Extracted data with {selectedInvoice.confidence}% confidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vendor:</span>
                        <span>{selectedInvoice.vendor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Invoice #:</span>
                        <span>{selectedInvoice.extractedFields.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{selectedInvoice.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span>{selectedInvoice.extractedFields.dueDate || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="outline">{selectedInvoice.category}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Financial Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>${selectedInvoice.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax:</span>
                        <span>${selectedInvoice.extractedFields.tax}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2">
                        <span>Total:</span>
                        <span>${selectedInvoice.extractedFields.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Line Items</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.extractedFields.lineItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.unitPrice}</TableCell>
                          <TableCell>${item.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button>Approve & Add to Expenses</Button>
                  <Button variant="outline">Edit Details</Button>
                  <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processing Queue</CardTitle>
              <CardDescription>Invoices currently being processed by our AI system</CardDescription>
            </CardHeader>
            <CardContent>
              {processingQueue.length > 0 ? (
                <div className="space-y-4">
                  {processingQueue.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{item.filename}</h4>
                        <Badge variant="outline">Processing</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.stage}</span>
                          <span>ETA: {item.estimatedTime}</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {item.progress}% complete
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg">No files in processing queue</p>
                  <p className="text-sm text-muted-foreground">
                    Upload some invoices to get started with AI extraction
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}