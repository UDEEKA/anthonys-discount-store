import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export const NavMenu = () => {
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { label: 'Home', href: '#home' },
    { 
      label: 'Products', 
      href: '#products',
      hasDropdown: true,
      dropdownItems: [
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
  };

  return (
    <nav className="flex items-center space-x-8">
      {menuItems.map((item) => (
        <div key={item.label}>
          {item.hasDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-1 text-sm font-medium hover:text-primary"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {item.dropdownItems?.map((dropdownItem) => (
                  <DropdownMenuItem 
                    key={dropdownItem.label}
                    onClick={() => handleClick(dropdownItem.href)}
                    className="cursor-pointer"
                  >
                    {dropdownItem.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              className={`text-sm font-medium hover:text-primary ${
                activeItem === item.label.toLowerCase().replace(' ', '-') 
                  ? 'text-primary' 
                  : ''
              }`}
              onClick={() => {
                setActiveItem(item.label.toLowerCase().replace(' ', '-'));
                handleClick(item.href);
              }}
            >
              {item.label}
            </Button>
          )}
        </div>
      ))}
    </nav>
  );
};
