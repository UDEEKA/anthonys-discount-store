import { Link } from 'react-router-dom';
import { useState } from 'react';
import { primaryNav, productCategories, WHATSAPP_LINK, TEL_LINK } from '@/data/nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, Phone, Search, ShoppingCart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo_1.png" alt="Anthony's Discount Store" className="h-10 w-auto rounded-full" />
            <span className="sr-only">Home</span>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {primaryNav.map((item) => {
              if (item.label === 'Products') {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="inline-flex items-center gap-1 font-medium hover:text-primary focus:outline-none">
                      Products <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-48">
                      {productCategories.map((cat) => (
                        <DropdownMenuItem key={cat.slug} asChild>
                          <Link to={cat.href}>{cat.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link key={item.label} to={item.href} className="font-medium hover:text-primary">
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex" title="Call us">
              <a href={TEL_LINK}>
                <Phone className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" title="Search">
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80" aria-label="Mobile navigation">
                <div className="mt-6 flex flex-col gap-2">
                  {primaryNav.map((item) => {
                    if (item.label === 'Products') {
                      return (
                        <Accordion type="single" collapsible className="border rounded-md" key={item.label}>
                          <AccordionItem value="products">
                            <AccordionTrigger className="px-4 py-3 font-semibold">
                              Products
                            </AccordionTrigger>
                            <AccordionContent className="px-2 pb-3">
                              {productCategories.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  to={cat.href}
                                  className="block px-2 py-2 rounded hover:bg-muted"
                                  onClick={() => setOpen(false)}
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="px-4 py-3 rounded hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Button asChild variant="secondary">
                      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={TEL_LINK}>Call Us</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
