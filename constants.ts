import { InternalRequest, RequestStatus } from './types';

export const MOCK_REQUESTS: InternalRequest[] = [
  {
    id: "ICR-2025-001",
    subject: "Payroll Discrepancy - Missing Bonus",
    description: "My salary for January is showing a discrepancy. The performance bonus appears to be missing from my salary slip. Please review and correct the payment.",
    location: "Desk A-204",
    officeLocation: "Building A - Engineering",
    category: "HR & Payroll",
    dateFiled: "2025-01-10",
    status: RequestStatus.UNDER_REVIEW,
    files: ["salary_slip.pdf"],
    lastUpdated: "2025-01-12",
    isAnonymized: false,
    assignedTo: "Priya Sharma (HR & Payroll Team)",
    timeline: [
      { label: "Request Filed", date: "2025-01-10", status: "completed" },
      { label: "Assigned to HR Team", date: "2025-01-11", status: "completed" },
      { label: "Under Review", date: "2025-01-12", status: "current" }
    ],
    replies: []
  },
  {
    id: "ICR-2025-002",
    subject: "Laptop Performance Issue - Slow Boot",
    description: "My laptop is taking 5+ minutes to boot up and frequently freezes during work. This is affecting my productivity. Request for system diagnostics or replacement.",
    location: "Floor 5 - Desk F5-102",
    officeLocation: "Floor 5 - Product & Design",
    category: "IT Support",
    dateFiled: "2025-01-08",
    status: RequestStatus.IN_PROGRESS,
    files: ["screenshot_error.jpg"],
    lastUpdated: "2025-01-14",
    isAnonymized: false,
    assignedTo: "Raj Patel (IT Support Team)",
    timeline: [
      { label: "Request Filed", date: "2025-01-08", status: "completed" },
      { label: "Under Review", date: "2025-01-09", status: "completed" },
      { label: "Technical Assessment In Progress", date: "2025-01-14", status: "current" }
    ],
    replies: [
      { author: "IT Support Team", message: "We have scheduled a diagnostic check for your laptop. Please connect with us for a time slot.", date: "2025-01-14" }
    ]
  },
  {
    id: "ICR-2025-003",
    subject: "AC Not Working - Meeting Room B3",
    description: "The air conditioning unit in Meeting Room B3 has stopped functioning. The room is extremely hot and unsuitable for meetings. This is affecting team productivity.",
    location: "Meeting Room B3, HQ",
    officeLocation: "HQ - Main Campus",
    category: "Workplace Facilities",
    dateFiled: "2025-01-05",
    status: RequestStatus.CLOSED,
    files: [],
    atr: "Facility issue resolved.",
    lastUpdated: "2025-01-09",
    isAnonymized: false,
    resolution: "AC unit has been repaired and tested. The system is now functioning optimally. Temperature maintained at 22°C.",
    closingOfficer: "Vikram Singh (Facilities Management)",
    timeline: [
      { label: "Request Filed", date: "2025-01-05", status: "completed" },
      { label: "Facilities Assigned", date: "2025-01-06", status: "completed" },
      { label: "Resolved", date: "2025-01-09", status: "completed" }
    ],
    replies: [
      { author: "Facilities Team", message: "AC unit has been inspected. Repair work will commence shortly.", date: "2025-01-07" },
      { author: "Facilities Team", message: "Repair completed and tested successfully. Room temperature is now normal.", date: "2025-01-09" }
    ]
  },
  {
    id: "ICR-2025-004",
    subject: "Expense Reimbursement Pending - Q4 Conference",
    description: "Submitted expense reimbursement request for Q4 conference attendance on 2024-12-15. Total amount: $2,450. Status is still pending for over 30 days.",
    location: "Floor 3 - HR Desk",
    officeLocation: "Floor 3 - Finance & HR",
    category: "HR & Payroll",
    dateFiled: "2025-01-12",
    status: RequestStatus.SUBMITTED,
    files: ["expense_receipts.pdf", "conference_invoice.pdf"],
    lastUpdated: "2025-01-12",
    isAnonymized: false,
    timeline: [
      { label: "Request Filed", date: "2025-01-12", status: "current" }
    ],
    replies: []
  },
  {
    id: "ICR-2025-005",
    subject: "VPN Access Request - New Joiner",
    description: "Need VPN access credentials for remote work from home. I am a newly onboarded employee starting remote work from this week.",
    location: "Remote / WFH",
    officeLocation: "Remote / WFH",
    category: "Security & Access",
    dateFiled: "2025-01-03",
    status: RequestStatus.RESOLVED,
    files: ["onboarding_email.pdf"],
    lastUpdated: "2025-01-15",
    isAnonymized: false,
    resolution: "VPN credentials have been issued and user has been added to secure networks. Access verified and tested.",
    closingOfficer: "Arjun Nair (Security & Access Team)",
    timeline: [
      { label: "Request Filed", date: "2025-01-03", status: "completed" },
      { label: "Verified Credentials", date: "2025-01-05", status: "completed" },
      { label: "Resolved", date: "2025-01-15", status: "completed" }
    ],
    replies: [
      { author: "Security Team", message: "Credentials generated. Please check your email for VPN setup instructions.", date: "2025-01-05" }
    ]
  },
  {
    id: "ICR-2025-006",
    subject: "Workplace Conduct Concern - Confidential",
    description: "I have witnessed conduct that I believe violates company policy. I am filing this anonymously as per our ethics guidelines. Please contact me through the portal.",
    location: "Building B - Floor 4",
    officeLocation: "Building B - Operations",
    category: "Compliance / Ethics",
    dateFiled: "2025-01-14",
    status: RequestStatus.UNDER_REVIEW,
    files: [],
    lastUpdated: "2025-01-15",
    isAnonymized: true,
    assignedTo: "Compliance Officer (Ethics & Compliance Team)",
    timeline: [
      { label: "Request Filed", date: "2025-01-14", status: "completed" },
      { label: "Assigned to Compliance Team", date: "2025-01-15", status: "completed" },
      { label: "Under Review", date: "2025-01-15", status: "current" }
    ],
    replies: []
  },
  {
    id: "ICR-2025-007",
    subject: "Career Development Discussion Request",
    description: "Would like to schedule a discussion with my manager regarding career growth opportunities and promotion timeline. I have been with the organization for 2 years now.",
    location: "Building B - Mgmt Office",
    officeLocation: "Building B - Operations",
    category: "Managerial Issues",
    dateFiled: "2025-01-07",
    status: RequestStatus.IN_PROGRESS,
    files: [],
    lastUpdated: "2025-01-13",
    isAnonymized: false,
    assignedTo: "HR Business Partner (HR & Payroll Team)",
    timeline: [
      { label: "Request Filed", date: "2025-01-07", status: "completed" },
      { label: "HR Notified", date: "2025-01-08", status: "completed" },
      { label: "Meeting Being Scheduled", date: "2025-01-13", status: "current" }
    ],
    replies: [
      { author: "HR Team", message: "Your manager has been informed. We are coordinating to schedule a meeting in the next week.", date: "2025-01-13" }
    ]
  },
  {
    id: "ICR-2025-008",
    subject: "Cafeteria Menu Feedback - More Vegetarian Options",
    description: "The current cafeteria menu has limited vegetarian options. Requesting more variety in plant-based meals to accommodate dietary preferences of team members.",
    location: "HQ Cafeteria",
    officeLocation: "HQ - Main Campus",
    category: "General Feedback",
    dateFiled: "2025-01-11",
    status: RequestStatus.SUBMITTED,
    files: [],
    lastUpdated: "2025-01-11",
    isAnonymized: false,
    timeline: [
      { label: "Request Filed", date: "2025-01-11", status: "current" }
    ],
    replies: []
  }
];

export const OFFICE_LOCATIONS = [
  "HQ - Main Campus",
  "Building A - Engineering",
  "Building B - Operations",
  "Floor 3 - Finance & HR",
  "Floor 5 - Product & Design",
  "Floor 7 - Sales & Marketing",
  "South Campus - IT",
  "North Campus - Legal & Compliance",
  "Remote / WFH",
  "Satellite Office - Bengaluru"
];

export const CATEGORIES = [
  "HR & Payroll",
  "IT Support",
  "Workplace Facilities",
  "Compliance / Ethics",
  "Security & Access",
  "Managerial Issues",
  "General Feedback"
];
