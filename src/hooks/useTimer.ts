import {useEffect, useRef, useState} from "react";

export default function (initialSeconds: number, onComplete?: () => void) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current!);
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return {secondsLeft, minutes, seconds};
}
