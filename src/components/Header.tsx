"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background p-4 fixed top-0 flex w-full z-50">
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          moveIn
        </Link>

        {/* Search */}
        <SearchBar />

        {/* Right-side actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle (Hidden on small screens) */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Sign Up Button (Always visible) */}
          <Button>Sign Up</Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="bg-background md:hidden">
          <ul className="flex flex-col justify-center items-center space-y-0 pt-4 pb-2">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/products", label: "Products" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => {
              return (
                <li
                  key={href}
                  className="block w-full text-center h-12 flex justify-center items-center"
                >
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-1 rounded-md 
                    text-foreground active:bg-accent/80
                    hover:bg-accent hover:text-accent-foreground 
                    transition-colors duration-200 h-full flex justify-center items-center"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="block w-full text-center block w-full">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
