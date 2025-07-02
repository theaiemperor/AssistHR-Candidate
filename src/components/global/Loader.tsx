import Image from "next/image";

export default function ({msg}: { msg?: string }) {
    return <>
        <div className="w-full h-screen -mt-10 flex flex-col justify-center items-center ">
            <div className="relative w-40 h-40 flex flex-col gap-5 justify-center items-center">

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
            <p className="mt-2 text-center text-sm  animate-pulse">
                {msg}
            </p>
        </div>
    </>
}
