"use client";
import useCurrentInterview from "@/app/(interview)/live/utils/useCurrentInterview";
import {useMutation} from "@tanstack/react-query";
import apiClient from "@/lib/axiosClient";
import RoundPage from "@/app/(interview)/live/components/RoundPage";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Loader} from "lucide-react";
import {useParams} from "next/navigation";
import useChatHistory from "@/app/(interview)/live/utils/useChatHistory";


export default function () {

    const {jobInfo, auth, setToken} = useCurrentInterview(state => state);
    const {mutate, isPending} = useMutation({mutationFn: startInterview})
    const {setHistory} = useChatHistory();

    const {id} = useParams();


    async function startInterview() {
        const {data: {data, meta}} = await apiClient('/interview/live/' + id || "");
        setToken(meta);
        setHistory({
            content: data.content,
            isUser: false,
        });
        return data;
    }


    if (!auth) {
        return <div className={'w-full h-screen flex justify-center items-center'}>
            <Card className={'p-3 m-2 max-w-lg '}>
                <div>
                    <div className={'text-lg text-center font-bold'}>
                        {jobInfo?.title}
                    </div>
                    <div className={'flex justify-center gap-2 text-xs text-gray-300 mt-1'}>
                        <div>Assist HR</div>
                        |
                        <div>{jobInfo?.rounds.length} Rounds</div>
                    </div>
                </div>

                <div className={'text-sm'}>
                    {jobInfo?.shortDescription}
                </div>

                <div className={'flex justify-between'}>
                    <Button disabled={isPending} className={'cursor-pointer'} variant={'destructive'} asChild>
                        <Link href={'/home'} >
                            Go to home
                        </Link>
                    </Button>
                    <Button className={'cursor-pointer'} onClick={() => mutate()} disabled={isPending}>
                        {isPending ? <Loader className="animate-spin"/> : ""}
                        {isPending ? "Please wait..." : "Start Interview"}
                    </Button>
                </div>
            </Card>
        </div>
    }


    return <RoundPage/>
}
