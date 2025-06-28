import {create} from "zustand";

export interface IInterviewInfo {
    id: string;
    name: string;
    description: string;
    screening?: string;
    rounds: {
        name: string
        description: string
        avgDuration: number
    }[]
    roundsNames: string[]
    company: string
    createdAt: Date;
}

export interface IInterviewStore {
    interviewInfo: IInterviewInfo | null;
    setInfo: (product: IInterviewInfo | null) => void;
}

export default create<IInterviewStore>((set) => ({
    interviewInfo: null,

    setInfo: (info: IInterviewInfo | null) =>
        set((state) => {
            return {...state, interviewInfo: info};
        }),
}));
