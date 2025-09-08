import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { CustomerDetails } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface OrderFormProps {
  onBack: () => void;
}

export const OrderForm = ({ onBack }: OrderFormProps) => {
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    address: '',
    phone1: '',
    phone2: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer.name || !customer.address || !customer.phone1) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Create WhatsApp message
    const orderItems = state.items
      .map(item => `${item.name} ${item.weight}: ${item.quantity} nos`)
      .join('\n');
    
    const message = `${orderItems}

Total: Rs. ${state.total.toLocaleString()}

Customer details:
Name: ${customer.name}
Address: ${customer.address}
Contact number 1: ${customer.phone1}${customer.phone2 ? `\nContact number 2: ${customer.phone2}` : ''}`;
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/94769065675?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and show success message
    clearCart();
    toast({
      title: "Order Sent!",
      description: "Your order has been sent via WhatsApp. We'll contact you soon!"
    });
    
    onBack();
  };
  
  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Complete Your Order</h1>
        </div>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.name} {item.weight}</span>
                      <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                    </div>
                    <span className="font-semibold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-xl font-bold text-primary">
                    Rs. {state.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Customer Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    required
                    placeholder="Enter your complete delivery address"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone1">Contact Number 1 *</Label>
                  <Input
                    id="phone1"
                    type="tel"
                    value={customer.phone1}
                    onChange={(e) => setCustomer({ ...customer, phone1: e.target.value })}
                    required
                    placeholder="07XXXXXXXX"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone2">Contact Number 2 (Optional)</Label>
                  <Input
                    id="phone2"
                    type="tel"
                    value={customer.phone2}
                    onChange={(e) => setCustomer({ ...customer, phone2: e.target.value })}
                    placeholder="07XXXXXXXX"
                  />
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Delivery Information:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• FREE delivery island-wide</li>
                    <li>• Delivered within 3 working days</li>
                    <li>• Saturday & Sunday are not working days</li>
                    <li>• COD (Cash on Delivery) available</li>
                    <li>• Money back guarantee if package is damaged</li>
                  </ul>
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Order via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};