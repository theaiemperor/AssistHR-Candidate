"use client";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {jobInfo} from "@/app/(interview)/interview/jobData";
import useCurrentInterview from "@/app/(interview)/interview/useCurrentInterview";
import RoundPage from "@/app/(interview)/interview/pages/RoundPage";
import OverviewPage from "@/app/(interview)/interview/pages/OverviewPage";

export interface JobInfo {
    id: string;
    name: string;
    description: string;
    rounds: {
        name: string
        description: string
        avgDuration: number
    }[]
    company: string
    createdAt: Date;
}

export default function () {
    
    const round = useSearchParams().get("round") || ""

    const {setInfo, interviewInfo} = useCurrentInterview()

    useEffect(() => {
        const roundsNames = jobInfo.rounds.map(round => round.name)
        setInfo({...jobInfo, roundsNames})
    }, [])


    if (interviewInfo === null) {
        return;
    }

    if (round !== "") {
        return <RoundPage/>
    } else {
        return <OverviewPage/>
    }


}
