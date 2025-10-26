import { Globe, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 text-white grid place-items-center shadow-md">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Web Ecosystem Monitor</h1>
            <p className="text-sm text-gray-500">Track site-wide changes, SEO shifts, and link health across your properties.</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
          <Zap className="h-4 w-4 text-yellow-500" />
          Real-time insights demo
        </div>
      </div>
    </header>
  );
}
