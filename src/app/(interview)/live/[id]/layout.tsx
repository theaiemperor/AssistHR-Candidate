"use client";
import {useParams} from "next/navigation";
import {PropsWithChildren} from "react";
import apiClient from "@/lib/axiosClient";
import {useQuery} from "@tanstack/react-query";
import InterviewError from "@/app/(interview)/live/components/InterviewError";
import {AxiosError} from "axios";
import Loader from "@/components/global/Loader";
import useCurrentInterview from "@/app/(interview)/interview/useCurrentInterview";

export default function ({children}: PropsWithChildren) {
    const {id} = useParams();
    const setInterview = useCurrentInterview(state => state.setInterviewInfo)

    const {isLoading, isError, error} = useQuery({
        queryKey: ['job', id],
        queryFn: loadJobInfo
    })

    async function loadJobInfo() {
        const {data: {data}} = await apiClient('/jobs/' + id);
        setInterview(data);
        return data;
    }


    if (isError) {
        if (error instanceof AxiosError) {
            if (error.status === 404) {
                return <InterviewError
                    title={'Job Not Found'}
                    message={'The job you are looking for not found.'}/>
            }
        }

        return <InterviewError
            title={'Failed to load job'}
            message={'Some problem occurred when trying to load job.'}/>
    }


    if (isLoading) {
        return <Loader msg={'Loading job info'}/>
    }


    return <>
        {children}
    </>
}
