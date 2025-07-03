import useCurrentInterview from "@/app/(interview)/interview/useCurrentInterview";
import {memo, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ChatScreen, {ChatMessageItem} from "@/app/(interview)/interview/components/ChatScreen";
import apiClient from "@/lib/axiosClient";
import {ChatItemProps} from "@/app/(interview)/interview/components/ChatItem";
import {Loader} from "lucide-react";
import {useMutation} from "@tanstack/react-query";


function OverviewPage({id}: { id: string }) {


    const {interviewInfo, setToken} = useCurrentInterview();
    const [initialMsg, setInitialMsg] = useState<ChatItemProps>();
    const {isPending, mutate} = useMutation({mutationFn: startScreening})


    if (interviewInfo === null) {
        return;
    }


    const rounds = Object.keys(interviewInfo.rounds);
    const [showInfo, setShowInfo] = useState(true)

    if (!interviewInfo) {
        return;
    }


    async function startScreening() {

        interface ServerResponse {
            meta: string,
            data: ChatMessageItem
        }

        try {
            const response = await apiClient.get('/interview/' + id);
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
                                {interviewInfo.title}
                            </div>
                            <div className={'flex justify-center gap-2 text-xs text-gray-300 mt-1'}>
                                <div>{interviewInfo.businessName}</div>
                                |
                                <div>{new Date(interviewInfo.createdAt).toDateString()}</div>
                                |
                                <div>{rounds.length} Rounds</div>
                            </div>
                        </DialogTitle>
                        <DialogDescription className={'my-3'}>
                            {interviewInfo.shortDescription}
                        </DialogDescription>

                        <div className={'flex justify-between'}>
                            <Button className={'cursor-pointer'} variant={'destructive'} asChild>
                                <Link href={isPending ? '#' : '/home'}>
                                    Go to home
                                </Link>
                            </Button>

                            <Button className={'cursor-pointer'} onClick={() => mutate()} disabled={isPending}>
                                {isPending ? <Loader className="animate-spin"/> : ""}
                                {isPending ? "Please wait..." : "Start Interview"}
                            </Button>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    } else {
        return <div className={'h-screen'}>
            <ChatScreen
                title={'screening'}
                initialMsg={initialMsg}
            />
        </div>
    }
}


export default memo(OverviewPage);
