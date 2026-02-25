
import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/Layout';
import { HomeView, FileRequestView, AdminDashboard, AuthWizard, TrackRequestsView, RequestDetailsView, EmployeeDashboard, ICAssist } from './components/Views';
import { User, UserRole, InternalRequest, RequestStatus, ChatbotData } from './types';
import { Modal } from './components/UI';

type ViewState = 'home' | 'dashboard' | 'file-request' | 'track' | 'request-details';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingView, setPendingView] = useState<ViewState | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<InternalRequest | null>(null);
  const [chatbotData, setChatbotData] = useState<ChatbotData | undefined>(undefined);

  // Restore session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('ic_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('ic_user', JSON.stringify(authenticatedUser));
    setShowAuthModal(false);

    if (pendingView) {
      setView(pendingView);
      setPendingView(null);
    } else {
      // Redirect to dashboard on successful login if no specific view was pending
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ic_user');
    setView('home');
    setSelectedRequest(null);
  };

  // Navigation Guards
  const navigateTo = (targetView: ViewState) => {
    // If accessing protected routes without login, show auth modal
    if ((targetView === 'file-request' || targetView === 'track' || targetView === 'dashboard') && !user) {
      setPendingView(targetView);
      setShowAuthModal(true);
    } else {
      setView(targetView);
    }
  };

  const handleSubmitGrievance = (data: any) => {
    if (!user) return;

    const newRequest: InternalRequest = {
      id: `ICR-2025-${String(Date.now()).slice(-3)}`,
      subject: data.subject,
      description: data.description,
      location: data.location,
      officeLocation: data.officeLocation,
      category: data.category,
      dateFiled: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: RequestStatus.SUBMITTED,
      files: data.files ? Array.from(data.files).map((f: any) => f.name) : [],
      isAnonymized: data.isAnonymized,
      timeline: [
        { label: "Request Filed", date: new Date().toISOString(), status: 'current' }
      ],
      replies: []
    };

    const key = `ic_requests_${user.mobile}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([newRequest, ...existing]));

    alert(`Request Submitted Successfully! Your ID is ${newRequest.id}`);
    setChatbotData(undefined); // Reset chatbot data
    // Automatically go to tracking view to see the new request
    setView('track');
  };

  const handleViewDetails = (r: InternalRequest) => {
    setSelectedRequest(r);
    setView('request-details');
  };

  const handleReplyRequest = (message: string) => {
    if (!user || !selectedRequest) return;

    const reply = {
      author: 'You',
      message: message,
      date: new Date().toISOString()
    };

    const updatedRequest = {
      ...selectedRequest,
      replies: [...selectedRequest.replies, reply],
      lastUpdated: new Date().toISOString()
    };

    // Update State
    setSelectedRequest(updatedRequest);

    // Update LocalStorage
    const key = `ic_requests_${user.mobile}`;
    const allRequests = JSON.parse(localStorage.getItem(key) || "[]");
    const updatedList = allRequests.map((r: InternalRequest) => r.id === updatedRequest.id ? updatedRequest : r);
    localStorage.setItem(key, JSON.stringify(updatedList));
  };

  const handleChatbotNavigate = (target: 'file-request' | 'track', data?: any) => {
    if (data) setChatbotData(data);
    navigateTo(target);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setShowAuthModal(true)}
        onRegisterClick={() => setShowAuthModal(true)}
        onDashboardClick={() => navigateTo('dashboard')}
        onHomeClick={() => setView('home')}
      />

      <main className="flex-grow relative">
        {view === 'home' && (
          <HomeView
            onFileRequest={() => navigateTo('file-request')}
            onTrack={() => navigateTo('track')}
          />
        )}

        {view === 'file-request' && (
          <FileRequestView onSubmit={handleSubmitGrievance} initialData={chatbotData} />
        )}

        {view === 'track' && user && (
          <TrackRequestsView
            user={user}
            onViewDetails={handleViewDetails}
            onBackToDashboard={() => setView('dashboard')}
          />
        )}

        {view === 'request-details' && selectedRequest && (
          <RequestDetailsView
            request={selectedRequest}
            onBack={() => setView('track')}
            onReply={handleReplyRequest}
          />
        )}

        {view === 'dashboard' && user && user.role === UserRole.EMPLOYEE && (
           <EmployeeDashboard
             user={user}
             onNavigate={(target, data) => {
               if (data) handleViewDetails(data);
               else navigateTo(target);
             }}
           />
        )}

        {view === 'dashboard' && user && user.role === UserRole.ADMIN && (
          <AdminDashboard />
        )}

        {/* Fallback for unauthorized access to dashboard */}
        {view === 'dashboard' && user?.role !== UserRole.ADMIN && user?.role !== UserRole.EMPLOYEE && (
           <div className="text-center py-20">
             <h2 className="text-xl text-red-600">Unauthorized Access</h2>
             <button onClick={() => setView('home')} className="mt-4 underline">Go Home</button>
           </div>
        )}
      </main>

      {/* Global Chatbot Assistant */}
      <ICAssist
        user={user}
        onNavigate={handleChatbotNavigate}
        onLogin={() => setShowAuthModal(true)}
      />

      <Footer />

      {/* Authentication Modal */}
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title=""
      >
        <AuthWizard onAuthenticated={handleAuthSuccess} />
      </Modal>
    </div>
  );
};

export default App;
