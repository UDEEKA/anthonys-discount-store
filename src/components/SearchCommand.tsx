import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { products } from '@/data/products';
import { productCategories, primaryNav } from '@/data/nav';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SearchCommand({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const recentKey = 'search_recent_v1';

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  const go = (to: string) => {
    navigate(to);
    onOpenChange(false);
  };

  const pushRecent = (label: string, href: string) => {
    try {
      const raw = localStorage.getItem(recentKey);
      const arr: Array<{ label: string; href: string }> = raw ? JSON.parse(raw) : [];
      const next = [{ label, href }, ...arr.filter((r) => r.href !== href)].slice(0, 5);
      localStorage.setItem(recentKey, JSON.stringify(next));
    } catch {}
  };

  const recent = useMemo<Array<{ label: string; href: string }>>(() => {
    try {
      const raw = localStorage.getItem(recentKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search products, categories, or pages... (Ctrl/⌘+K)" onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Recent searches when no query */}
        {!query && recent.length > 0 && (
          <CommandGroup heading="Recent">
            {recent.map((r) => (
              <CommandItem key={r.href} value={r.label} onSelect={() => go(r.href)}>
                {r.label}
                <CommandShortcut>Enter</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandGroup heading="Products">
          {products.map((p) => (
            <CommandItem
              key={p.id}
              value={`${p.name} ${p.weight} ${p.id}`}
              className="group"
              onSelect={() => {
                pushRecent(`${p.name} ${p.weight}`, `/products#${p.id}`);
                go(`/products#${p.id}`);
              }}
            >
              <img src={p.image} alt={p.name} className="mr-3 h-10 w-10 rounded object-cover bg-muted" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.name}</div>
                <div className="mt-0.5 inline-flex items-center text-[11px] md:text-xs font-medium px-1.5 py-0.5 rounded bg-muted text-foreground/80 group-data-[selected=true]:bg-primary/20 group-data-[selected=true]:text-primary-foreground/90">
                  {p.weight}
                </div>
              </div>
              <span className="ml-3 text-xs md:text-sm font-semibold px-2 py-1 rounded bg-primary/10 text-primary group-data-[selected=true]:bg-primary group-data-[selected=true]:text-primary-foreground whitespace-nowrap">
                Rs. {p.price.toLocaleString()}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Categories">
          {productCategories.map((c) => (
            <CommandItem key={c.slug} value={`${c.name} category`}
              onSelect={() => {
                pushRecent(c.name, c.href);
                go(c.href);
              }}>
              <span className="flex-1">{c.name}</span>
              <CommandShortcut>Enter</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Pages">
          {primaryNav.map((n) => (
            <CommandItem key={n.label} value={n.label}
              onSelect={() => {
                pushRecent(n.label, n.href);
                go(n.href);
              }}>
              <span className="flex-1">{n.label}</span>
              <CommandShortcut>Enter</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        {!query && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Suggestions">
              {['Nescafe 1kg', 'Chocolate premix', 'Island delivery', 'Contact'].map((s) => (
                <CommandItem key={s} value={s}>
                  {s}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
