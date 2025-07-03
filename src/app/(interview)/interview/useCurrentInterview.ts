import {create} from "zustand";
import {jwtDecode} from "jwt-decode";

export interface IInterviewInfo {
    id: string;
    title: string;
    shortDescription: string;
    screening: string;
    rounds: {
        [key: number]: {
            name: string,
            shortDescription: string
            avgDuration: number
        }
    }
    businessName: string
    createdAt: Date;
}


interface Token {
    interviewId: string
    jobId: string
    assistantId: string
    threadId: string
    roundKey: number
    nextRound: string | null
    info: 'screening' | 'pending' | 'completed' | 'screening_completed'
}

export interface IInterviewStore {
    interviewInfo: IInterviewInfo | null;
    roundNames: Record<number, string>,
    auth: {
        token: string,
        value: Token
    } | null,
    setToken: (token: string) => void,
    setInterviewInfo: (product: IInterviewInfo | null) => void;
}

export default create<IInterviewStore>((set) => ({
    interviewInfo: null,
    roundNames: {},
    auth: null,
    setToken: (token: string | null) => {

        if (token === null) {
            return set(state => ({...state, auth: null}))
        }

        const value = (jwtDecode(token) as any).data as Token;
        return set(state => ({...state, auth: {token, value}}))
    },

    setInterviewInfo: (info: IInterviewInfo | null) =>
        set((state) => {

            if (info) {

                const rounds = Object.entries(info.rounds).reduce((acc, [key, value]) => {
                    acc[Number(key)] = value.name;
                    return acc;
                }, {} as Record<number, string>);

                return {...state, interviewInfo: info, roundNames: rounds};
            }

            return state;

        }),
}));
