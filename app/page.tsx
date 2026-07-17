import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

import { CopyEmail } from "@/components/copy-email";
import { CookieSettingsButton } from "@/components/cookie/cookie-settings-button";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { ShaderGate } from "@/components/visuals/shader-gate";

import avatar from "@/public/images/avatar.jpg";
import copaKeyart from "@/public/images/copa-keyart.webp";
import gnomeTray from "@/public/images/gnome-tray.png";
import horaHero from "@/public/images/hora-hero.png";
import horaIcon from "@/public/images/hora-icon.png";
import prismaticApp from "@/public/images/prismatic-app.png";
import prismaticIcon from "@/public/images/prismatic-icon.png";
import { siteConfig } from "@/lib/site";

const links = {
  github: "https://github.com/szamski",
  linkedin: "https://pl.linkedin.com/in/szamowski",
  hora: "https://horacal.app",
  prismatic: "https://github.com/szamski/Prismatic-for-macOS",
  copaCity: "https://www.copacity.club/en",
  gnome: "https://github.com/szamski/gnome-tray-toggle",
} as const;

function ExternalArrow() {
  return <ArrowUpRight aria-hidden="true" data-icon="inline-end" />;
}

function GitHubMark() {
  return (
    <svg aria-hidden="true" data-icon="inline-start" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.24c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.3-5.27-5.7 0-1.27.45-2.3 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.5 3.16-1.18 3.16-1.18.63 1.6.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.71 5.4-5.29 5.69.42.36.79 1.07.79 2.16v3.26c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg aria-hidden="true" data-icon="inline-start" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.34 7.9H1.8V19.2h3.54V7.9ZM3.57 2.28a2.05 2.05 0 1 0 0 4.1 2.05 2.05 0 0 0 0-4.1ZM18.52 7.63c-1.87 0-3.13 1.03-3.65 2.01h-.05V7.9h-3.4v11.3h3.54v-5.59c0-1.47.28-2.9 2.11-2.9 1.8 0 1.83 1.69 1.83 3v5.49h3.54v-6.19c0-3.04-.66-5.38-3.92-5.38Z" />
    </svg>
  );
}

function ProjectLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="project-link" href={href} target="_blank" rel="noreferrer">
      <span>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
      <ExternalArrow />
    </a>
  );
}

export default function Home() {
  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-material" aria-hidden="true">
            <ShaderGate />
          </div>

          <div className="hero-content">
            <p className="eyebrow hero-kicker">Fullstack developer · Warsaw</p>
            <h1 id="hero-title" aria-label="Software that feels native, wherever it runs.">
              <span aria-hidden="true">Software that</span>
              <span aria-hidden="true">feels native,</span>
              <span aria-hidden="true">wherever it runs.</span>
            </h1>
            <p className="hero-support">
              Fullstack developer building with Swift, React, Next.js and TypeScript.
            </p>

            <div className="hero-actions">
              <Button asChild size="lg" className="hero-primary">
                <a href="#work">View selected work</a>
              </Button>
              <Button asChild variant="link" size="lg" className="hero-secondary">
                <a href="#contact">
                  Get in touch
                  <ExternalArrow />
                </a>
              </Button>
            </div>
          </div>

          <div className="hero-meta mono">
            <span>Warsaw, Poland</span>
            <a href="#work">
              Scroll to explore
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="content-flow">
          <section id="work" className="work section-shell" aria-labelledby="work-title">
            <header className="section-heading-row">
              <div>
                <p className="eyebrow"><span>01</span> Work</p>
                <h2 id="work-title">Selected work</h2>
              </div>
              <p className="section-count mono">01 — 04</p>
            </header>

            <article id="hora" className="project project-hora" aria-labelledby="hora-title">
              <div className="project-media hora-media">
                <Image
                  src={horaHero}
                  alt="Hora week view showing a native macOS calendar, sidebar and focus timer"
                  sizes="(max-width: 900px) 100vw, 66vw"
                  className="media-image"
                  placeholder="blur"
                />
              </div>

              <div className="project-copy hora-copy">
                <p className="project-index mono">01</p>
                <Image className="project-icon" src={horaIcon} alt="" width={64} height={64} />
                <h3 id="hora-title">hora</h3>
                <p className="project-tagline">A native Google Calendar client for Mac.</p>
                <p className="project-role">Founder &amp; developer</p>
                <p className="project-description">
                  Built in Swift 6 with SwiftUI and AppKit, with direct Google Calendar API sync,
                  real-time updates and no Electron.
                </p>
                <p className="project-stack mono">Swift 6 · SwiftUI · AppKit · Google Calendar API</p>
                <ProjectLink href={links.hora}>Visit hora</ProjectLink>
              </div>
            </article>

            <article
              id="prismatic"
              className="project project-prismatic"
              aria-labelledby="prismatic-title"
            >
              <div className="project-copy prismatic-copy">
                <p className="project-index mono">02</p>
                <div className="project-title-with-icon">
                  <Image
                    className="project-icon"
                    src={prismaticIcon}
                    alt=""
                    width={72}
                    height={72}
                  />
                  <h3 id="prismatic-title">Prismatic</h3>
                </div>
                <p className="project-tagline">RGB control without the background bloat.</p>
                <p className="project-role">Creator &amp; maintainer</p>
                <p className="project-description">
                  A tiny native menu bar app for SteelSeries Arena 7, powered by a
                  reverse-engineered USB HID protocol.
                </p>
                <p className="project-stack mono">SwiftUI · IOKit · USB HID</p>
                <ProjectLink href={links.prismatic}>View on GitHub</ProjectLink>
              </div>

              <div className="project-media project-media--framed prismatic-stage">
                <div className="prismatic-glow" aria-hidden="true" />
                <Image
                  src={prismaticApp}
                  alt="Prismatic menu bar panel controlling SteelSeries Arena 7 lighting"
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className="prismatic-image"
                  placeholder="blur"
                />
              </div>
            </article>

            <article id="copa-city" className="project project-copa" aria-labelledby="copa-title">
              <div className="project-copy copa-copy">
                <p className="project-index mono">03</p>
                <h3 id="copa-title">Copa City</h3>
                <p className="project-tagline">A global game platform, rebuilt for scale.</p>
                <p className="project-role">Web developer</p>
                <p className="project-description">
                  A multilingual Next.js platform powered by Storyblok, with custom WebGL shaders,
                  deferred rendering and mobile-first performance.
                </p>
                <p className="project-stack mono">Next.js · React · TypeScript · Storyblok · WebGL</p>
                <ProjectLink href={links.copaCity}>Visit Copa City</ProjectLink>
              </div>

              <div className="project-media project-media--framed copa-media">
                <Image
                  src={copaKeyart}
                  alt="Copa City key art with football supporters and city landmarks"
                  fill
                  sizes="(max-width: 900px) 100vw, 66vw"
                  className="copa-keyart"
                  placeholder="blur"
                />
                <div className="copa-scrim" aria-hidden="true" />
                <p className="copa-media-label mono">Website platform · Next.js</p>
              </div>
            </article>

            <article
              id="gnome-tray-toggle"
              className="project project-gnome"
              aria-labelledby="gnome-title"
            >
              <p className="project-index mono">04</p>
              <div className="project-media project-media--framed gnome-media">
                <Image
                  src={gnomeTray}
                  alt="GNOME desktop top bar with application tray icons visible"
                  fill
                  sizes="100vw"
                  className="gnome-image"
                  placeholder="blur"
                />
              </div>

              <div className="gnome-copy-grid">
                <div className="project-copy">
                  <h3 id="gnome-title">GNOME Tray Toggle</h3>
                  <p className="project-tagline">One button. A quieter top bar.</p>
                  <p className="project-role">Creator &amp; maintainer</p>
                </div>
                <p className="project-description">
                  A lightweight GNOME Shell extension that hides and restores application tray
                  icons with smooth Clutter animations.
                </p>
                <div className="project-details">
                  <p className="project-stack mono">JavaScript · GNOME Shell · Clutter</p>
                  <ProjectLink href={links.gnome}>View on GitHub</ProjectLink>
                </div>
              </div>
            </article>
          </section>

          <section id="about" className="about section-shell" aria-labelledby="about-title">
            <div className="about-copy">
              <p className="eyebrow"><span>05</span> About</p>
              <h2 id="about-title">One craft. Two runtimes.</h2>
              <p className="about-lede">
                I build native Apple apps and modern web products from the interface down to the
                systems underneath.
              </p>
              <p>
                Across Swift and TypeScript, I care about fast interaction, clear architecture and
                software that stays out of the way.
              </p>

              <dl className="runtime-list mono">
                <div>
                  <dt className="native-label">Native</dt>
                  <dd>Swift · SwiftUI · AppKit · macOS · iOS</dd>
                </div>
                <div>
                  <dt className="web-label">Web</dt>
                  <dd>React · Next.js · TypeScript · WebGL</dd>
                </div>
              </dl>
            </div>

            <figure className="portrait-frame">
              <Image
                src={avatar}
                alt="Portrait of Maciej Szamowski"
                sizes="(max-width: 768px) 100vw, 34vw"
                className="portrait-image"
                placeholder="blur"
              />
            </figure>
          </section>

          <section id="contact" className="contact section-shell" aria-labelledby="contact-title">
            <div className="contact-intro">
              <p className="eyebrow"><span>06</span> Contact</p>
              <h2 id="contact-title">Let&apos;s talk.</h2>
              <p>For product work, collaborations, or a good technical problem.</p>
              <a className="email-link mono" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>

            <div className="contact-actions">
              <CopyEmail />
              <Button asChild variant="outline" size="lg" className="contact-button">
                <a href={links.github} target="_blank" rel="noreferrer">
                  <GitHubMark />
                  GitHub
                  <ExternalArrow />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="contact-button">
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInMark />
                  LinkedIn
                  <ExternalArrow />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer section-shell mono">
        <span>Maciej Szamowski · Warsaw, Poland</span>
        <div className="site-footer__end">
          <CookieSettingsButton />
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
