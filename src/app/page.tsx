import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import InterviewCard, {Interview} from "@/components/shared/InterviewCard";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function Home() {


    const dummyInterviews: Interview[] = [
        {
            id: "1",
            publisher_id: "google_001",
            publisher_image: "https://logo.clearbit.com/google.com",
            title: "Google Software Engineering Interview Experience",
            short_description: "An in-depth breakdown of the 4-round interviews for a Software Engineer role at Google.",
            isVerified: true,
            duration: 45,
            totalApplications: 415,
            kind: "Software Engineering",
            difficulty: 8,
            createdAt: new Date("2025-06-20T10:00:00Z")
        },
        {
            id: "2",
            publisher_id: "microsoft_001",
            publisher_image: "https://logo.clearbit.com/microsoft.com",
            title: "Microsoft PM Intern Interview - Summer 2025",
            short_description: "Detailed experience of Microsoft's PM internship process with virtual rounds and a final behavioral interviews.",
            isVerified: true,
            duration: 30,
            totalApplications: 56,
            kind: "Product Management",
            difficulty: 6,
            createdAt: new Date("2025-06-18T14:30:00Z")
        },
        {
            id: "3",
            publisher_id: "apple_001",
            publisher_image: "https://logo.clearbit.com/apple.com",
            title: "Apple Machine Learning Engineer Interview",
            short_description: "My experience interviewing at Apple for an ML Engineer role, including questions on Python, TensorFlow, and system design.",
            isVerified: true,
            duration: 60,
            totalApplications: 145,
            kind: "Machine Learning",
            difficulty: 9,
            createdAt: new Date("2025-06-15T09:15:00Z")
        },
        {
            id: "4",
            publisher_id: "amazon_001",
            publisher_image: "https://logo.clearbit.com/amazon.com",
            title: "Amazon SDE Interview (New Grad)",
            short_description: "Three technical rounds and a final behavioral loop focused on leadership principles.",
            isVerified: false,
            duration: 50,
            totalApplications: 344,
            kind: "Software Development",
            difficulty: 7,
            createdAt: new Date("2025-06-12T11:00:00Z")
        },
        {
            id: "5",
            publisher_id: "meta_001",
            publisher_image: "https://logo.clearbit.com/meta.com",
            title: "Meta (Facebook) Frontend Developer Interview",
            short_description: "React-heavy coding round followed by a system design interviews for a UI-heavy role.",
            isVerified: true,
            duration: 40,
            totalApplications: 405,
            kind: "Frontend Engineering",
            difficulty: 7,
            createdAt: new Date("2025-06-10T16:45:00Z")
        },
        {
            id: "9",
            publisher_id: "linkedin_001",
            publisher_image: "https://logo.clearbit.com/linkedin.com",
            title: "LinkedIn Software Intern Interview (2025)",
            short_description: "A smooth intern interviews process with one OA and one technical interviews with a hiring manager.",
            isVerified: true,
            duration: 25,
            totalApplications: 244,
            kind: "Internship",
            difficulty: 5,
            createdAt: new Date("2025-06-02T09:00:00Z")
        },
        {
            id: "10",
            publisher_id: "openai_001",
            publisher_image: "https://logo.clearbit.com/openai.com",
            title: "OpenAI Research Engineer Interview",
            short_description: "A rigorous interviews involving math, coding, and research problem-solving.",
            isVerified: true,
            duration: 70,
            totalApplications: 90,
            kind: "AI Research",
            difficulty: 10,
            createdAt: new Date("2025-06-01T17:00:00Z")
        }

    ]

    const completedInterviews: Interview[] = [
        {
            id: "6",
            publisher_id: "netflix_001",
            publisher_image: "https://logo.clearbit.com/netflix.com",
            title: "Netflix Backend Engineer Interview",
            short_description: "Challenging backend questions focused on scalable microservices and system architecture.",
            isVerified: true,
            duration: 55,
            totalApplications: 45,
            kind: "Backend Engineering",
            difficulty: 9,
            createdAt: new Date("2025-06-08T13:30:00Z")
        },
        {
            id: "7",
            publisher_id: "spotify_001",
            publisher_image: "https://logo.clearbit.com/spotify.com",
            title: "Spotify Data Analyst Interview",
            short_description: "SQL-heavy technical round followed by product case questions and business metrics.",
            isVerified: false,
            duration: 35,
            totalApplications: 11,
            kind: "Data Analytics",
            difficulty: 6,
            createdAt: new Date("2025-06-06T15:00:00Z")
        },
        {
            id: "8",
            publisher_id: "airbnb_001",
            publisher_image: "https://logo.clearbit.com/airbnb.com",
            title: "Airbnb Full Stack Developer Interview",
            short_description: "Hands-on full stack interviews including React, Node.js and a small design challenge.",
            isVerified: true,
            duration: 50,
            totalApplications: 4,
            kind: "Full Stack",
            difficulty: 7,
            createdAt: new Date("2025-06-04T10:45:00Z")
        },

    ]

    return (
        <div className={'w-full p-2 flex justify-center'}>
            <div className={'max-w-4xl w-full flex flex-col gap-20'}>
                <Card className={'rounded-md bg-slate-900 flex flex-row justify-between gap-3 px-5'}>
                    <div className={'flex flex-col justify-between'}>

                        <div className={'text-2xl font-bold'}>
                            Get Interview Ready with AI powered Practice and feedback
                        </div>
                        <div>
                            Practice on real word interviews questions.
                        </div>

                        <div>
                            <Button className={'bg-indigo-200 hover:bg-indigo-300 rounded-full font-bold'} asChild>
                                <Link href={'/interview/react'}>
                                    Start an Interview
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Image src={'/robot.png'} alt={'robot'} width={250} height={250}/>
                    </div>
                </Card>


                <div>
                    <p className={'text-xl mb-5 font-bold'}>Popular Interviews</p>
                    <ScrollArea className=" whitespace-nowrap ">
                        <div className="flex w-full space-x-9 pb-3 ">
                            {
                                dummyInterviews.map((interview) => {
                                    return <InterviewCard key={interview.id} {...interview} />
                                })
                            }
                            <ScrollBar orientation="horizontal"/>

                        </div>
                    </ScrollArea>
                </div>

                <div>
                    <p className={'text-xl mb-5 font-bold'}>Your Interviews</p>
                    <ScrollArea className=" whitespace-nowrap ">
                        <div className="flex w-full space-x-9 pb-3 ">
                            {
                                completedInterviews.map((interview) => {
                                    return <InterviewCard key={interview.id} {...interview} />
                                })
                            }
                            <ScrollBar orientation="horizontal"/>

                        </div>
                    </ScrollArea>
                </div>

            </div>
        </div>

    );
}
