export interface Schedule {
    id: number,
    churchId: number,
    dayOfWeek: number,
    time: string,
    additionalInformation: string,
}

export type ScheduleList = Schedule[];