// Components/Layout.jsx
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    // 1. Changed to dark mode (bg-gray-900)
    <div className="flex h-screen bg-gray-900">
      
      {/* 2. Styled the sidebar to match your dark theme */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 text-white p-5">
        <h1 className="text-2xl font-bold mb-8 text-indigo-400">RemarkFlow</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors">Dashboard</Link>
          <Link to="/form" className="text-gray-300 hover:text-indigo-400 transition-colors">Workspace</Link>
          <Link to="/tracker" className="text-gray-300 hover:text-indigo-400 transition-colors">Master Tracker</Link>
        </nav>
      </aside>

      {/* 3. GAP FIXED: Removed the 'p-8' padding! */}
      <main className="flex-1 overflow-y-auto">
        <Outlet /> 
      </main>

    </div>
  );
}