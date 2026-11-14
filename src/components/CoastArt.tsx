export function CoastArt() {
  return (
    <svg
      width="640"
      height="480"
      viewBox="0 0 640 480"
      aria-hidden="true"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="coast-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b5360" />
          <stop offset="0.52" stopColor="#c48462" />
          <stop offset="0.78" stopColor="#f0c9a0" />
        </linearGradient>
        <linearGradient id="coast-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f8b92" />
          <stop offset="1" stopColor="#0e3c46" />
        </linearGradient>
        <clipPath id="coast-frame">
          <rect width="640" height="480" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#coast-frame)">
        <rect width="640" height="480" fill="url(#coast-sky)" />
        <circle cx="470" cy="196" r="52" fill="#f6e2c4" />
        <path
          d="M0 292c70-28 120-18 190 4 78 24 120-36 210-18 54 11 100 28 240 8v70H0z"
          fill="#1a3f49"
        />
        <rect y="328" width="640" height="152" fill="url(#coast-water)" />
        <path
          d="M0 348c40 12 70 12 110 0s70-12 110 0 70 12 110 0 70-12 110 0 70 12 110 0 40-8 90 0"
          fill="none"
          stroke="#f3ecdf"
          strokeWidth="3"
          opacity="0.8"
        />
        <path
          d="M20 392c48 10 78 10 120 0s70-10 112 0 78 10 126 0 64-10 108 0 70 8 134 0"
          fill="none"
          stroke="#f3ecdf"
          strokeWidth="2"
          opacity="0.45"
        />
        <g stroke="#6b4e38" strokeWidth="5" strokeLinecap="butt">
          <path d="M0 308h210" />
          <path d="M36 308v46" />
          <path d="M78 308v62" />
          <path d="M120 308v46" />
          <path d="M162 308v58" />
          <path d="M204 308v36" />
        </g>
        <path d="M0 303h210v10H0z" fill="#6b4e38" />
        <path d="M400 430c48-36 96-34 150-8 28 14 52 18 90 16v42H400z" fill="#e7d3b4" />
      </g>
    </svg>
  );
}

export function WaveDivider({ from, to }: { from: "gulf" | "sand"; to: "gulf" | "sand" }) {
  const background = from === "gulf" ? "bg-gulf" : "bg-sand";
  const fill = to === "gulf" ? "text-gulf" : "text-sand";
  return (
    <svg
      viewBox="0 0 1440 48"
      width="100%"
      height="48"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block ${background} ${fill}`}
    >
      <path fill="currentColor" d="M0 24c120 24 240 24 360 0s240-24 360 0 240 24 360 0 240-24 360 0v24H0z" />
    </svg>
  );
}
