import { useState } from 'react';
import { Plus, Clock, RefreshCw, X } from 'lucide-react';

export default function SiteControls({ sites, onAddSite, onRemoveSite, schedule, setSchedule, onRunCrawl }) {
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const url = new URL(input.trim());
      onAddSite(url.origin);
      setInput('');
    } catch {
      // Not a valid URL, try adding protocol automatically
      try {
        const url = new URL('https://' + input.trim());
        onAddSite(url.origin);
        setInput('');
      } catch {
        // ignore invalid
      }
    }
  };

  return (
    <section className="w-full">
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a site to monitor (e.g., https://example.com)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800"
            >
              <Plus className="h-4 w-4" /> Add Site
            </button>
          </form>

          {sites.length > 0 && (
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {sites.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                    {s}
                    <button onClick={() => onRemoveSite(s)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <select
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <button
                  onClick={onRunCrawl}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4" /> Run crawl
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
