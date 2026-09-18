import { useEffect, useRef } from 'react';

const VIDEO_SRC = '/hero-head-track.mp4';

// How quickly the scrubbed time catches the cursor (0..1 per frame).
// Higher = snappier eyes, lower = heavier head.
const TIME_LERP = 0.16;
// Parallax translate range in px — subtle head-shift on top of the timeline scrub.
const SHIFT_X_RANGE = 24;
const SHIFT_Y_RANGE = 14;
const SHIFT_LERP = 0.09;
// Overscale so the parallax translate never reveals edges.
const BASE_SCALE = 1.07;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const targetShiftRef = useRef({ x: 0, y: 0 });
  const smoothShiftRef = useRef({ x: 0, y: 0 });
  const durationRef = useRef(0);
  const readyRef = useRef(false);
  const seekingRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

    const setFromPointer = (clientX: number, clientY: number) => {
      if (reducedMotion || !durationRef.current) return;
      const nx = clamp01(clientX / window.innerWidth);
      const ny = clamp01(clientY / window.innerHeight);
      // Absolute mapping: left edge = start of clip (look left),
      // center = middle frame (look forward), right edge = end (look right).
      targetTimeRef.current = nx * durationRef.current;
      targetShiftRef.current = {
        x: (nx - 0.5) * SHIFT_X_RANGE,
        y: (ny - 0.5) * SHIFT_Y_RANGE,
      };
    };

    const handlePointerMove = (e: PointerEvent) => {
      setFromPointer(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setFromPointer(t.clientX, t.clientY);
    };

    const seekTo = (time: number) => {
      if (seekingRef.current) return;
      if (Math.abs(video.currentTime - time) < 0.03) return;
      try {
        seekingRef.current = true;
        const withFastSeek = video as HTMLVideoElement & {
          fastSeek?: (t: number) => void;
        };
        if (typeof withFastSeek.fastSeek === 'function') {
          withFastSeek.fastSeek(time);
        } else {
          video.currentTime = time;
        }
      } catch {
        seekingRef.current = false;
      }
    };

    const handleSeeked = () => {
      seekingRef.current = false;
    };

    const handleLoadedMetadata = () => {
      const d = video.duration;
      if (!d || Number.isNaN(d) || !Number.isFinite(d)) return;
      durationRef.current = d;
      try {
        video.pause();
      } catch {
        /* autoplay is off; pause is a safeguard */
      }
      // Start looking forward (middle frame) instead of hard-left.
      const middle = d / 2;
      targetTimeRef.current = middle;
      smoothTimeRef.current = middle;
      try {
        video.currentTime = middle;
      } catch {
        /* noop */
      }
      readyRef.current = true;
    };

    const tick = () => {
      // Smooth the timeline scrub so eyes glide instead of jumping.
      const target = targetTimeRef.current;
      const smooth = smoothTimeRef.current;
      const next = smooth + (target - smooth) * TIME_LERP;
      smoothTimeRef.current =
        Math.abs(target - next) < 0.001 ? target : next;

      if (readyRef.current && durationRef.current) {
        seekTo(smoothTimeRef.current);
      }

      // Smooth the parallax shift for the head-drift feel.
      const ts = targetShiftRef.current;
      const ss = smoothShiftRef.current;
      ss.x += (ts.x - ss.x) * SHIFT_LERP;
      ss.y += (ts.y - ss.y) * SHIFT_LERP;
      video.style.transform = `scale(${BASE_SCALE}) translate3d(${ss.x.toFixed(2)}px, ${ss.y.toFixed(2)}px, 0)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    // Idle center so first paint is eyes-forward even before metadata.
    video.style.transform = `scale(${BASE_SCALE})`;

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    });
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Metadata may already be cached.
    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        willChange: 'transform',
      }}
      className="h-full w-full object-cover object-[70%_center] md:object-center"
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
