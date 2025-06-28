"use client";
import {Card} from "@/components/ui/card";
import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import constants from "@/config/constants";


export default function Navbar() {

    const {isMobile} = useSidebar()


    if(!isMobile){
        return;
    }

    return <>
        <Card className={'p-1 py-2 rounded-sm w-full sticky top-0'}>
            <div className={'flex gap-2 items-center'}>
                <SidebarTrigger  />
                <span className={'font-bold '}>{constants.app.name}</span>
            </div>
        </Card>
    </>
}
