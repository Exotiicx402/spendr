import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/for-businesses" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            For Businesses
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-white hover:text-black" asChild>
            <Link href="/for-businesses">List Your Business</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
