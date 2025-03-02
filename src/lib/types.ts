import { z } from 'zod';

export type Event = {
    event_Id: string // generated
    name: string // from request
    date: string // Date in ISO format (e.g. YYYY-MM-DD)
    start_time: string // start time in ISO format (e.g. Thh:mm:ss)
    end_time: string // end time in ISO format (e.g. Thh:mm:ss)
    location: string // from request
    description: string // from request
    media: string[] // generated
    member_price: number | string // from request
    non_member_price: number | string // from request
    attendee_Ids: string[] | string
    member_only: boolean | string // from request
    maxAttendee: number
    eventFormId: string | undefined
    isDisabled: boolean // manually write default as "false" when adding new event
}

export type Member = {
    id: string
    first_name: string
    last_name: string
    pronouns: string
    email: string // from Google
    displayName: string // from Google
    university: string
    student_id: number
    year: string // "5+"
    faculty: string
    major: string
    why_PM: string
    returning_member: boolean
    paymentVerified: boolean
}

export const QuestionSchema = z.object({
    label: z.string(),
    questionType: z.enum(['short-answer', 'long-answer', 'dropdown', 'checkbox', 'radio', 'file']),
    options: z.array(z.string()).optional(),
    required: z.boolean().optional().default(false)
});

export const EventFormSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    questions: z.array(QuestionSchema),
});

export type EventForm = z.infer<typeof EventFormSchema>;
