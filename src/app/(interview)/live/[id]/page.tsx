"use client";
import useCurrentInterview from "@/app/(interview)/interview/useCurrentInterview";

export default function () {

    const interview = useCurrentInterview(state => state.interviewInfo)

    return <>
        {
            interview?.title
        }
    </>
}
