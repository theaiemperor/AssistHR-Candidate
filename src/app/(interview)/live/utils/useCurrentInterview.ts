import {create} from "zustand";
import {IJobInfo, Token} from "@/app/(interview)/live/utils/types";


export interface IJobStore {
    jobInfo: IJobInfo | null;
    auth: Token & { token: string } | null,
    setToken: (auth: Token & { token: string }) => void,
    setJobInfo: (product: IJobInfo | null) => void;
}

export default create<IJobStore>((set) => ({
    jobInfo: null,
    auth: null,
    setToken: (auth: IJobStore['auth']) => {

        return set(state => ({...state, auth}))
    },

    setJobInfo: (info: IJobInfo | null) =>
        set((state) => {
            return {...state, ...(info && {jobInfo: info})};

        }),
}));
