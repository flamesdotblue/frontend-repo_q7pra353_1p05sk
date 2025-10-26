import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SiteControls from './components/SiteControls.jsx';
import OverviewStats from './components/OverviewStats.jsx';
import ChangesFeed from './components/ChangesFeed.jsx';

function App() {
  const [sites, setSites] = useState(["https://example.com", "https://docs.example.com"]);
  const [schedule, setSchedule] = useState('daily');
  const [changes, setChanges] = useState([
    {
      type: 'seo',
      title: 'Title tag updated on /pricing',
      detail: 'Meta title changed from "Simple Pricing" to "Pricing & Plans — Save 20%"',
      site: 'https://example.com',
      time: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      type: 'broken',
      title: 'Broken link detected on /blog/launch',
      detail: 'Found 404 linking to https://old.example.com/signup',
      site: 'https://example.com',
      time: Date.now() - 1000 * 60 * 60 * 6,
    },
    {
      type: 'added',
      title: 'New page discovered: /guides/migrations',
      detail: 'Page added to sitemap and discovered via crawl',
      site: 'https://docs.example.com',
      time: Date.now() - 1000 * 60 * 60 * 9,
    },
    {
      type: 'removed',
      title: 'Page removed: /blog/2020/hello-world',
      detail: 'URL returns 410 Gone and removed from sitemap',
      site: 'https://example.com',
      time: Date.now() - 1000 * 60 * 60 * 24,
    },
  ]);

  const stats = useMemo(() => {
    const pagesChanged = changes.filter(c => c.type === 'added' || c.type === 'removed').length;
    const seoIssues = changes.filter(c => c.type === 'seo').length;
    const brokenLinks = changes.filter(c => c.type === 'broken').length;
    const uniqueSites = new Set(sites.length ? sites : changes.map(c => c.site));
    return {
      sites: uniqueSites.size,
      pagesChanged,
      seoIssues,
      brokenLinks,
    };
  }, [changes, sites]);

  const onAddSite = (url) => {
    setSites((prev) => (prev.includes(url) ? prev : [...prev, url]));
  };

  const onRemoveSite = (url) => {
    setSites((prev) => prev.filter((s) => s !== url));
  };

  const onRunCrawl = () => {
    if ((sites?.length ?? 0) === 0) return;
    const site = sites[Math.floor(Math.random() * sites.length)];
    const types = ['added', 'removed', 'seo', 'broken'];
    const type = types[Math.floor(Math.random() * types.length)];
    const now = Date.now();

    const sampleByType = {
      added: {
        title: 'New page discovered',
        detail: 'Content embedded and indexed; vector profile created for comparisons.',
      },
      removed: {
        title: 'Page removed',
        detail: 'URL no longer available and removed from internal link graph.',
      },
      seo: {
        title: 'SEO update detected',
        detail: 'Meta description changed; schema markup updated to Article.',
      },
      broken: {
        title: 'Broken link found',
        detail: 'Outgoing link responding with 404; suggested redirect to /new-home. ',
      },
    };

    const entry = {
      type,
      title: sampleByType[type].title,
      detail: sampleByType[type].detail,
      site,
      time: now,
    };

    setChanges((prev) => [entry, ...prev].slice(0, 20));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <SiteControls
          sites={sites}
          onAddSite={onAddSite}
          onRemoveSite={onRemoveSite}
          schedule={schedule}
          setSchedule={setSchedule}
          onRunCrawl={onRunCrawl}
        />

        <OverviewStats stats={stats} />

        <ChangesFeed items={changes} />
      </main>
    </div>
  );
}

export default App;
