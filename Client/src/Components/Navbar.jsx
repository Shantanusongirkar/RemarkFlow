import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-400">RemarkFlow</h1>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors">Dashboard</Link>
          <Link to="/form" className="text-gray-300 hover:text-indigo-400 transition-colors">Workspace</Link>
          <Link to="/tracker" className="text-gray-300 hover:text-indigo-400 transition-colors">Master Tracker</Link>
        </div>
      </div>
    </nav>
  );
}