import { useEffect, useState } from 'react';
import { RESUME } from '../data/resume';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  "I build useful things, explore new tech, and enjoy the process. Let's create something?";

const GITHUB_URL = RESUME.github;
const LINKEDIN_URL = RESUME.linkedin;
const EMAIL = RESUME.email;
const RESUME_URL = RESUME.resumeUrl;

const WHITE_PILLS = [
  { label: 'See my work', href: GITHUB_URL, external: true },
  { label: 'View Resume', href: RESUME_URL, external: true },
  { label: 'Connect on LinkedIn', href: LINKEDIN_URL, external: true },
  { label: 'Send a brief hello', href: `mailto:${EMAIL}`, external: false },
];

function CopyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <path d="M8.5 3.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
    </svg>
  );
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [pillsVisible, setPillsVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setPillsVisible(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  return (
    <section className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-xl relative z-10">
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
          }}
        >
          Hey there, I&apos;m Janak,
          <br />
          a developer who builds things end-to-end.
        </div>

        <p
          className="text-white mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
          aria-live="polite"
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] typewriter-cursor"
              aria-hidden="true"
            />
          )}
        </p>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {WHITE_PILLS.map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              {...(pill.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
            >
              {pill.label}
            </a>
          ))}
          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy email ${EMAIL} to clipboard`}
            title={`Copy ${EMAIL}`}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
