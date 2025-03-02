
import { Event, EventForm, Member } from "./types";

export const mockMembers: Member[] = [
  {
    id: "1",
    first_name: "Alex",
    last_name: "Johnson",
    pronouns: "he/him",
    email: "alex.johnson@example.com",
    displayName: "Alex Johnson",
    university: "Stanford University",
    student_id: 12345678,
    year: "3",
    faculty: "Engineering",
    major: "Computer Science",
    why_PM: "Interested in building products that solve real problems",
    returning_member: true,
    paymentVerified: true,
    joined_date: "2023-01-15",
    events_attended: ["1", "3"]
  },
  {
    id: "2",
    first_name: "Sarah",
    last_name: "Miller",
    pronouns: "she/her",
    email: "sarah.miller@example.com",
    displayName: "Sarah Miller",
    university: "MIT",
    student_id: 23456789,
    year: "2",
    faculty: "Business",
    major: "Management",
    why_PM: "Want to learn how to effectively manage products",
    returning_member: false,
    paymentVerified: true,
    joined_date: "2023-08-20",
    events_attended: ["2"]
  },
  {
    id: "3",
    first_name: "Jordan",
    last_name: "Lee",
    pronouns: "they/them",
    email: "jordan.lee@example.com",
    displayName: "Jordan Lee",
    university: "UC Berkeley",
    student_id: 34567890,
    year: "4",
    faculty: "Arts",
    major: "Design",
    why_PM: "Interested in UX/UI and product design",
    returning_member: true,
    paymentVerified: true,
    joined_date: "2022-09-05",
    events_attended: ["1", "2", "3"]
  },
  {
    id: "4",
    first_name: "Taylor",
    last_name: "Williams",
    pronouns: "she/her",
    email: "taylor.williams@example.com",
    displayName: "Taylor Williams",
    university: "Harvard University",
    student_id: 45678901,
    year: "5+",
    faculty: "Computer Science",
    major: "Artificial Intelligence",
    why_PM: "Passionate about AI products and their impact",
    returning_member: false,
    paymentVerified: false,
    joined_date: "2023-09-15",
    events_attended: []
  },
  {
    id: "5",
    first_name: "Jamie",
    last_name: "Chen",
    pronouns: "he/him",
    email: "jamie.chen@example.com",
    displayName: "Jamie Chen",
    university: "UCLA",
    student_id: 56789012,
    year: "1",
    faculty: "Engineering",
    major: "Electrical Engineering",
    why_PM: "Interested in hardware product management",
    returning_member: false,
    paymentVerified: true,
    joined_date: "2023-09-20",
    events_attended: ["3"]
  }
];

export const mockEvents: Event[] = [
  {
    event_Id: "1",
    name: "Product Management Workshop",
    date: "2023-10-15",
    start_time: "T14:00:00",
    end_time: "T16:00:00",
    location: "Main Campus, Room 101",
    description: "Learn the fundamentals of product management in this interactive workshop.",
    media: ["/placeholder.svg"],
    member_price: 0,
    non_member_price: 10,
    attendee_Ids: ["1", "3"],
    member_only: false,
    maxAttendee: 30,
    eventFormId: "1",
    isDisabled: false
  },
  {
    event_Id: "2",
    name: "Design Thinking Seminar",
    date: "2023-11-05",
    start_time: "T15:30:00",
    end_time: "T17:30:00",
    location: "Innovation Hub",
    description: "A seminar on applying design thinking principles to product development.",
    media: ["/placeholder.svg"],
    member_price: 5,
    non_member_price: 15,
    attendee_Ids: ["2", "3"],
    member_only: false,
    maxAttendee: 25,
    eventFormId: "2",
    isDisabled: false
  },
  {
    event_Id: "3",
    name: "Networking Mixer",
    date: "2023-12-10",
    start_time: "T18:00:00",
    end_time: "T20:00:00",
    location: "Student Center, Ballroom",
    description: "Network with industry professionals and fellow members.",
    media: ["/placeholder.svg"],
    member_price: 0,
    non_member_price: 0,
    attendee_Ids: ["1", "3", "5"],
    member_only: true,
    maxAttendee: 50,
    eventFormId: undefined,
    isDisabled: false
  }
];

export const mockEventForms: EventForm[] = [
  {
    id: "1",
    title: "Product Management Workshop Registration",
    questions: [
      {
        label: "What is your experience level with product management?",
        questionType: "dropdown",
        options: ["Beginner", "Intermediate", "Advanced"],
        required: true
      },
      {
        label: "What do you hope to gain from this workshop?",
        questionType: "long-answer",
        required: true
      },
      {
        label: "Do you have any specific topics you'd like us to cover?",
        questionType: "short-answer",
        required: false
      }
    ]
  },
  {
    id: "2",
    title: "Design Thinking Seminar Registration",
    questions: [
      {
        label: "Have you applied design thinking before?",
        questionType: "radio",
        options: ["Yes", "No"],
        required: true
      },
      {
        label: "Which aspects of design thinking are you most interested in?",
        questionType: "checkbox",
        options: ["Empathize", "Define", "Ideate", "Prototype", "Test"],
        required: true
      },
      {
        label: "If you have a design portfolio, please share a link",
        questionType: "short-answer",
        required: false
      }
    ]
  }
];
