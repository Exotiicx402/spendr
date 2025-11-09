import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <Coins className="h-8 w-8" />
          <span>Spendr</span>
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
