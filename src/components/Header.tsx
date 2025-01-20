"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Search, X, ArrowLeft, Github } from "lucide-react";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  useEffect(() => {
    if (isSearchBarOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchBarOpen]);

  return (
    <header className="bg-background p-4 fixed top-0 flex flex-col w-full z-50 items-center">
      {!isSearchBarOpen ? (
        <div className="container mx-auto flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            moveIn
          </Link>

          {/* Search */}
          <div className="w-[600px] h-[50px] hidden md:block">
            <SearchBar ref={inputRef} />
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-2 hidden md:flex">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/sumitbishti/moveIn"
              className="hover:bg-accent p-2 rounded-full"
            >
              <Github className="h-[20px] w-[20px]" />
            </Link>

            {/* Theme Toggle (Hidden on small screens) */}
            <ThemeToggle />

            {/* Sign Up Button (Always visible) */}
            <Button>Sign Up</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden gap-4 items-center">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/sumitbishti/moveIn"
            >
              <Github className="h-[20px] w-[20px] hover:bg-accent hover:text-accent-foreground" />
            </Link>
            <Search
              className="cursor-pointer h-[20px] w-[20px]"
              onClick={toggleSearchBar}
            />

            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-between items-center gap-2 px-1">
          <ArrowLeft onClick={() => toggleSearchBar()} />
          <div className="w-full h-[50px]">
            <SearchBar ref={inputRef} />
          </div>
        </div>
      )}
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="bg-background md:hidden">
          <ul className="flex flex-col justify-center items-center space-y-0 pt-4">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/products", label: "Products" },
              { href: "/contact", label: "Contact" },
              { href: "/", label: "Sign up" },
            ].map(({ href, label }, index) => {
              return (
                <li
                  key={`${index}-${href}`}
                  className="w-full text-center py-2 flex justify-center items-center hover:bg-secondary rounded-xl"
                >
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full rounded-md 
                    text-foreground active:bg-accent/80
                    hover:bg-accent hover:text-accent-foreground 
                    transition-colors duration-200 h-full flex justify-center items-center"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="block w-full text-center hover:bg-secondary rounded-xl">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
