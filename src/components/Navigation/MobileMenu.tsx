import { Button } from '@/components/ui/button';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, Phone, Mail, Clock } from 'lucide-react';

interface MobileMenuProps {
  onClose: () => void;
}

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const menuItems = [
    { label: 'Home', href: '#home' },
    { 
      label: 'Products', 
      href: '#products',
      hasSubmenu: true,
      submenuItems: [
        { label: 'All Products', href: '#products' },
        { label: 'Coffee', href: '#products?category=coffee' },
        { label: 'Tea', href: '#products?category=tea' },
        { label: 'Malt Drinks', href: '#products?category=malt' },
        { label: 'Specialty', href: '#products?category=specialty' },
      ]
    },
    { label: 'About Us', href: '#about' },
    { label: 'Vision & Mission', href: '#vision-mission' },
    { label: 'Service Area', href: '#service-area' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose();
  };

  return (
    <div className="lg:hidden border-t bg-background">
      <div className="px-4 py-6 space-y-4">
        {/* Contact Info for Mobile */}
        <div className="space-y-3 pb-4 border-b">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span>0769065675, 0715593003</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            <span>nescafrent@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>24/7 Service Available</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.hasSubmenu ? (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between text-left font-medium"
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-4">
                    {item.submenuItems?.map((subItem) => (
                      <Button
                        key={subItem.label}
                        variant="ghost"
                        className="w-full justify-start text-sm text-muted-foreground"
                        onClick={() => handleClick(subItem.href)}
                      >
                        {subItem.label}
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                  onClick={() => handleClick(item.href)}
                >
                  {item.label}
                </Button>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
