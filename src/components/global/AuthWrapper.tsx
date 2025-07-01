"use client";
import Image from "next/image";
import useProfile from "@/hooks/useProfile";
import {PropsWithChildren, useEffect} from "react";
import {useRouter} from "next/navigation";
import apiClient from "@/lib/axiosClient";

export default function ({children}: PropsWithChildren) {

    const {profile, setProfile} = useProfile();
    const router = useRouter();


    async function verifyUser() {

        try {
            const token = localStorage.getItem("token") || "";


            const {data: {data}} = await apiClient('/auth/profile', {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })


            if (data.email.length < 1 || data.role !== "candidate") {
                router.push(process.env.NEXT_PUBLIC_AUTHENTICATION_URL || "/");
            } else {
                setProfile({
                    token,
                    ...data
                })
            }


        } catch {
            router.push(process.env.NEXT_PUBLIC_AUTHENTICATION_URL + "/login" || "/");
        }
    }


    useEffect(() => {

        if (typeof window !== undefined) {
            verifyUser();
        }

    }, [])


    if (profile === null) {
        return <div className="w-full h-screen -mt-10 flex justify-center items-center ">
            <div className="relative w-40 h-40 flex justify-center items-center">

                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />

                <div className="absolute w-full h-full z-0">
                    <div className="w-full h-full border-[8px] rounded-full"></div>
                </div>

                <div className="absolute w-full h-full z-10">
                    <div
                        style={{animation: 'spin 0.7s linear infinite'}}
                        className="w-full h-full rounded-full animate-spin border-[7px] border-transparent border-t-cyan-500"/>
                </div>
            </div>
        </div>
    }


    return children;

}
