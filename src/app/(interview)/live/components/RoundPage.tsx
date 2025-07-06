"use client";
import ChatItem from "@/app/(interview)/live/components/ChatItem";
import ChatBox from "@/app/(interview)/live/components/ChatBox";
import useCurrentInterview from "@/app/(interview)/live/utils/useCurrentInterview";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card} from "@/components/ui/card";
import useChatHistory from "@/app/(interview)/live/utils/useChatHistory";
import apiClient from "@/lib/axiosClient";
import {useMutation} from "@tanstack/react-query";
import {Loader} from "lucide-react";


export default function () {

    const {auth, setToken} = useCurrentInterview()
    const {setPending, setHistory, resetHistory} = useChatHistory()
    const {isPending, mutate} = useMutation({
        mutationFn: startNewRound
    })


    async function continueChat(content: string) {
        try {
            const {data: {data, meta}} = await apiClient.put('/interview/live', {
                content,
                token: auth?.token
            })

            setHistory({content: data.content, isUser: false});

            if (data.finished) {
                setToken({...meta, info: 'completed'})
            } else if (data.status !== 'pending') {
                setToken({...meta, ...(data.status === 'failed' && {info: 'failed'})});
            }

            setPending(false);

        } catch {

        }
    }


    async function startNewRound() {
        try {
            const {data: {data, meta}} = await apiClient.post('/interview/live', {
                token: auth?.token
            })
            resetHistory();

            setToken(meta);
            setHistory({content: data.content, isUser: false});

        } catch {

        }
    }


    return <>

        <div className={'flex flex-col flex-1 '}>
            <div className={'p-2'}>
                <ChatItem/>
            </div>

            <div className={'fixed w-full bottom-2 flex flex-col items-center gap-2'}>
                <div hidden={auth?.info === 'screening_pending' || auth?.info === 'round_pending'}>
                    <Card className={'p-2 max-w-2xl w-full flex flex-row justify-between'}>
                        <Button
                            hidden={(auth?.info === 'screening_pending') || (auth?.info === 'round_pending')}
                            variant={'ghost'}
                            className={'cursor-pointer pointer-events-none rounded-full'}
                            children={<>

                                {
                                    auth?.info === 'completed' ? 'Interview completed successfully.' : (
                                        auth?.info === 'failed' ? 'You failed' : <> Next
                                            Round : <b>{auth?.nextRound}</b> </>
                                    )
                                }
                            </>}

                        />


                        <Button
                            hidden={(auth?.info !== 'screening_completed') && (auth?.info !== 'round_completed')}
                            className={'cursor-pointer'}
                            size={'sm'}
                            onClick={() => mutate()}
                        >
                            {isPending ? <Loader className="animate-spin"/> : ""}
                            {isPending ? "Starting..." : "Start Now"}
                        </Button>
                        <Button
                            hidden={!(auth?.info === "failed" || auth?.info === 'completed')}
                            className={'cursor-pointer'}
                            asChild
                        >
                            <Link href={'/home'}>
                                {auth?.info === 'failed' ? "Take me to Dashboard" : "Finish Now"}
                            </Link>
                        </Button>
                    </Card>

                </div>
                <ChatBox handleSubmit={continueChat}/>
            </div>
        </div>
    </>
}
