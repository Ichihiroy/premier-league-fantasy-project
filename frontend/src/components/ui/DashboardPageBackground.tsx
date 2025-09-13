// DashboardPageBackground: Full-screen SVG background with cyan and purple zigzag/wave patterns
const DashboardPageBackground = () => (
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
        id="bg-gradient-dashboard"
        x1="0"
        y1="0"
        x2="1920"
        y2="1080"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1a0033" />
        <stop offset="1" stopColor="#4a0d7a" />
      </linearGradient>
      <linearGradient
        id="zigzag1-dashboard"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4cc9f0" />
        <stop offset="0.5" stopColor="#6a1b9a" />
        <stop offset="1" stopColor="#3a0ca3" />
      </linearGradient>
      <linearGradient
        id="zigzag2-dashboard"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4cc9f0" />
        <stop offset="1" stopColor="#4a0d7a" />
      </linearGradient>
      <linearGradient
        id="zigzag3-dashboard"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00e6d0" />
        <stop offset="1" stopColor="#4a0d7a" />
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#bg-gradient-dashboard)" />
    {/* Zigzag/wave patterns, more subtle for readability */}
    <path
      d="M0 180 Q320 80 640 180 T1280 180 T1920 180 V0 H0Z"
      fill="url(#zigzag1-dashboard)"
      fillOpacity="0.13"
    />
    <path
      d="M0 540 Q480 640 960 540 T1920 540 V340 Q1600 440 1280 340 T640 340 T0 340 V540Z"
      fill="url(#zigzag2-dashboard)"
      fillOpacity="0.10"
    />
    <path
      d="M0 900 Q320 1000 640 900 T1280 900 T1920 900 V1080 H0Z"
      fill="url(#zigzag3-dashboard)"
      fillOpacity="0.09"
    />
    {/* Extra accent zigzags for uniqueness, but very faint */}
    <path
      d="M0 350 Q480 250 960 350 T1920 350"
      stroke="#00e6d0"
      strokeWidth="8"
      opacity="0.06"
    />
    <path
      d="M0 700 Q320 800 640 700 T1280 700 T1920 700"
      stroke="#4cc9f0"
      strokeWidth="10"
      opacity="0.05"
    />
  </svg>
);

export default DashboardPageBackground;
