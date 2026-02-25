
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Select, TextArea, Card, Badge, Accordion } from './UI';
import { User, InternalRequest, RequestStatus, TimelineEvent, UserRole, ChatbotData } from '../types';
import { MOCK_REQUESTS, OFFICE_LOCATIONS, CATEGORIES } from '../constants';

// --- FAQ Section ---
export const FAQSection: React.FC = () => {
  const faqs = [
    {
      title: "How do I raise a request?",
      content: "You can raise a request by clicking on the 'Raise a Request' button on the home page or your dashboard. You will need to provide a subject, category, office location, floor/desk information, and a detailed description of the issue. You can also upload relevant photos or documents."
    },
    {
      title: "What documents can I upload with my request?",
      content: "You can upload images (JPG, PNG) and PDF documents that support your request. This helps the team understand the issue better."
    },
    {
      title: "How long does it usually take to resolve a request?",
      content: "The resolution time varies depending on the complexity of the issue and the team involved. However, most requests are reviewed within 7 days, and you will receive updates at every stage."
    },
    {
      title: "How can I track my request?",
      content: "Once logged in, you can view the status of all your submitted requests in the 'Track Status' or 'Dashboard' section. You will see a timeline of actions taken."
    },
    {
      title: "Can I edit or reopen a request after submitting?",
      content: "You cannot edit a request once submitted to ensure the integrity of the record. However, if you are not satisfied with the resolution, you can add a reply requesting to reopen the case, or raise a new request linking to the previous ID."
    },
    {
      title: "Is my personal information secure on this portal?",
      content: "Yes, your personal information is secure. We only share necessary details with the concerned team for the purpose of resolving your request. You can also choose to file anonymously if you prefer."
    }
  ];

  return (
    <div className="bg-gray-50 py-16" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-ic-dark mb-8">Frequently Asked Questions</h2>
        <Accordion items={faqs} />
      </div>
    </div>
  );
};

// --- Home View ---
export const HomeView: React.FC<{ onFileRequest: () => void; onTrack: () => void }> = ({ onFileRequest, onTrack }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-ic-blue text-white overflow-hidden">
        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Text Content - Aligned Left */}
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Your Voice. <br />
                Our Priority.
              </h1>
              <p className="text-xl mb-8 text-blue-100 max-w-lg drop-shadow-md leading-relaxed">
                Official Employee Request Portal of Innovation City.
                Transparent, Efficient, and Accountable Service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" onClick={onFileRequest}>
                  Raise a Request
                </Button>
                {/* Note: Tracking now typically redirects to login if not authenticated, managed by parent */}
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-ic-blue" onClick={onTrack}>
                  Track Status
                </Button>
              </div>
            </div>

            {/* Image Content - Aligned Right */}
            <div className="flex flex-col items-center md:items-end mt-8 md:mt-0">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-[400px] aspect-[4/5] bg-gradient-to-br from-ic-blue/5 to-ic-blue/40 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/N0LXPWqK/Gemini-Generated-Image-88f0jj88f0jj88f0.png"
                  alt="Innovation City Employee Service Portal Illustration"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white -mt-8 rounded-t-xl shadow-lg md:bg-transparent md:shadow-none md:mt-0">
        <Card className="text-center py-8 border-t-4 border-ic-accent">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-bold mb-2">Submit Request</h3>
          <p className="text-gray-600 mb-4">Raise your request easily with our step-by-step process.</p>
        </Card>
        <Card className="text-center py-8 border-t-4 border-ic-success">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Track Status</h3>
          <p className="text-gray-600 mb-4">Get real-time updates on the progress of your request.</p>
        </Card>
        <Card className="text-center py-8 border-t-4 border-ic-blue">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">Resolution</h3>
          <p className="text-gray-600 mb-4">Timely resolution by our dedicated team.</p>
        </Card>
      </div>

      {/* FAQ Section Integration */}
      <FAQSection />
    </div>
  );
};

// --- Employee Dashboard ---
export const EmployeeDashboard: React.FC<{
  user: User;
  onNavigate: (view: 'file-request' | 'track' | 'request-details', data?: any) => void
}> = ({ user, onNavigate }) => {
  const [requests, setRequests] = useState<InternalRequest[]>([]);
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0, reopened: 0 });

  useEffect(() => {
    const key = `hr_requests_${user.mobile}`;
    const localRequests = JSON.parse(localStorage.getItem(key) || "[]");
    const allRequests = [...localRequests, ...MOCK_REQUESTS];

    // Sort by date descending
    allRequests.sort((a: InternalRequest, b: InternalRequest) =>
      new Date(b.dateFiled).getTime() - new Date(a.dateFiled).getTime()
    );

    setRequests(allRequests);

    // Calculate stats
    const statsCalc = allRequests.reduce((acc: any, g: InternalRequest) => {
      acc.total++;
      if ([RequestStatus.RESOLVED, RequestStatus.CLOSED].includes(g.status as RequestStatus)) {
        acc.resolved++;
      } else if (g.status === RequestStatus.REOPENED) {
        acc.reopened++;
      } else {
        acc.open++;
      }
      return acc;
    }, { total: 0, open: 0, resolved: 0, reopened: 0 });

    setStats(statsCalc);
  }, [user.mobile]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case RequestStatus.SUBMITTED: return <Badge type="info">Submitted</Badge>;
      case RequestStatus.UNDER_REVIEW: return <Badge type="warning">Under Review</Badge>;
      case RequestStatus.CLOSED: return <Badge type="success">Closed</Badge>;
      default: return <Badge type="info">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg shadow-sm border-l-4 border-ic-blue p-6 mb-8">
        <h1 className="text-2xl font-bold text-ic-dark mb-1">Welcome back, {user.name}</h1>
        <p className="text-gray-600">Here is a snapshot of your request activity.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-t-4 border-blue-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Total Requests</h3>
          <p className="text-3xl font-bold text-ic-dark">{stats.total}</p>
        </Card>
        <Card className="border-t-4 border-yellow-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Open / In Progress</h3>
          <p className="text-3xl font-bold text-ic-dark">{stats.open}</p>
        </Card>
        <Card className="border-t-4 border-green-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Resolved</h3>
          <p className="text-3xl font-bold text-ic-dark">{stats.resolved}</p>
        </Card>
        <Card className="border-t-4 border-red-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Reopened</h3>
          <p className="text-3xl font-bold text-ic-dark">{stats.reopened}</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-ic-dark mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => onNavigate('file-request')}>+ Raise New Request</Button>
          <Button variant="outline" onClick={() => onNavigate('track')}>View All Requests</Button>
        </div>
      </div>

      {/* Recent Requests */}
      <div>
        <h2 className="text-lg font-bold text-ic-dark mb-4">Recent Activity</h2>
        {requests.length === 0 ? (
          <Card className="text-center py-10 bg-gray-50 border-dashed border-2 border-gray-300">
            <p className="text-gray-500 mb-4">You have not raised any requests yet.</p>
            <Button variant="primary" onClick={() => onNavigate('file-request')}>Raise Your First Request</Button>
          </Card>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Filed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.slice(0, 5).map(g => (
                    <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-ic-blue">{g.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate" title={g.subject}>{g.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(g.dateFiled).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(g.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-ic-blue hover:text-blue-800 font-medium"
                          onClick={() => onNavigate('request-details', g)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {requests.length > 5 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                <button className="text-sm text-ic-blue hover:underline" onClick={() => onNavigate('track')}>View all records &rarr;</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Chatbot Assistant ---
interface ChatMessage {
  sender: 'bot' | 'user';
  text?: string;
  isOptions?: boolean;
  options?: { label: string; action: () => void }[];
}

export const ICAssist: React.FC<{
  user: User | null;
  onNavigate: (view: 'file-request' | 'track', data?: any) => void;
  onLogin: () => void;
}> = ({ user, onNavigate, onLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<'MENU' | 'UPDATES' | 'FILE' | 'QNA'>('MENU');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Reset chat when opened
  useEffect(() => {
    if (isOpen) {
      resetToMainMenu();
    }
  }, [isOpen]);

  const resetToMainMenu = () => {
    setMode('MENU');
    setMessages([
      { sender: 'bot', text: 'Hello! I\'m IC Assist, your Innovation City helpdesk. How can I help you with your requests today?' },
      {
        sender: 'bot',
        isOptions: true,
        options: [
          { label: 'Track my requests', action: () => handleOptionSelected('UPDATES') },
          { label: 'Raise a new request', action: () => handleOptionSelected('FILE') },
          { label: 'HR / IT FAQs', action: () => handleOptionSelected('QNA') }
        ]
      }
    ]);
  };

  const handleOptionSelected = (selectedMode: 'UPDATES' | 'FILE' | 'QNA') => {
    setMode(selectedMode);

    // Add user selection to chat history
    let label = '';
    if (selectedMode === 'UPDATES') label = 'Track my requests';
    if (selectedMode === 'FILE') label = 'Raise a new request';
    if (selectedMode === 'QNA') label = 'HR / IT FAQs';

    setMessages(prev => [...prev, { sender: 'user', text: label }]);

    if (selectedMode === 'UPDATES') {
      handleUpdatesFlow();
    } else if (selectedMode === 'FILE') {
      handleFileFlow();
    } else if (selectedMode === 'QNA') {
      handleQnAFlow();
    }
  };

  const handleUpdatesFlow = () => {
    if (!user) {
      // Logged Out
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'You are not logged in. I can only show limited recent request data without login.' },
          { sender: 'bot', text: 'Demo Request 1: Office equipment request – Status: In Progress' },
          { sender: 'bot', text: 'Demo Request 2: Facility request – Status: Under Review' },
          { sender: 'bot', text: 'To view all your requests and real data, please log in first.' },
          {
            sender: 'bot',
            isOptions: true,
            options: [
              { label: 'Login to view all requests', action: () => { setIsOpen(false); onLogin(); } },
              { label: 'Back to main options', action: resetToMainMenu }
            ]
          }
        ]);
      }, 500);
    } else {
      // Logged In
      const key = `hr_requests_${user.mobile}`;
      const localRequests = JSON.parse(localStorage.getItem(key) || "[]");
      const allRequests = [...localRequests, ...MOCK_REQUESTS];
      const total = allRequests.length;
      const inProgress = allRequests.filter((g: any) => g.status === RequestStatus.IN_PROGRESS || g.status === RequestStatus.UNDER_REVIEW).length;
      const resolved = allRequests.filter((g: any) => g.status === RequestStatus.RESOLVED || g.status === RequestStatus.CLOSED).length;

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `You have ${total} total requests raised.` },
          { sender: 'bot', text: `${inProgress} are In Progress/Review, ${resolved} are Resolved.` },
        ]);

        if (allRequests.length > 0) {
           const recent = allRequests.slice(0, 3).map((g: any) => `ID: ${g.id}, ${g.subject.substring(0, 20)}... (${g.status})`).join('\n');
           setMessages(prev => [...prev, { sender: 'bot', text: "Recent:\n" + recent }]);
        }

        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            isOptions: true,
            options: [
              { label: 'Open My Requests', action: () => { setIsOpen(false); onNavigate('track'); } },
              { label: 'Back to main options', action: resetToMainMenu }
            ]
          }
        ]);
      }, 500);
    }
  };

  const handleFileFlow = () => {
    if (!user) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'To raise a new request, you need to log in first.' },
          {
             sender: 'bot',
             isOptions: true,
             options: [
               { label: 'Login / Register now', action: () => { setIsOpen(false); onLogin(); } },
               { label: 'Back to main options', action: resetToMainMenu }
             ]
          }
        ]);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'Great! Let\'s raise a new request with Innovation City.' },
          {
             sender: 'bot',
             isOptions: true,
             options: [
               { label: 'Open Request Form', action: () => { setIsOpen(false); onNavigate('file-request'); } },
               { label: 'Back to main options', action: resetToMainMenu }
             ]
          }
        ]);
      }, 500);
    }
  };

  const handleQnAFlow = () => {
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'You can ask me questions about how to use this Request Portal (e.g., how to raise requests, documents needed, tracking).' },
        { sender: 'bot', text: 'Go ahead, type your question below.' }
      ]);
    }, 500);
  };

  const handleSendInput = () => {
    if (!input.trim() || mode !== 'QNA') return;

    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const txt = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let reply = "I didn't quite understand that. Please ask about raising requests, tracking, or documents related to the IC request process.";

      if (txt.includes('file') || txt.includes('filing') || txt.includes('raise')) {
        reply = "To raise a request with Innovation City: 1. Login to the portal. 2. Click on 'Raise Request' in the dashboard. 3. Select your office location, category, and fill in the details. 4. Submit your request.";
      } else if (txt.includes('track') || txt.includes('status')) {
        reply = "To track a request: Go to your Dashboard and click 'View All Requests'. You can see the realtime status there. Your request ID starts with REQ-.";
      } else if (txt.includes('document') || txt.includes('photo') || txt.includes('upload')) {
        reply = "You can upload JPG, PNG images or PDF documents. Please ensure files are clear and relevant to your request.";
      } else if (txt.includes('secure') || txt.includes('data') || txt.includes('privacy')) {
        reply = "Your data is completely secure. We only share details with the assigned team for resolving the issue.";
      } else if (txt.includes('location') || txt.includes('office') || txt.includes('team')) {
        reply = "This portal covers all Innovation City office locations including HR, IT, Facilities, and other departments.";
      }

      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: reply },
        {
          sender: 'bot',
          isOptions: true,
          options: [
            { label: 'Back to main options', action: resetToMainMenu }
          ]
        }
      ]);
    }, 500);
  };

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-ic-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 group"
            aria-label="Open Chatbot Assistant"
          >
            <span className="hidden group-hover:inline-block font-medium pr-1 whitespace-nowrap">Need help? Ask IC Assist</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </button>
        )}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all max-h-[600px] h-[80vh]">
          {/* Header */}
          <div className="bg-ic-blue text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
               <h3 className="font-bold">IC Assist</h3>
            </div>
            <div className="flex gap-2">
              {mode !== 'MENU' && (
                <button onClick={resetToMainMenu} className="text-xs bg-blue-800 hover:bg-blue-900 px-2 py-1 rounded">
                  Main Menu
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 text-lg">&times;</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.text && (
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm mb-1 ${
                    msg.sender === 'user'
                      ? 'bg-ic-blue text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm whitespace-pre-line'
                  }`}>
                    {msg.text}
                  </div>
                )}

                {msg.isOptions && msg.options && (
                  <div className="flex flex-col gap-2 mt-1 w-full max-w-[85%]">
                    {msg.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={opt.action}
                        className="bg-white border border-ic-blue text-ic-blue hover:bg-blue-50 text-sm font-medium py-2 px-3 rounded-lg text-left shadow-sm transition-colors"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t shrink-0">
             <div className="flex gap-2 relative">
                <input
                  className="flex-grow border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-ic-blue outline-none disabled:bg-gray-100 disabled:text-gray-400"
                  placeholder={mode === 'QNA' ? "Type your question..." : "Select an option above"}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendInput()}
                  disabled={mode !== 'QNA'}
                />
                <button
                  onClick={handleSendInput}
                  disabled={mode !== 'QNA' || !input.trim()}
                  className="bg-ic-blue text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- Auth Wizard ---
export const AuthWizard: React.FC<{ onAuthenticated: (user: User) => void }> = ({ onAuthenticated }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleVerifyOTP = () => {
    if (otp === '1234') {
      // Mock authentication
      const user: User = {
        id: `USER-${mobile}`,
        name: "Employee User", // In a real app, fetch name from profile
        role: UserRole.EMPLOYEE,
        mobile: mobile
      };
      onAuthenticated(user);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleDemoLogin = () => {
    const adminUser: User = {
      id: 'ADMIN-001',
      name: 'Admin User',
      role: UserRole.ADMIN,
      mobile: '9999999999'
    };
    onAuthenticated(adminUser);
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center text-ic-blue">Login to Innovation City Portal</h2>

      {step === 1 ? (
        <>
          <Input
            label="Mobile Number"
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            error={error}
          />
          <Button fullWidth onClick={handleSendOTP} className="mt-2">Get OTP</Button>

          <div className="mt-6 text-center pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">For Testing Purposes:</p>
            <button onClick={handleDemoLogin} className="text-xs text-ic-blue underline">
              (Demo Only) Login as Admin
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 bg-blue-50 p-3 rounded text-sm text-blue-800">
            OTP sent to {mobile}. Use <strong>1234</strong> for testing.
          </div>
          <Input
            label="Enter OTP"
            placeholder="X X X X"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            error={error}
          />
          <Button fullWidth onClick={handleVerifyOTP} className="mt-2">Verify & Login</Button>
          <button
            onClick={() => setStep(1)}
            className="w-full text-center mt-4 text-sm text-gray-500 hover:text-ic-blue"
          >
            Change Mobile Number
          </button>
        </>
      )}
    </div>
  );
};

// --- File Request View ---
export const FileRequestView: React.FC<{ onSubmit: (data: any) => void; initialData?: ChatbotData }> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    officeLocation: '',
    location: '',
    description: '',
    isAnonymized: false,
    files: null as FileList | null
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        subject: initialData.subject || prev.subject,
        description: initialData.description || prev.description,
        category: initialData.category || prev.category,
        officeLocation: initialData.district || prev.officeLocation
      }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-ic-dark">Raise a New Request</h2>
      {initialData && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6 text-sm flex items-center gap-2">
          <span>Form pre-filled from IC Assist chat. Please review and add location details.</span>
        </div>
      )}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Request Subject"
            placeholder="Brief title of your request"
            required
            value={formData.subject}
            onChange={e => setFormData({...formData, subject: e.target.value})}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Request Category"
              options={CATEGORIES}
              placeholder="Select Category"
              required
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            />
            <Select
              label="Office Location"
              options={OFFICE_LOCATIONS}
              placeholder="Select Office Location"
              required
              value={formData.officeLocation}
              onChange={e => setFormData({...formData, officeLocation: e.target.value})}
            />
          </div>

          <Input
            label="Specific Location / Floor / Desk"
            placeholder="Floor number, Building, Room, Desk number..."
            required
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
          />

          <TextArea
            label="Detailed Description"
            placeholder="Please describe your request in detail..."
            rows={5}
            required
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Attach Photos/Documents (Optional)</label>
            <input
              type="file"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-ic-blue hover:file:bg-blue-100"
              onChange={e => setFormData({...formData, files: e.target.files})}
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id="anon"
              checked={formData.isAnonymized}
              onChange={e => setFormData({...formData, isAnonymized: e.target.checked})}
              className="w-4 h-4 text-ic-blue rounded focus:ring-ic-blue"
            />
            <label htmlFor="anon" className="text-sm text-gray-700">Submit this request anonymously</label>
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth size="lg">Submit Request</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// --- Track Requests View ---
export const TrackRequestsView: React.FC<{
  user: User;
  onViewDetails: (g: InternalRequest) => void;
  onBackToDashboard: () => void;
}> = ({ user, onViewDetails, onBackToDashboard }) => {
  const [requests, setRequests] = useState<InternalRequest[]>([]);

  useEffect(() => {
    // Load user's local requests
    const key = `hr_requests_${user.mobile}`;
    const localRequests = JSON.parse(localStorage.getItem(key) || "[]");

    // Combine with Mock data for demonstration purposes
    // In a real app, this would be an API call fetching by user ID
    const allRequests = [...localRequests, ...MOCK_REQUESTS];

    // Sort by date descending
    allRequests.sort((a: InternalRequest, b: InternalRequest) =>
      new Date(b.dateFiled).getTime() - new Date(a.dateFiled).getTime()
    );

    setRequests(allRequests);
  }, [user.mobile]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case RequestStatus.SUBMITTED: return 'info';
      case RequestStatus.UNDER_REVIEW: return 'warning';
      case RequestStatus.CLOSED: return 'success';
      default: return 'info';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
         <Button variant="ghost" className="pl-0 text-gray-600 hover:text-ic-blue" onClick={onBackToDashboard}>
            &larr; Back to Dashboard
         </Button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-ic-dark">My Requests</h2>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(g => (
            <Card key={g.id} onClick={() => onViewDetails(g)} className="cursor-pointer hover:border-ic-blue transition-all">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{g.id}</span>
                    <span className="text-xs text-gray-500">{new Date(g.dateFiled).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-lg text-ic-dark">{g.subject}</h3>
                </div>
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                   <Badge type={getStatusColor(g.status)}>{g.status}</Badge>
                   <span className="text-ic-blue text-sm font-medium">View Details &rarr;</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Request Details View ---
export const RequestDetailsView: React.FC<{
  request: InternalRequest;
  onBack: () => void;
  onReply: (msg: string) => void;
}> = ({ request, onBack, onReply }) => {
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    onReply(replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4 pl-0">
        &larr; Back to List
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-ic-dark mb-1">{request.subject}</h1>
                <p className="text-sm text-gray-500">Filed on {new Date(request.dateFiled).toLocaleDateString()} • ID: {request.id}</p>
              </div>
              <Badge type={
                request.status === RequestStatus.CLOSED ? 'success' :
                request.status === RequestStatus.UNDER_REVIEW ? 'warning' : 'info'
              }>
                {request.status}
              </Badge>
            </div>

            {/* Dynamic Status Details */}
            {request.status === RequestStatus.UNDER_REVIEW && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <h4 className="text-sm font-bold text-yellow-800 uppercase mb-1">Current Status</h4>
                <p className="text-sm text-yellow-900">Your request is currently under review.</p>
                {request.assignedTo && (
                  <div className="mt-2 pt-2 border-t border-yellow-200">
                    <p className="text-xs font-semibold text-yellow-800">Assigned To:</p>
                    <p className="text-sm font-medium text-ic-dark">{request.assignedTo}</p>
                  </div>
                )}
              </div>
            )}

            {request.status === RequestStatus.CLOSED && (
               <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <h4 className="text-sm font-bold text-green-800 uppercase mb-1">Case Closed</h4>
                {request.resolution && (
                   <div className="mb-3">
                     <p className="text-xs font-semibold text-green-800">Final Resolution:</p>
                     <p className="text-sm text-gray-800 italic">"{request.resolution}"</p>
                   </div>
                )}
                {request.closingOfficer && (
                  <div className="pt-2 border-t border-green-200">
                    <p className="text-xs font-semibold text-green-800">Closed By:</p>
                    <p className="text-sm font-medium text-ic-dark">{request.closingOfficer}</p>
                  </div>
                )}
              </div>
            )}

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap mb-4">{request.description}</p>

              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">Office Location:</span> {request.officeLocation}</div>
                <div><span className="font-semibold">Category:</span> {request.category}</div>
                <div><span className="font-semibold">Location:</span> {request.location}</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Discussion & Updates</h3>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {request.replies.length === 0 ? (
                <p className="text-gray-500 text-sm text-center italic">No remarks yet.</p>
              ) : (
                request.replies.map((reply, idx) => (
                  <div key={idx} className={`p-3 rounded ${reply.author === 'You' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="font-bold">{reply.author}</span>
                      <span>{new Date(reply.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-800">{reply.message}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-grow border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-ic-blue outline-none"
                placeholder="Add a remark or query..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
              />
              <Button size="sm" onClick={handleSendReply} disabled={request.status === RequestStatus.CLOSED}>Send</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              {request.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6">
                  <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                    event.status === 'completed' ? 'bg-ic-success border-ic-success' :
                    event.status === 'current' ? 'bg-white border-ic-accent' : 'bg-gray-200 border-gray-300'
                  }`}></span>
                  <p className="font-medium text-sm">{event.label}</p>
                  <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Admin Dashboard (Innovation City Request Control Panel) ---
export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Innovation City Request Control Panel</h1>
      <p className="text-gray-600 mb-6">Admin Dashboard - Innovation City Teams</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-blue-500">
           <h3 className="text-gray-500 text-sm">Total Requests</h3>
           <p className="text-2xl font-bold">142</p>
        </Card>
        <Card className="border-l-4 border-yellow-500">
           <h3 className="text-gray-500 text-sm">Pending (Normal)</h3>
           <p className="text-2xl font-bold">28</p>
        </Card>
        <Card className="border-l-4 border-orange-500">
           <h3 className="text-gray-500 text-sm">Important</h3>
           <p className="text-2xl font-bold">8</p>
        </Card>
        <Card className="border-l-4 border-red-500">
           <h3 className="text-gray-500 text-sm">Urgent</h3>
           <p className="text-2xl font-bold">3</p>
        </Card>
      </div>
      <Card>
        <p className="text-center text-gray-500 py-10">Select a request to view details and take action.</p>
      </Card>
    </div>
  );
};
