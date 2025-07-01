import type {Metadata} from "next";
import {Mona_Sans} from "next/font/google";
import "../static/globals.css";
import {PropsWithChildren} from "react";

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
        <body
            className={`${monaSans.className} antialiased`}
        >
        {
            children
        }
        </body>
        </html>
    );
}
