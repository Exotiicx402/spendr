import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileMenuButton } from "@/components/ui/mobile-menu-button";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile Menu Button - Only on mobile */}
        <MobileMenuButton />
        
        {/* Logo - Shows on both mobile and desktop */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/spendr-logo.png" 
            alt="Spendr" 
            width={120} 
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/for-businesses" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            For Businesses
          </Link>
        </nav>
        
        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" className="border-gray-600 text-black bg-white hover:bg-gray-200" asChild>
            <Link href="/for-businesses">List Your Business</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
