import {create} from "zustand";

export interface IInterviewInfo {
    id: string;
    name: string;
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

export interface IInterviewStore {
    interviewInfo: IInterviewInfo | null;
    roundNames: Record<number, string>,
    setInterviewInfo: (product: IInterviewInfo | null) => void;
}

export default create<IInterviewStore>((set) => ({
    interviewInfo: null,
    roundNames: {},

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
