"use client";
import useCurrentInterview, {IInterviewInfo} from "@/app/(interview)/interview/useCurrentInterview";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import ChatScreen from "@/app/(interview)/interview/components/ChatScreen";
import useTimer from "@/hooks/useTimer";


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


    const {interviewInfo} = useCurrentInterview();
    const currentRound = useSearchParams().get('round') || "";
    const {minutes, seconds} = useTimer(90, startRound)


    const [showInfo, setShowInfo] = useState(true)
    const [isNext, setIsNext] = useState<null|string>(null)
    const [roundInfo, setRoundInfo] = useState<null | IInterviewInfo['rounds'][number]>(null);



    if (!interviewInfo) {
        return;
    }


    useEffect(() => {
        interviewInfo.rounds.forEach(round => {
            if (round.name === currentRound) {
                setRoundInfo(round);
            }
        })
        const next = interviewInfo.rounds[interviewInfo.roundsNames.indexOf(currentRound)+1];
        if(next){
            setIsNext(next.name);
        }else{
            setIsNext(null)
        }
    }, [currentRound])

    useEffect(() => {
        setShowInfo(true)
    }, [currentRound]);


    if (roundInfo === null) {
        return;
    }


    function startRound() {
        setShowInfo(() => false)
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
                            {roundInfo.description}
                        </DialogDescription>
                        <div>
                            <div className={'flex justify-between'}>
                                <Button className={'pointer-events-none rounded-full'} variant={'outline'}>
                                    {minutes}m {seconds < 10 ? "0" + seconds : seconds}s left
                                </Button>
                                <Button className={'cursor-pointer'} onClick={startRound}>
                                    Start Now
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    } else {
        return <div className={'border h-screen'}>
            <ChatScreen next={isNext} />
        </div>
    }


}
