
export interface DataSession{
    _id: string,
    name: string,
    startDate: string,
    duration: number,
    status: string,
    facilitator: string,
    participants: string[],
    estimationType: string,
    customEstimationValues?: (number | string)[],
    visibility: string,
    accessCode?: string,
    userStories: string[],
    createdAt: string,
    updatedAt: string,
    __v: number
}