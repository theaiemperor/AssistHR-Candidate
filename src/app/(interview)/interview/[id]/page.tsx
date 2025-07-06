"use client";
import {useParams, useSearchParams} from "next/navigation";
import useCurrentInterview from "@/app/(interview)/interview/useCurrentInterview";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/global/Loader";
import {AxiosError} from "axios";
import InterviewErrorPage from "@/app/(interview)/live/components/InterviewError";
import OverviewPage from "@/app/(interview)/interview/pages/OverviewPage";
import {useMemo} from "react";
import RoundPage from "@/app/(interview)/interview/pages/RoundPage";
import apiClient from "@/lib/axiosClient";


export default function () {

    const searchParams = useSearchParams();
    const currentRound = useMemo(() => searchParams.get("round") || "", [searchParams]);
    const {id} = useParams();


    const {setInterviewInfo} = useCurrentInterview()


    const {isLoading, isError, error} = useQuery({
        queryKey: ['interview_' + currentRound],
        queryFn: loadInterviewInfo,
        refetchInterval: 0
    })


    async function loadInterviewInfo() {
        try {
            const {data: {data}} = await apiClient('/jobs/' + id);
            setInterviewInfo(data);
            return data;
        } catch (error) {

            if (error instanceof AxiosError && error.response) {
                const e = new Error()
                e.name = error.response.statusText
                e.message = error.response.data.message
                throw e;
            }
            throw new Error();
        }
    }


    if (isLoading) {
        return <Loader msg={'Loading interviews info'}/>;
    }

    if (isError) {
        return <InterviewErrorPage
            title={error.name || "Some problem happened"}
            message={error.message || "Sorry, we can't go further so you have go to home."}
        />
    }


    if (currentRound.length < 1) {
        return <OverviewPage id={id as string}/>
    }


    return <RoundPage/>


}
