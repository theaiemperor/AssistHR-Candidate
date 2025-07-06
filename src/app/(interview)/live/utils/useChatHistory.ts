import {create} from "zustand";


export interface ChatProps {
    content: string
    isUser: boolean
}


export interface IJobStore {
    history: ChatProps[]
    setHistory: (log: ChatProps) => void;
    resetHistory: () => void;
    isPending: boolean;
    setPending: (log: boolean) => void;
}

export default create<IJobStore>((set) => ({
    history: [],

    isPending: false,
    setPending: (isPending: boolean) => set((state) => ({...state, isPending})),

    setHistory: (log: ChatProps) =>
        set((state) => {
            return {...state, history: [...state.history, log]};
        }),

    resetHistory: () => set((state) => ({...state, history: []}))
}));
