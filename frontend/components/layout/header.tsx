"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, Globe } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Cookies from "js-cookie"

interface NavigationItem {
  name: string
  href: string
  children?: NavigationItem[]
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const accessToken = Cookies.get("access_token")
    setIsAuthenticated(!!accessToken)
  }, [])

  const handleLanguageChange = (locale: string) => {
    // Get the current path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '')
    // Navigate to the same path with the new locale
    router.push(`/${locale}${pathWithoutLocale}`)
  }

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/" },
    { 
      name: "Services", 
      href: "/services",
      children: [
        { name: "Web Development", href: "/services/web-development" },
        { name: "SEO", href: "/services/seo" },
        { name: "Social Media", href: "/services/social-media" }
      ]
    },
    { name: "About", href: "/apropos" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">DigiFlow</span>
            <span className="text-sm text-muted-foreground">Agency</span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item: NavigationItem) => (
            <div key={item.name} className="relative">
              {item.children ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.children.map((child: NavigationItem) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link href={child.href}>{child.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                <span className="flex items-center gap-2">
                  <span className="text-sm">Français</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                <span className="flex items-center gap-2">
                  <span className="text-sm">English</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                <span className="flex items-center gap-2">
                  <span className="text-sm">العربية</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          <div className="hidden lg:flex lg:gap-x-4">
            {isAuthenticated ? (
              <>
                <Button asChild>
                  <Link href="/dashboard">Client Area</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/logout">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/client/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-6">
                {navigation.map((item: NavigationItem) => (
                  <div key={item.name} className="space-y-3">
                    {item.children ? (
                      <>
                        <div className="font-medium">{item.name}</div>
                        <div className="pl-4 space-y-2">
                          {item.children.map((child: NavigationItem) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block text-muted-foreground hover:text-foreground"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block font-medium hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  {isAuthenticated ? (
                    <>
                      <Button asChild>
                        <Link href="/dashboard">Client Area</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/auth/logout">Logout</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild>
                        <Link href="/contact">Get Quote</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/client/login">Login</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
