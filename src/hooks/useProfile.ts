import {create} from "zustand";

interface Profile {
    _id: string
    name: string
    email: string
    role: 'candidate' | string
    token: string
    profileId: string
}


export interface IProfileStore {
    profile: null | Profile;
    setProfile: (value: Profile) => void;
}


export default create<IProfileStore>((set) => ({
    profile: null,

    setProfile: (value) => {
        set((state) => {

            return {
                ...state,
                profile: {...state.profile, ...value}
            }
        })
    }
}));
