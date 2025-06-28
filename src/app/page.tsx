import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Home() {
    return (
        <div className={'flex flex-col justify-center '}>
            <img className={'w-50 self-center mt-5'} src={'/logo.png'} alt={'logo'}/>
            <div className={'text-xl text-center mt-5'}>
                hello, from interviewer
            </div>
            <Button asChild className={'self-center mt-5'} >
                <Link href={'/home'}>
                    Take me to Dashboard
                </Link>
            </Button>
        </div>

    );
}
