import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

export default function MobileNavbar({ navigation }: { navigation: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className={cn('flex flex-col items-center p-2 text-xs', pathname === item.href ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600')}>
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
