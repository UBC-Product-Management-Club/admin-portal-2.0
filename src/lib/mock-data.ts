import { Event, Member, EventForm } from './types';

export const mockMembers: Member[] = [
  {
    id: 'member-1',
    first_name: 'Jane',
    last_name: 'Smith',
    pronouns: 'she/her',
    email: 'jane.smith@university.edu',
    displayName: 'Jane Smith',
    university: 'University of Technology',
    student_id: 12345678,
    year: '3',
    faculty: 'Engineering',
    major: 'Computer Science',
    why_PM: 'I want to learn more about project management and gain practical experience.',
    returning_member: true,
    paymentVerified: true
  },
  {
    id: 'member-2',
    first_name: 'John',
    last_name: 'Doe',
    pronouns: 'he/him',
    email: 'john.doe@university.edu',
    displayName: 'John Doe',
    university: 'University of Technology',
    student_id: 87654321,
    year: '2',
    faculty: 'Business',
    major: 'Marketing',
    why_PM: 'Interested in learning how project management integrates with marketing strategies.',
    returning_member: false,
    paymentVerified: true
  },
  {
    id: 'member-3',
    first_name: 'Alex',
    last_name: 'Johnson',
    pronouns: 'they/them',
    email: 'alex.johnson@university.edu',
    displayName: 'Alex Johnson',
    university: 'State University',
    student_id: 23456789,
    year: '4',
    faculty: 'Arts & Sciences',
    major: 'Psychology',
    why_PM: 'Exploring how psychology principles can be applied to effective project management.',
    returning_member: true,
    paymentVerified: false
  },
  {
    id: 'member-4',
    first_name: 'Emily',
    last_name: 'Chen',
    pronouns: 'she/her',
    email: 'emily.chen@university.edu',
    displayName: 'Emily Chen',
    university: 'Pacific College',
    student_id: 34567890,
    year: '1',
    faculty: 'Engineering',
    major: 'Mechanical Engineering',
    why_PM: 'Looking to develop leadership skills through project management.',
    returning_member: false,
    paymentVerified: true
  },
  {
    id: 'member-5',
    first_name: 'Michael',
    last_name: 'Rodriguez',
    pronouns: 'he/him',
    email: 'michael.r@university.edu',
    displayName: 'Michael Rodriguez',
    university: 'University of Technology',
    student_id: 45678901,
    year: '5+',
    faculty: 'Information Technology',
    major: 'Software Engineering',
    why_PM: 'Want to combine technical knowledge with project management skills for career advancement.',
    returning_member: true,
    paymentVerified: true
  }
];

export const mockEvents: Event[] = [
  {
    event_Id: 'event-1',
    name: 'Project Management Workshop',
    date: '2023-11-15',
    start_time: 'T13:00:00',
    end_time: 'T16:00:00',
    location: 'Main Campus, Room 301',
    description: 'A hands-on workshop covering the basics of project management methodologies.',
    media: [],
    member_price: '0',
    non_member_price: '15',
    attendee_Ids: ['member-1', 'member-3', 'member-5'],
    member_only: false,
    maxAttendee: 30,
    eventFormId: 'form-1',
    isDisabled: false
  },
  {
    event_Id: 'event-2',
    name: 'Industry Speaker: Agile in Tech',
    date: '2023-11-22',
    start_time: 'T18:00:00',
    end_time: 'T20:00:00',
    location: 'Virtual (Zoom)',
    description: 'Join us for an insightful talk from a leading tech industry project manager about implementing Agile methodologies.',
    media: [],
    member_price: '0',
    non_member_price: '5',
    attendee_Ids: ['member-2', 'member-4', 'member-5'],
    member_only: false,
    maxAttendee: 100,
    eventFormId: 'form-2',
    isDisabled: false
  },
  {
    event_Id: 'event-3',
    name: 'Members-Only Networking Night',
    date: '2023-12-05',
    start_time: 'T19:00:00',
    end_time: 'T21:30:00',
    location: 'City Café',
    description: 'An exclusive networking event for members to connect and share experiences in a casual setting.',
    media: [],
    member_price: '5',
    non_member_price: '0',
    attendee_Ids: ['member-1', 'member-5'],
    member_only: true,
    maxAttendee: 40,
    eventFormId: undefined,
    isDisabled: false
  },
  {
    event_Id: 'event-4',
    name: 'Project Management Career Fair',
    date: '2024-01-20',
    start_time: 'T10:00:00',
    end_time: 'T15:00:00',
    location: 'University Conference Center',
    description: 'Connect with companies hiring for project management roles and internships.',
    media: [],
    member_price: '0',
    non_member_price: '10',
    attendee_Ids: [],
    member_only: false,
    maxAttendee: 200,
    eventFormId: 'form-3',
    isDisabled: true
  }
];

export const mockEventForms: EventForm[] = [
  {
    id: 'form-1',
    title: 'Project Management Workshop Registration',
    questions: [
      {
        label: 'What is your experience level with project management?',
        questionType: 'dropdown',
        options: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
      },
      {
        label: 'Do you have any specific topics you would like covered?',
        questionType: 'long-answer',
        required: false
      },
      {
        label: 'Which software tools have you used?',
        questionType: 'checkbox',
        options: ['Jira', 'Asana', 'Trello', 'Microsoft Project', 'Other'],
        required: false
      }
    ]
  },
  {
    id: 'form-2',
    title: 'Industry Speaker Event Registration',
    questions: [
      {
        label: 'Are you currently working on any projects?',
        questionType: 'radio',
        options: ['Yes', 'No'],
        required: true
      },
      {
        label: 'What questions do you have for the speaker?',
        questionType: 'long-answer',
        required: false
      },
      {
        label: 'How did you hear about this event?',
        questionType: 'short-answer',
        required: false
      }
    ]
  },
  {
    id: 'form-3',
    title: 'Career Fair Registration',
    questions: [
      {
        label: 'Upload your resume',
        questionType: 'file',
        required: true
      },
      {
        label: 'What type of position are you looking for?',
        questionType: 'dropdown',
        options: ['Internship', 'Entry-level', 'Mid-level', 'Senior'],
        required: true
      },
      {
        label: 'Which industries are you interested in?',
        questionType: 'checkbox',
        options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Other'],
        required: true
      },
      {
        label: 'Tell us a bit about your career goals',
        questionType: 'long-answer',
        required: false
      }
    ]
  }
];
