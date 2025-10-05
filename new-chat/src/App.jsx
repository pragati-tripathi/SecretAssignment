import { useMemo, useState } from 'react'

function Sidebar({ current, onChange }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'tickets', label: 'Tickets' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'reports', label: 'Reports' },
    { key: 'settings', label: 'Settings' },
  ]
  return (
    <aside className="w-64 bg-slate-900/70 border-r border-slate-700/50 backdrop-blur-xl p-4">
      <div className="mb-8">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-2xl font-extrabold">New chat</div>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              current === item.key
                ? 'bg-slate-800/50 text-white border border-slate-600/50'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/30'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function MetricCard({ title, value, accent }) {
  return (
    <div className="group rounded-2xl p-5 border border-slate-700/50 bg-slate-800/50 hover:shadow-2xl transition-all hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase">{title}</p>
        <span className={`w-2 h-2 rounded-full ${accent}`}></span>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  )
}

const SAMPLE_TICKETS = [
  { id: '#2411', subject: 'Payment failing on checkout', status: 'open', priority: 'high', slaTimer: '3h 25m', assignee: 'Alex', customer: 'Acme Corp', updated: 'Today 10:12 AM', description: 'Users report payment failures on Stripe for Visa cards.' },
  { id: '#2410', subject: 'Feature request: export to CSV', status: 'progress', priority: 'medium', slaTimer: '16h 12m', assignee: 'Jordan', customer: 'Globex', updated: 'Today 9:42 AM', description: 'Product team requested CSV export for reports module.' },
  { id: '#2409', subject: 'Login takes 8 seconds', status: 'open', priority: 'high', slaTimer: '6h 01m', assignee: 'Taylor', customer: 'Soylent', updated: 'Yesterday 6:14 PM', description: 'Performance issue on auth service; p95 latency spiked since last deploy.' },
  { id: '#2408', subject: 'Broken image on homepage hero', status: 'closed', priority: 'low', slaTimer: '—', assignee: 'Sam', customer: 'Initech', updated: 'Yesterday 11:02 AM', description: 'Hero image URL 404s on Safari iOS 16.' },
]

function Dashboard() {
  const [search, setSearch] = useState('')
  const highlight = useMemo(() => SAMPLE_TICKETS[0], [])
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Overview</h1>
      </div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard title="Open tickets" value="128" accent="bg-red-500/50" />
        <MetricCard title="In progress" value="42" accent="bg-amber-500/50" />
        <MetricCard title="Resolved (24h)" value="316" accent="bg-emerald-500/50" />
        <MetricCard title="SLA breaches" value="3" accent="bg-red-500/70" />
      </div>
      <div className="grid grid-cols-4 gap-6 items-start">
        <div className="col-span-3 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-slate-900 font-semibold">Recent tickets</h2>
            <div className="relative">
              <input
                className="pl-3 pr-4 py-2.5 w-80 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-sm"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA Timer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SAMPLE_TICKETS.filter(t => t.subject.toLowerCase().includes(search.toLowerCase())).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-blue-600 font-medium">{t.id}</span></td>
                    <td className="px-6 py-4"><span className="text-slate-900">{t.subject}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${t.status === 'open' ? 'bg-blue-100 text-blue-700' : t.status === 'progress' ? 'bg-amber-100 text-amber-700' : t.status === 'closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{t.status === 'open' ? 'Open' : t.status === 'progress' ? 'In Progress' : t.status === 'closed' ? 'Closed' : 'Resolved'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${t.priority === 'high' ? 'bg-red-100 text-red-700' : t.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-slate-600">{t.slaTimer}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-slate-600">{t.assignee}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing 1 to {SAMPLE_TICKETS.length} of {SAMPLE_TICKETS.length} tickets</p>
            <div className="text-sm font-medium text-slate-700">Pagination</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="rounded-2xl p-5 border border-slate-700/50 bg-slate-800/50">
            <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase mb-3">Highlighted Ticket</p>
            <p className="text-white font-medium mb-2">{highlight.subject}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{highlight.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Tickets() {
  const [search, setSearch] = useState('')
  const [modalTicket, setModalTicket] = useState(null)
  const filtered = useMemo(() => SAMPLE_TICKETS.filter(t => t.subject.toLowerCase().includes(search.toLowerCase())), [search])
  const updateStatus = (id, status) => {
    setModalTicket((prev) => ({ ...prev, status }))
  }
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">All Tickets</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              className="pl-10 pr-4 py-2.5 w-80 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-sm"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105">New Ticket</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA Timer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} onClick={() => setModalTicket(t)} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-blue-600 font-medium">{t.id}</span></td>
                  <td className="px-6 py-4"><span className="text-slate-900">{t.subject}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${t.status === 'open' ? 'bg-blue-100 text-blue-700' : t.status === 'progress' ? 'bg-amber-100 text-amber-700' : t.status === 'closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{t.status === 'open' ? 'Open' : t.status === 'progress' ? 'In Progress' : t.status === 'closed' ? 'Closed' : 'Resolved'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${t.priority === 'high' ? 'bg-red-100 text-red-700' : t.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-slate-600">{t.slaTimer}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-slate-600">{t.assignee}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 1 to {filtered.length} of {SAMPLE_TICKETS.length} tickets</p>
          <div className="text-sm font-medium text-slate-700">Pagination</div>
        </div>
      </div>

      {modalTicket && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{modalTicket.subject}</h3>
                <p className="text-cyan-400 font-medium">{modalTicket.id}</p>
              </div>
              <button onClick={() => setModalTicket(null)} className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors">Close</button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Status</label>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${modalTicket.status === 'open' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : modalTicket.status === 'progress' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>{modalTicket.status === 'open' ? 'Open' : modalTicket.status === 'progress' ? 'In Progress' : 'Resolved'}</span>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Priority</label>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${modalTicket.priority === 'high' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : modalTicket.priority === 'medium' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'}`}>{modalTicket.priority.charAt(0).toUpperCase() + modalTicket.priority.slice(1)}</span>
                </div>
              </div>
              <div className="mb-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Customer</div>
                <p className="text-white font-medium">{modalTicket.customer}</p>
              </div>
              <div className="mb-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Assigned To</div>
                <p className="text-white font-medium">{modalTicket.assignee}</p>
              </div>
              <div className="mb-6">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</div>
                <p className="text-slate-300 leading-relaxed">{modalTicket.description}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Last Updated</div>
                <p className="text-white">{modalTicket.updated}</p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700/50 flex gap-3">
              <button onClick={() => updateStatus(modalTicket.id, 'progress')} className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 font-medium border border-blue-500/30">Mark In Progress</button>
              <button onClick={() => updateStatus(modalTicket.id, 'resolved')} className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 font-medium border border-emerald-500/30">Resolve Ticket</button>
              <button onClick={() => setModalTicket(null)} className="px-6 py-3 rounded-lg bg-slate-700/50 text-slate-300 font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Placeholder({ section }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30" />
        <h2 className="text-3xl font-bold text-white mb-2 capitalize">{section}</h2>
        <p className="text-slate-400">This section is coming soon</p>
      </div>
    </div>
  )
}

function App() {
  const [section, setSection] = useState('dashboard')
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-600/10" />
      <div className="max-w-[1600px] mx-auto grid" style={{ gridTemplateColumns: '16rem 1fr' }}>
        <Sidebar current={section} onChange={setSection} />
        <main className="p-8">
          {section === 'dashboard' && <Dashboard />}
          {section === 'tickets' && <Tickets />}
          {['analytics', 'reports', 'settings'].includes(section) && (
            <Placeholder section={section} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
