import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="bg-background py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          mi
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-foreground hover:text-primary"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-foreground hover:text-primary"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
