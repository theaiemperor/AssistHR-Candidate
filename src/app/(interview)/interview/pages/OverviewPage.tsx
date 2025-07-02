import useCurrentInterview from "@/app/(interview)/interview/useCurrentInterview";
import {useState, memo} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import ChatScreen from "@/app/(interview)/interview/components/ChatScreen";

function OverviewPage() {


    const {interviewInfo} = useCurrentInterview();


    if (interviewInfo === null) {
        return;
    }


    const rounds = Object.keys(interviewInfo.rounds);
    const [showInfo, setShowInfo] = useState(true)

    if (!interviewInfo) {
        return;
    }


    if (showInfo) {
        return <>

            <Dialog open={showInfo}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className={'text-center'}>
                            <div className={'text-lg text-center font-bold'}>
                                {interviewInfo.name}
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
                                <Link href={'/home'}>
                                    Go to home
                                </Link>
                            </Button>
                            <Button className={'cursor-pointer'} onClick={() => setShowInfo(false)}>
                                Start Interview
                            </Button>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    } else {
        return <div className={'h-screen'}>
            <ChatScreen title={'Screening Round'} next={interviewInfo.rounds[1].name}/>
        </div>
    }
}


export default memo(OverviewPage);
