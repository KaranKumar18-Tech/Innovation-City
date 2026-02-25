export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN', // HR / Operations Admin
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  mobile: string;
}

export enum RequestStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  IN_PROGRESS = 'In Progress',
  PENDING = 'Pending',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  REOPENED = 'Reopened',
}

export interface TimelineEvent {
  label: string;
  date: string;
  status: 'completed' | 'pending' | 'current';
}

export interface RequestReply {
  author: string;
  message: string;
  date: string;
}

export interface InternalRequest {
  id: string;
  subject: string;
  description: string;
  location: string;
  officeLocation: string;
  category: string;
  dateFiled: string;
  status: string;
  files: string[]; // Storing file names for demo
  atr?: string; // Action Taken Report
  lastUpdated: string;
  isAnonymized: boolean;
  timeline: TimelineEvent[];
  replies: RequestReply[];

  // New fields for detailed status view
  assignedTo?: string;
  resolution?: string;
  closingOfficer?: string;
}

export interface ChatbotData {
  subject?: string;
  description?: string;
  category?: string;
  officeLocation?: string;
}

export interface StatCardProps {
  title: string;
  count: number;
  color: string;
  onClick?: () => void;
}