"use client";
import Image from "next/image";
import useProfile from "@/hooks/useProfile";
import {PropsWithChildren, useEffect} from "react";
import {useRouter} from "next/navigation";
import apiClient from "@/lib/axiosClient";
import Loader from "@/components/global/Loader";

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
        return <Loader msg={"Verifying User"} />
    }


    return children;

}
