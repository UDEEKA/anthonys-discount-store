import { Link } from 'react-router-dom';
import { useState } from 'react';
import { primaryNav, productCategories, WHATSAPP_LINK, TEL_LINK, MAILTO_LINK, contactInfo, utilityLinks } from '@/data/nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, Phone, Search, Mail, MapPin } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from '@/components/ThemeToggle';
import SearchCommand from '@/components/SearchCommand';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Inline WhatsApp brand icon (keeps bundle small and avoids version mismatch)
  const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.46 0 .11 5.35.11 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.22-1.64a11.9 11.9 0 0 0 5.84 1.5h.01c6.6 0 11.95-5.35 11.95-11.95 0-3.19-1.24-6.19-3.5-8.43ZM12.06 21.3h-.01a9.36 9.36 0 0 1-4.77-1.31l-.34-.2-3.69.97.99-3.6-.22-.37a9.39 9.39 0 0 1-1.42-4.84c0-5.18 4.21-9.39 9.4-9.39 2.51 0 4.87.98 6.64 2.75a9.36 9.36 0 0 1 2.75 6.64c0 5.18-4.21 9.35-9.33 9.35Zm5.36-7.01c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.61.08-.29-.15-1.21-.45-2.3-1.43-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.14-.14.29-.36.43-.54.14-.18.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44 0 1.44 1.02 2.83 1.16 3.02.14.19 2 3.05 4.86 4.28.68.29 1.21.47 1.63.61.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b">
      {/* Utility top bar */}
      <div className="hidden md:block bg-muted/40 border-b">
        <div className="container mx-auto px-4 py-1 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a href={TEL_LINK} className="inline-flex items-center gap-1 hover:text-foreground">
                <Phone className="h-3.5 w-3.5" /> {contactInfo.phone}
              </a>
              <a href={MAILTO_LINK} className="hidden lg:inline-flex items-center gap-1 hover:text-foreground">
                <Mail className="h-3.5 w-3.5" /> {contactInfo.email}
              </a>
              <span className="hidden lg:inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> All Island Delivery
              </span>
            </div>
            <div className="flex items-center gap-3">
              {utilityLinks.map((u) => (
                <Link key={u.label} to={u.href} className="hover:text-foreground">
                  {u.label}
                </Link>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                <WhatsappIcon className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

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
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" title="Search (Ctrl/⌘+K)" onClick={() => setSearchOpen(true)}>
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
                      <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                        <WhatsappIcon className="h-4 w-4 text-[#25D366]" />
                        <span>WhatsApp</span>
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
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Navbar;
