import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  about: {
    title: 'ABOUT US',
    links: [
      { name: 'Works', href: '/works' },
      { name: 'Strategy', href: '/strategy' },
      { name: 'Releases', href: '/releases' },
      { name: 'Press', href: '/press' },
      { name: 'Mission', href: '/mission' },
    ],
  },
  customers: {
    title: 'CUSTOMERS',
    links: [
      { name: 'Tranding', href: '/tranding' },
      { name: 'Popular', href: '/popular' },
      { name: 'Customers', href: '/customers' },
      { name: 'Features', href: '/features' },
    ],
  },
  support: {
    title: 'SUPPORT',
    links: [
      { name: 'Developers', href: '/developers' },
      { name: 'Support', href: '/support' },
      { name: 'Customer Service', href: '/customer-service' },
      { name: 'Get Started', href: '/get-started' },
      { name: 'Guide', href: '/guide' },
    ],
  },
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
];

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-3">
            <div className="flex items-center mb-4">
              <Image src="/images/digibook.svg" alt="DigiBook" width={120} height={40} className="h-10 w-auto" />
            </div>
            <p className="text-gray-600 text-sm">DigiBook merupakan platform digital untuk meningkatkan literasi digital yang dapat diakses oleh semua orang dengan mudah.</p>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link key={social.name} href={social.href} className="text-gray-400 hover:text-blue-500 transition-colors">
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">DigiBook - © {new Date().getFullYear()} All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
}
