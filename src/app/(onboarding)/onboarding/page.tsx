"use client"
import AddResume from "@/app/(onboarding)/onboarding/AddResume";
import AddSkills from "@/app/(onboarding)/onboarding/AddSkills";
import Profile from "@/app/(onboarding)/onboarding/Profile";
import {Progress} from "@/components/ui/progress";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";


const onboardingPages = [
    'resume',
    'skills',
    'profile'
]

export default function () {

    const query = useSearchParams();
    const page = query.get('page') || "";
    const router = useRouter();

    useEffect(() => {
        if (!onboardingPages.includes(page)) {
            router.replace("?page=resume")
        }
    }, [])

    const currentProgress = (onboardingPages.indexOf(page) + 1) * (100 / onboardingPages.length)


    return <div className={'space-y-3'}>
        <Progress value={currentProgress}/>

        {page === 'resume' && <AddResume/>}
        {page === 'skills' && <AddSkills/>}
        {page === 'profile' && <Profile/>}

    </div>

}
