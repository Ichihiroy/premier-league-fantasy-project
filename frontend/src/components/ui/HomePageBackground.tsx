// A full-screen SVG background with a modern zigzag/wave pattern and purple gradient for Premier League style.
// Place this as the first element in your HomePage, with position: fixed and z-index below the navbar.

const HomePageBackground = () => (
  <svg
    className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none"
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient
        id="bg-gradient"
        x1="0"
        y1="0"
        x2="1920"
        y2="1080"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6a1b9a" />
        <stop offset="1" stopColor="#4a0d7a" />
      </linearGradient>
      <linearGradient
        id="zigzag1"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f72585" />
        <stop offset="0.5" stopColor="#7209b7" />
        <stop offset="1" stopColor="#3a0ca3" />
      </linearGradient>
      <linearGradient
        id="zigzag2"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#b5179e" />
        <stop offset="1" stopColor="#4361ee" />
      </linearGradient>
      <linearGradient
        id="zigzag3"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4cc9f0" />
        <stop offset="1" stopColor="#7209b7" />
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#bg-gradient)" />
    {/* Unique, high-contrast zigzag/wave patterns */}
    <path
      d="M0 180 Q320 80 640 180 T1280 180 T1920 180 V0 H0Z"
      fill="url(#zigzag1)"
      fillOpacity="0.22"
    />
    <path
      d="M0 540 Q480 640 960 540 T1920 540 V340 Q1600 440 1280 340 T640 340 T0 340 V540Z"
      fill="url(#zigzag2)"
      fillOpacity="0.18"
    />
    <path
      d="M0 900 Q320 1000 640 900 T1280 900 T1920 900 V1080 H0Z"
      fill="url(#zigzag3)"
      fillOpacity="0.16"
    />
    {/* Extra accent zigzags for uniqueness */}
    <path
      d="M0 350 Q480 250 960 350 T1920 350"
      stroke="#f72585"
      strokeWidth="8"
      opacity="0.10"
    />
    <path
      d="M0 700 Q320 800 640 700 T1280 700 T1920 700"
      stroke="#4cc9f0"
      strokeWidth="10"
      opacity="0.10"
    />
  </svg>
);

export default HomePageBackground;
