export interface AIResponse {
    content: string
    status: 'pending' | 'success' | 'failed'
}


export interface Token {
    interviewId: string
    jobId: string
    assistantId: string
    threadId: string
    roundKey: number
    nextRound: string | null
    info: 'screening_pending' | 'screening_completed' | 'round_pending' | 'round_completed' | 'failed' | 'completed'
}


export interface IJobInfo {
    id: string;
    title: string;
    shortDescription: string
    rounds: {
        _id: string,
        name: string,
        description: string,
    }[]
    businessName: string
    createdAt: Date;
}



export interface InterviewResponse {
    message: string
    data: AIResponse,
    meta: Token & {
        token: string,
    }
}
