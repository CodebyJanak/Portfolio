import { useState } from 'react';
import { RESUME } from '../data/resume';

const GITHUB_URL = RESUME.github;
const LINKEDIN_URL = RESUME.linkedin;
const EMAIL = RESUME.email;

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Projects', href: GITHUB_URL, external: true },
  { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  { label: 'Resume', href: RESUME.resumeUrl, external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center z-10">
        <a
          href="#"
          className="flex flex-row gap-3 items-center no-underline"
          aria-label="Janak Vasani home"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0 });
          }}
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Janak Vasani
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            &#10035;&#xFE0E;
          </span>
        </a>

        <nav
          className="hidden md:flex flex-row items-center text-[23px] text-white"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="hover:opacity-60 transition-opacity"
              >
                {link.label}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span aria-hidden="true">,&nbsp;</span>
              )}
            </span>
          ))}
        </nav>

        <a
          href={`mailto:${EMAIL}`}
          className="hidden md:inline text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              open ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      <div
        className="fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center px-8 gap-8 md:hidden transition-opacity duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-8" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </>
  );
}
