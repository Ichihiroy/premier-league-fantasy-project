// AuthPageBackground: Full-screen SVG background for auth pages, blue/cyan with subtle waves for a calm, distinct look
const AuthPageBackground = () => (
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
        id="bg-gradient-auth"
        x1="0"
        y1="0"
        x2="1920"
        y2="1080"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0a2540" />
        <stop offset="1" stopColor="#00b4d8" />
      </linearGradient>
      <linearGradient
        id="wave1-auth"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#48cae4" />
        <stop offset="1" stopColor="#4361ee" />
      </linearGradient>
      <linearGradient
        id="wave2-auth"
        x1="0"
        y1="0"
        x2="1920"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00b4d8" />
        <stop offset="1" stopColor="#3a86ff" />
      </linearGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#bg-gradient-auth)" />
    <path
      d="M0 200 Q480 300 960 200 T1920 200 V0 H0Z"
      fill="url(#wave1-auth)"
      fillOpacity="0.13"
    />
    <path
      d="M0 800 Q320 900 640 800 T1280 800 T1920 800 V1080 H0Z"
      fill="url(#wave2-auth)"
      fillOpacity="0.10"
    />
  </svg>
);

export default AuthPageBackground;
