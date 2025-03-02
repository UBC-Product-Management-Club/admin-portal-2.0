
import { z } from 'zod';

// Event Schema
export type Event = {
    event_Id: string
    name: string
    date: string // Date in ISO format (e.g. YYYY-MM-DD)
    start_time: string // start time in ISO format (e.g. Thh:mm:ss)
    end_time: string // end time in ISO format (e.g. Thh:mm:ss)
    location: string
    description: string
    media: string[]
    member_price: number | string
    non_member_price: number | string
    attendee_Ids: string[] | string
    member_only: boolean | string
    maxAttendee: number
    eventFormId: string | undefined
    isDisabled: boolean
}

// Event Form Schema
export const QuestionSchema = z.object({
    label: z.string(),
    questionType: z.enum(['short-answer', 'long-answer', 'dropdown', 'checkbox', 'radio', 'file']),
    options: z.array(z.string()).optional(),
    required: z.boolean().optional()
});

export const EventFormSchema = z.object({
    id: z.string(),
    title: z.string(),
    questions: z.array(QuestionSchema),
});

export type EventForm = z.infer<typeof EventFormSchema>;
export type Question = z.infer<typeof QuestionSchema>;

// User Schema
export type Member = {
    id: string
    first_name: string
    last_name: string
    pronouns: string
    email: string
    displayName: string
    university: string
    student_id: number
    year: string
    faculty: string
    major: string
    why_PM: string
    returning_member: boolean
    paymentVerified: boolean
    joined_date: string
    events_attended: string[]
}

// Auth Context Types
export type AuthUser = {
    id: string
    email: string
    name: string
    picture?: string
}

export type AuthContextType = {
    isAuthenticated: boolean
    isLoading: boolean
    user: AuthUser | null
    login: () => Promise<void>
    logout: () => Promise<void>
}
