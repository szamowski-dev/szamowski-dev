"use client"

import { MenuIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const

const githubUrl = "https://github.com/szamski"

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="site-header__inner">
        <a
          className="site-header__brand inline-flex min-h-11 items-center"
          href="#top"
          aria-label="Maciej Szamowski, home"
        >
          Maciej Szamowski
        </a>

        <nav className="site-header__desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              className="site-header__nav-link inline-flex min-h-11 items-center"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
          <Button asChild variant="outline" className="site-header__github min-h-11">
            <a href={githubUrl} rel="noreferrer" target="_blank">
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </nav>

        <div className="site-header__mobile-nav">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="site-header__menu-trigger size-11"
                size="icon"
                variant="ghost"
                aria-label="Open navigation"
              >
                <MenuIcon data-icon="inline-start" />
              </Button>
            </SheetTrigger>

            <SheetContent
              className="site-header__sheet"
              side="right"
              showCloseButton={false}
            >
              <SheetHeader className="site-header__sheet-header">
                <SheetTitle className="site-header__sheet-title">Maciej Szamowski</SheetTitle>
                <SheetDescription className="site-header__sheet-description">
                  Navigate the portfolio.
                </SheetDescription>
              </SheetHeader>

              <SheetClose asChild>
                <Button
                  className="site-header__menu-close absolute top-3 right-3 size-11"
                  size="icon"
                  variant="ghost"
                  aria-label="Close navigation"
                >
                  <XIcon data-icon="inline-start" />
                </Button>
              </SheetClose>

              <nav className="site-header__sheet-nav" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      className="site-header__sheet-link flex min-h-11 items-center"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}

                <SheetClose asChild>
                  <a
                    className="site-header__sheet-link site-header__sheet-link--github flex min-h-11 items-center"
                    href={githubUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
