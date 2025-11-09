import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Coins className="h-8 w-8" />
          <span>Spendr</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-sm font-medium hover:underline">
            Explore
          </Link>
          <Link href="/for-businesses" className="text-sm font-medium hover:underline">
            For Businesses
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/for-businesses">List Your Business</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
