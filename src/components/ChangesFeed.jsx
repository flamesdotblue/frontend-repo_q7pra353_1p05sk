import { AlertTriangle, FilePlus2, Link as LinkIcon, Search } from 'lucide-react';

const typeMeta = {
  added: { label: 'Page Added', color: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: FilePlus2 },
  removed: { label: 'Page Removed', color: 'bg-rose-50 text-rose-700 ring-rose-200', icon: AlertTriangle },
  seo: { label: 'SEO Change', color: 'bg-amber-50 text-amber-700 ring-amber-200', icon: Search },
  broken: { label: 'Broken Link', color: 'bg-slate-50 text-slate-700 ring-slate-200', icon: LinkIcon },
};

export default function ChangesFeed({ items }) {
  return (
    <section className="w-full">
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-500">Last 20 events</p>
        </div>
        <ul className="divide-y divide-gray-100">
          {items.length === 0 && (
            <li className="py-8 text-center text-sm text-gray-500">No activity yet. Add a site and run a crawl to see changes here.</li>
          )}
          {items.map((item, idx) => {
            const MetaIcon = typeMeta[item.type]?.icon ?? Search;
            const badge = typeMeta[item.type] ?? typeMeta.seo;
            return (
              <li key={idx} className="py-4 flex items-start gap-3">
                <div className="mt-0.5">
                  <span className={`inline-flex items-center justify-center h-9 w-9 rounded-lg ring-1 ${badge.color}`}>
                    <MetaIcon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ring-1 ${badge.color}`}>{badge.label}</span>
                    <span className="text-sm font-medium text-gray-900 truncate">{item.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.detail}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span>{item.site}</span>
                    <span>•</span>
                    <span>{new Date(item.time).toLocaleString()}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
