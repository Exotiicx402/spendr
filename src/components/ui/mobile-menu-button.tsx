"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export function MobileMenuButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        className="group md:hidden"
        variant="outline"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          className="pointer-events-none"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
          />
          <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
          />
        </svg>
      </Button>

      {/* Mobile Menu Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Menu</h2>
              <Button
                className="group"
                variant="outline"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </Button>
            </div>
            <nav className="flex flex-col gap-4">
              <Link 
                href="/explore" 
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                Explore
              </Link>
              <Link 
                href="/for-businesses" 
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                For Businesses
              </Link>
              <div className="pt-4 border-t border-gray-800">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-black bg-white hover:bg-gray-200" 
                  asChild
                >
                  <Link href="/for-businesses">List Your Business</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
