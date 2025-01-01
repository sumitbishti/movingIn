import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background py-8 px-6 w-full flex justify-center items-center mb-4">
      <div className="flex flex-col-reverse md:flex-row text-sm flex-wrap justify-center items-center">
        <div className="mx-4">
          <a href="/">LOGO</a>
          <span>{" "}&copy; 2024 Mi.</span>
        </div>
        <nav>
          <ul className="mb-2 md:mb-0 flex justify-center items-center space-x-4 flex-wrap">
            <li>
              <Link
                href="/privacy"
                className="text-foreground hover:text-primary"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-foreground hover:text-primary"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-foreground hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-foreground hover:text-primary">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-foreground hover:text-primary">
                Manage Cookies
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
