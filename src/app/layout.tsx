import type {Metadata} from "next";
import {Mona_Sans} from "next/font/google";
import "../static/globals.css";
import {PropsWithChildren} from "react";
import GlobalWrapper from "@/components/global/GlobalWrapper";

const monaSans = Mona_Sans({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "AssistHR Candidate",
    description: "A platform for taking & practicing for interviews",
    icons: {icon: "/logo.png"}
};

export default function RootLayout({children}: Readonly<PropsWithChildren>) {


    return (
        <html lang="en" className={'dark'}>
        <body className={`${monaSans.className} antialiased`}>
        <GlobalWrapper>
            {children}
        </GlobalWrapper>
        </body>
        </html>
    );
}
