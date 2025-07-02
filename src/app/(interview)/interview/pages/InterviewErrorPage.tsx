import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {TriangleAlert} from "lucide-react";

interface InterviewErrorPage {
    title?: string;
    message?: string;
}

export default function ({title, message}: InterviewErrorPage) {
    return <>
        <Dialog open={true}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <div className={'flex flex-col items-center gap-5'}>
                        <TriangleAlert className={'text-red-500'} size={100}/>
                        <DialogTitle>
                            {title || "Some problem occurred"}
                        </DialogTitle>
                    </div>
                    <DialogDescription className={'mb-3 text-center'}>
                        {message || "We are unable to go further due to some problem."}
                    </DialogDescription>


                    <div className={'flex justify-between'}>
                        <Button className={'cursor-pointer'} variant={'outline'} asChild>
                            <Link href={'/home'}>
                                Go to home
                            </Link>
                        </Button>
                        <Button className={'cursor-pointer'} asChild>
                            <Link href={'/my_interviews'}>
                                Explore other interviews
                            </Link>
                        </Button>
                    </div>


                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>
}
