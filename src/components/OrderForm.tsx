import { useMemo, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, ChevronsUpDown, Check } from 'lucide-react';
import { CustomerDetails } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import citiesJson from '../../resources/sri_lanka_cities.json';

interface OrderFormProps {
  onBack: () => void;
}

export const OrderForm = ({ onBack }: OrderFormProps) => {
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', address: '', phone1: '', phone2: '' });
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; addressLine?: string; city?: string; phone1?: string; phone2?: string }>({});

  const cities: string[] = useMemo(() => {
    // Accept either a flat array of strings or an object with a cities array
    const raw: string[] = Array.isArray(citiesJson)
      ? (citiesJson as string[])
      : // @ts-ignore
        citiesJson?.cities
        ? // @ts-ignore
          (citiesJson.cities as any[]).map((c) => (typeof c === 'string' ? c : c.name))
        : [];
    const formatCity = (s: string) => s.replace(/\s*\([^)]*\)/g, '').trim();
    const formatted = raw.map(formatCity).filter(Boolean);
    // Deduplicate while preserving order
    return Array.from(new Set(formatted));
  }, []);

  const validateName = (v: string) => {
    const stripped = v.replace(/\s+/g, '');
    if (stripped.length < 5) return 'Full name must be more than 4 letters';
    if (!/^[A-Za-z ]+$/.test(v)) return 'Only letters and spaces are allowed';
    return '';
  };

  const validateAddressLine = (v: string) => {
    const stripped = v.replace(/\s+/g, '');
    if (stripped.length < 11) return 'Address must be more than 10 characters';
    return '';
  };

  const isSriLankaMobile = (v: string) => /^(07\d{8}|\+947\d{8})$/.test(v);

  const validatePhone = (v: string, required = false) => {
    if (!v) return required ? 'Phone number is required' : '';
    if (!/^\+?\d+$/.test(v)) return 'Digits only ("+" allowed at start)';
    if (v.startsWith('+') && !/^\+94\d{9}$/.test(v)) return 'Use format +947XXXXXXXX';
    if (!v.startsWith('+') && v.length !== 10) return 'Must be 10 digits (07XXXXXXXX)';
    if (!isSriLankaMobile(v)) return 'Must be a Sri Lankan mobile number';
    return '';
  };

  const runValidation = () => {
    const nameErr = validateName(customer.name);
    const addrErr = validateAddressLine(addressLine);
    const cityErr = city ? '' : 'Please select your city';
    const p1Err = validatePhone(customer.phone1, true);
    const p2Err = validatePhone(customer.phone2 || '', false);
    const next = { name: nameErr || undefined, addressLine: addrErr || undefined, city: cityErr || undefined, phone1: p1Err || undefined, phone2: p2Err || undefined };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!runValidation()) {
      toast({ title: 'Please fix the form', description: 'Some fields need your attention.', variant: 'destructive' });
      return;
    }

    // Create WhatsApp message
    const orderItems = state.items
      .map(item => `${item.name} ${item.weight}: ${item.quantity} nos`)
      .join('\n');

    const fullAddress = `${addressLine}, ${city}`;
    const message = `${orderItems}

Total: Rs. ${state.total.toLocaleString()}

Customer details:
Name: ${customer.name}
Address: ${fullAddress}
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
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customer.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setCustomer({ ...customer, name });
                      setErrors((er) => ({ ...er, name: validateName(name) || undefined }));
                    }}
                    required
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="addressLine">Address *</Label>
                  <Textarea
                    id="addressLine"
                    value={addressLine}
                    onChange={(e) => {
                      const v = e.target.value;
                      setAddressLine(v);
                      setErrors((er) => ({ ...er, addressLine: validateAddressLine(v) || undefined }));
                    }}
                    required
                    placeholder="House No, Street, Area"
                    rows={3}
                  />
                  {errors.addressLine && <p className="text-sm text-destructive mt-1">{errors.addressLine}</p>}
                </div>

                <div>
                  <Label>City *</Label>
                  <Popover open={cityOpen} onOpenChange={setCityOpen}>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" role="combobox" aria-expanded={cityOpen} className="w-full justify-between">
                        {city ? city : 'Select city'}
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput placeholder="Search city..." />
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {cities.map((c) => (
                              <CommandItem
                                key={c}
                                value={c}
                                onSelect={() => {
                                  setCity(c);
                                  setCityOpen(false);
                                  setErrors((er) => ({ ...er, city: undefined }));
                                }}
                              >
                                <Check className={`mr-2 h-4 w-4 ${city === c ? 'opacity-100' : 'opacity-0'}`} />
                                {c}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="phone1">Contact Number 1 *</Label>
                  <Input
                    id="phone1"
                    type="tel"
                    value={customer.phone1}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCustomer({ ...customer, phone1: v });
                      setErrors((er) => ({ ...er, phone1: validatePhone(v, true) || undefined }));
                    }}
                    required
                    placeholder="07XXXXXXXX"
                  />
                  {errors.phone1 && <p className="text-sm text-destructive mt-1">{errors.phone1}</p>}
                </div>

                <div>
                  <Label htmlFor="phone2">Contact Number 2 (Optional)</Label>
                  <Input
                    id="phone2"
                    type="tel"
                    value={customer.phone2}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCustomer({ ...customer, phone2: v });
                      setErrors((er) => ({ ...er, phone2: validatePhone(v, false) || undefined }));
                    }}
                    placeholder="07XXXXXXXX"
                  />
                  {errors.phone2 && <p className="text-sm text-destructive mt-1">{errors.phone2}</p>}
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