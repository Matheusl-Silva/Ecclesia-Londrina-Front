export interface Schedule {
    id: number,
    church_id: number,
    title: string,
    dayOfWeek: number,
    date: string,
    startsAt: string,
    endsAt: string,
    type: string,
    isRecurring: boolean,
    isActive: boolean,
    additionalInformation: string | null,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
}

export type ScheduleList = Schedule[];

export enum ScheduleTypeEnum {
    MASS = 'mass',
    CELEBRATION = 'celebration',
    CONFESSION = 'confession',
    WEDDING = 'wedding',
    EVENT = 'event',
    CATECHISM = 'catechism',
    OFFICE_HOURS = 'office_hours',
    OTHER = 'other',
    PARTY = 'party'
}

export interface CreateSchedulePayload {
    church_id: number;
    title: string;
    dayOfWeek: number;
    startsAt: string;
    endsAt?: string | null;
    type: string;
    isRecurring: boolean;
    additionalInformation?: string | null;
}