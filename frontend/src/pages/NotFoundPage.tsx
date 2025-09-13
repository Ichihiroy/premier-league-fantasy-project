import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2e004f] to-[#4a0d7a] px-4">
      <h1 className="text-[7rem] font-extrabold text-transparent bg-gradient-to-r from-accent-magenta via-accent-fuchsia to-accent-teal bg-clip-text mb-2 drop-shadow-lg">
        404
      </h1>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-neutral-200 mb-8 max-w-xl text-center">
        This page does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block rounded-full border-2 border-white/30 bg-white/10 px-8 py-3 text-lg font-semibold text-white hover:bg-white/20 hover:border-white/60 transition-all shadow"
      >
        Return Home
      </Link>
    </div>
  );
}
