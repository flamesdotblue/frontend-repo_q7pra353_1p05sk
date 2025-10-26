import { Activity, Link, Search, ShieldAlert } from 'lucide-react';

export default function OverviewStats({ stats }) {
  const items = [
    {
      label: 'Sites Monitored',
      value: stats.sites,
      icon: Activity,
      color: 'from-indigo-500 to-violet-500',
    },
    {
      label: 'Pages Changed (7d)',
      value: stats.pagesChanged,
      icon: Search,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'SEO Issues',
      value: stats.seoIssues,
      icon: ShieldAlert,
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Broken Links',
      value: stats.brokenLinks,
      icon: Link,
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-tr ${color} text-white grid place-items-center`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-semibold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
