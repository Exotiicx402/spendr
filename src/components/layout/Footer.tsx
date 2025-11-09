import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20 bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-white">Spendr</h3>
            <p className="text-sm text-gray-400">
              Connecting crypto holders with businesses that accept digital assets.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-white transition-colors">
                  Explore Businesses
                </Link>
              </li>
              <li>
                <Link href="/for-businesses" className="text-gray-400 hover:text-white transition-colors">
                  For Businesses
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Spendr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
