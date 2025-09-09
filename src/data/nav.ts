// Navigation Information Architecture (Phase 0)
// Centralized data consumed by Navbar and related UI

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  children?: Array<{ label: string; href: string }>;
};

export type ProductCategory = {
  name: string;
  slug: string;
  href: string;
};

export type ContactInfo = {
  whatsapp: string; // E.164 suggested later, raw for now
  phone: string;
  email: string;
  address: string;
};

// Primary nav links (top-level)
export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    // Children will be rendered as dropdown/mega menu
    children: [
      { label: 'Coffee', href: '/products/coffee' },
      { label: 'Tea', href: '/products/tea' },
      { label: 'Malt', href: '/products/malt' },
      { label: 'Chocolate', href: '/products/chocolate' },
    ],
  },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About Us', href: '/about' },
  { label: 'Vision & Mission', href: '/vision-mission' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Offers', href: '/offers' },
];

// Product categories (for Products dropdown, pages, filters, etc.)
export const productCategories: ProductCategory[] = [
  { name: 'Coffee', slug: 'coffee', href: '/products/coffee' },
  { name: 'Tea', slug: 'tea', href: '/products/tea' },
  { name: 'Malt', slug: 'malt', href: '/products/malt' },
  { name: 'Chocolate', slug: 'chocolate', href: '/products/chocolate' },
];

// Service area (expandable later)
export const serviceAreas = {
  coverage: 'All Island',
  items: ['All Island'],
};

// Contact information
export const contactInfo: ContactInfo = {
  whatsapp: '0769065675',
  phone: '0715593003',
  email: 'nescafrent@gmail.com',
  address: '415/D, Podiveekumbura, Ragama',
};

// Quick utility links (for a thin top bar or footer)
export const utilityLinks: NavLink[] = [
  { label: 'Track Order', href: '/track-order' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Blog', href: '/blog' },
];

// Helpful constants
export const WHATSAPP_LINK = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`;
export const MAILTO_LINK = `mailto:${contactInfo.email}`;
export const TEL_LINK = `tel:${contactInfo.phone.replace(/\D/g, '')}`;
