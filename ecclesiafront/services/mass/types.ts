export interface Mass {
    id: number,
    church_id: number,
    day_of_week: number,
    time: string,
    additional_information: string,
}

export type MassList = Mass[];