"use client";
import {Input} from "@/components/ui/input";
import {useRef, useState} from "react";
import {Badge} from "@/components/ui/badge";
import OnboardingContainer from "@/app/(onboarding)/OnboardingContainer";

export default function () {


    const [skills, setSkills] = useState<string[]>(['React', 'JS', 'the big one','a good man always be there','for you and for me as well as my son of', 'the god gifted',' internity qualified student','ok that great job for me as well as for you']);
    const inputRef = useRef<HTMLInputElement>(null);


    function addSkills() {
        const val = inputRef.current?.value;

        if (val === undefined || val === null || val === "") {
            return;
        }

        setSkills(prev => ([...prev, val]))

        if (inputRef.current) {
            inputRef.current.value = "";
        }

    }

    function editSkills(skill: string) {


        const rest = skills.filter(s => {
            if (s !== skill) return s;
        })

        setSkills(() => rest);
        if (inputRef.current) {
            inputRef.current.value = skill;
        }

    }


    return <>
        <OnboardingContainer title={'Add Skills'} next={'profile'}>
            <div className={'h-full min-h-24 flex justify-center gap-3 flex-wrap'}>

                    {
                        skills.map((skill) => (
                            <Badge key={skill} className={'text-md h-max bg-indigo-200 rounded-full min-w-16 px-5 cursor-pointer'}
                                   onClick={() => editSkills(skill)}>
                                {skill}
                            </Badge>
                        ))
                    }

            </div>
            <div className={'w-full max-w-xl self-center'}>
                <Input placeholder={'Add Skill and Press Enter to add skill'} ref={inputRef} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addSkills();
                    }
                }}/>
            </div>
        </OnboardingContainer>
    </>
}
