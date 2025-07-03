"use client";
import useCurrentInterview, {IInterviewInfo} from "@/app/(interview)/interview/useCurrentInterview";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import ChatScreen, {ChatMessageItem} from "@/app/(interview)/interview/components/ChatScreen";
import useTimer from "@/hooks/useTimer";
import {removeQueryParam} from "@/lib/url";
import {Loader} from "lucide-react";
import apiClient from "@/lib/axiosClient";
import {useMutation} from "@tanstack/react-query";
import {ChatItemProps} from "@/app/(interview)/interview/components/ChatItem";


function formatDuration(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
        return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
}

export default function () {


    const {interviewInfo, roundNames, setToken, auth} = useCurrentInterview();
    const router = useRouter();

    const searchParams = useSearchParams();
    const currentRound = useMemo(() => searchParams.get("round") || "", [searchParams]);

    const {minutes, seconds} = useTimer(90, {onComplete: startRound})


    const [showInfo, setShowInfo] = useState(true)
    const [roundInfo, setRoundInfo] = useState<null | IInterviewInfo['rounds'][number]>(null);
    const {mutate, isPending} = useMutation({mutationFn: startRound})
    const [initialMsg, setInitialMsg] = useState<ChatItemProps>();


    if (!interviewInfo) {
        return;
    }


    useEffect(() => {


        if (!Object.values(roundNames).includes(currentRound)) {

            router.replace(removeQueryParam(location.href, 'round'))


        } else {
            Object.values(interviewInfo.rounds).forEach((val) => {
                if (val.name === currentRound) {
                    setRoundInfo(val);

                }

            })
        }

    }, [currentRound, interviewInfo])

    useEffect(() => {
        setShowInfo(true)
    }, [currentRound]);


    if (roundInfo === null) {
        return;
    }


    async function startRound() {

        interface ServerResponse {
            meta: string,
            data: ChatMessageItem
        }

        try {
            const response = await apiClient.post('/interview/', {
                token: auth?.token || ""
            });
            const {data, meta} = response.data as ServerResponse;

            setToken(meta);
            setInitialMsg({id: Math.random().toString(), content: data.content, isUser: false})
            setShowInfo(false);

        } catch (error) {

        }
    }


    if (showInfo) {
        return <>
            <Dialog open={showInfo}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className={'text-center'}>
                            <div className={'text-lg text-center font-bold'}>
                                {roundInfo.name}
                            </div>
                            <div className={'flex justify-center gap-2 text-xs text-gray-300 mt-1'}>
                                <div>Avg time duration : <b>{formatDuration(roundInfo.avgDuration)}</b></div>
                            </div>
                        </DialogTitle>
                        <DialogDescription className={'my-3'}>
                            {roundInfo.shortDescription}
                        </DialogDescription>
                        <div>
                            <div className={'flex justify-between'}>
                                <Button className={'pointer-events-none rounded-full'} variant={'outline'}>
                                    {minutes}m {seconds < 10 ? "0" + seconds : seconds}s left
                                </Button>
                                <Button className={'cursor-pointer'} onClick={() => mutate()} disabled={isPending}>
                                    {isPending ? <Loader className="animate-spin"/> : ""}
                                    {isPending ? "Please wait..." : "Start Round"}
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    } else {
        return <div className={'border h-screen'}>
            <ChatScreen title={currentRound} initialMsg={initialMsg}/>
        </div>
    }

}
