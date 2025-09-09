import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MapPin, 
  Truck, 
  Shield, 
  Star,
  Facebook,
  ArrowRight,
  Phone,
  Clock
} from 'lucide-react';

const Index = () => {
  const handleShopNowClick = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
        <div className="container mx-auto text-center relative">
          {/* <Badge className="mb-6 text-sm px-4 py-2">Since 2020 • Island-wide Delivery</Badge> */}
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Premium Premix Packets
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Since 2020, we have been serving happiness in every sip with our premium premix packets. 
            Quick, tasty, and convenient - perfect for home, office, or on the go!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-[var(--shadow-primary)] hover:scale-105 transition-all"
              onClick={handleShopNowClick}
            >
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-5 w-5" />
              <span>FREE Delivery • 3 Days</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">Money back if damaged during delivery</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="pt-6 text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Island-wide Delivery</h3>
                <p className="text-sm text-muted-foreground">Free delivery within 3 working days</p>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardContent className="pt-6 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Best Prices</h3>
                <p className="text-sm text-muted-foreground">Discounted rates on all products</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Products</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Premix Collection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our range of high-quality premix packets at unbeatable prices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Trusted Partner Since 2020
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Anthony's Discount Store, we are passionate about bringing you the finest premix packets 
                at unbeatable prices. Our commitment to quality and customer satisfaction has made us 
                a trusted name across Sri Lanka.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Premium quality products from trusted brands</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Island-wide delivery with care</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>24/7 customer service</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Competitive pricing and discounts</span>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-6">Delivery Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Free Island-wide Delivery</p>
                      <p className="text-sm text-muted-foreground">No additional charges for delivery</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">3 Working Days</p>
                      <p className="text-sm text-muted-foreground">Saturday & Sunday are not working days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Money Back Guarantee</p>
                      <p className="text-sm text-muted-foreground">Full refund if package is damaged during delivery</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Contact Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We are here to help you 24/7
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-[var(--shadow-card)] transition-all">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-2">0769065675</p>
              <p className="text-sm text-muted-foreground">0715593003</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-[var(--shadow-card)] transition-all">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">nescafrent@gmail.com</p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-[var(--shadow-card)] transition-all">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-sm text-muted-foreground">
                415/D, Podiveekumbura<br />Ragama
              </p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-[var(--shadow-card)] transition-all">
              <Facebook className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Social Media</h3>
              <Button variant="outline" size="sm" asChild className="mt-2">
                <a href="https://www.facebook.com/share/19jQ4vV7Vx/" target="_blank" rel="noopener noreferrer">
                  Follow Us
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img 
                src="/assets/logo_1.png" 
                alt="Anthony's Discount Store" 
                className="h-12 w-auto rounded-full"
              />
              <p className="text-sm text-muted-foreground">
                Premium premix packets at discount prices. Serving Sri Lanka since 2020.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.facebook.com/share/19jQ4vV7Vx/" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Nescafe Premix</li>
                <li>Nestea Premix</li>
                <li>Nestomalt Premix</li>
                <li>Milo Hot & Cool</li>
                <li>Ice Coffee Premix</li>
                <li>Cardamom Tea</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Island-wide Delivery</li>
                <li>Cash on Delivery</li>
                <li>24/7 Support</li>
                <li>Quality Guarantee</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>0769065675</li>
                <li>0715593003</li>
                <li>nescafrent@gmail.com</li>
                <li>415/D, Podiveekumbura, Ragama</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Anthony's Discount Store. All rights reserved.</p>
            {/* <p className="mt-2">
              <strong>Terms:</strong> Delivered within 3 working days. Saturday and Sunday not working days. 
              Money will be returned if package is damaged during delivery. COD available. 
              Change of mind or taste preference not acceptable for returns.
            </p> */}
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
};

export default Index;