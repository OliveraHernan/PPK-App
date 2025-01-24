export interface DataSession {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    duration: number;
    status: string;
    visibility: boolean;
    facilitator: string;
    participants: string[];
    estimationType: string;
    customEstimationValues: any[];
    accessCode: string;
    userStories: {
      title: string;
      description: string;
      priority: string;
      status: string;
      votes: any[];
      finalEstimation: any;
      _id: string;
    }[];
    createdBy: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }