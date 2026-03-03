import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  { id: 1, name: 'Rahul Sharma', role: 'Maker', status: 'online', casesDone: 12 },
  { id: 2, name: 'Priya Patel', role: 'Maker', status: 'idle', casesDone: 8 },
  { id: 3, name: 'Amit Verma', role: 'Checker', status: 'offline', casesDone: 0 },
  { id: 4, name: 'Neha Gupta', role: 'Maker', status: 'online', casesDone: 15 },
];

const documentTypes = [
  "Bank Statement", "Company Profile", "Employment Profile",
  "Form 26 AS", "ID Card", "Income Documents", "ITR",
  "ITR and Financial", "Office Profile", "Residence Existence",
  "Salary Certificate", "Salary Slip", "School Letter"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [sentiment, setSentiment] = useState('positive');
  const [losNumber, setLosNumber] = useState('');
  const firstDocRef = useRef(null);

  useEffect(() => {
    if (firstDocRef.current) firstDocRef.current.focus();
  }, []);

  useEffect(() => {
    const handleGlobalKeys = (e) => {
      if (e.key === 'Enter' && selectedDocs.length > 0 && losNumber.trim()) {
        handleStartReport();
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [selectedDocs, sentiment, losNumber]);

  const toggleDocument = (doc) => {
    setSelectedDocs(prev =>
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    );
  };

  const handleStartReport = () => {
    if (selectedDocs.length === 0 || !losNumber.trim()) return;
    navigate('/form', { state: { selectedDocs, sentiment, losNumber } });
  };

  const handleCardKeyDown = (e, doc) => {
    if (e.key === ' ') {
      e.preventDefault();
      toggleDocument(doc);
    }
  };

  const statusColor = {
    online: 'bg-green-500',
    idle: 'bg-yellow-400',
    offline: 'bg-gray-600'
  };

  return (
    // FIXED: Changed h-screen to h-full w-full so it fits perfectly inside Layout
    <div className="flex flex-col h-full w-full bg-gray-900 text-gray-200 font-sans">
      
      {/* FIXED: Removed the entire redundant Top Navbar */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar – Team Activity */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-5 border-b border-gray-700">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Team Activity
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {teamMembers.map(member => (
              <div
                key={member.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <span className={`w-2.5 h-2.5 rounded-full mr-3 ${statusColor[member.status]}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-200">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                {member.casesDone > 0 && (
                  <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full">
                    {member.casesDone} today
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
            <span>{teamMembers.filter(m => m.status === 'online').length} online</span>
          </div>
        </aside>

        {/* Main Content – Report Generator + Control Panel */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Report Generator Card */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4">Report Generator</h2>
              
              <div className="mb-6">
                <label htmlFor="los" className="block text-sm font-medium text-gray-300 mb-1">
                  LOS Number
                </label>
                <input
                  type="text"
                  id="los"
                  value={losNumber}
                  onChange={(e) => setLosNumber(e.target.value)}
                  placeholder="Enter LOS number..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-300 mb-3">Select document types</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {documentTypes.map((doc, index) => {
                    const isSelected = selectedDocs.includes(doc);
                    return (
                      <div
                        key={doc}
                        ref={index === 0 ? firstDocRef : null}
                        tabIndex={0}
                        onClick={() => toggleDocument(doc)}
                        onKeyDown={(e) => handleCardKeyDown(e, doc)}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-150 outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${isSelected ? 'border-indigo-500 bg-indigo-900/50' : 'border-gray-600 bg-gray-700 hover:border-indigo-500/50'}`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-500 bg-gray-600'}`}>
                          {isSelected && (
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12">
                              <path d="M10.28 2.28L4 8.56 1.72 6.28a1 1 0 00-1.41 1.41l3 3a1 1 0 001.41 0l7-7a1 1 0 00-1.41-1.41z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-200">{doc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-300 mb-3">Case outcome</p>
                <div className="flex flex-wrap gap-6">
                  {['positive', 'negative', 'risk'].map(value => (
                    <label key={value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="sentiment"
                        value={value}
                        checked={sentiment === value}
                        onChange={(e) => setSentiment(e.target.value)}
                        className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-300 capitalize">{value}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStartReport}
                disabled={selectedDocs.length === 0 || !losNumber.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium text-base transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${selectedDocs.length > 0 && losNumber.trim() ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                Start Case {selectedDocs.length > 0 && losNumber.trim() && '↵'}
              </button>
            </div>

            {/* Control Panel Card */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4">Control Panel</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/tracker')}
                  className="flex items-center justify-center space-x-2 py-4 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-colors group"
                >
                  <span className="text-lg font-medium text-white">See Tracker</span>
                </button>
                <button
                  onClick={() => navigate('/upload')}
                  className="flex items-center justify-center space-x-2 py-4 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-colors group"
                >
                  <span className="text-lg font-medium text-white">Deploy New Tracker</span>
                </button>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;