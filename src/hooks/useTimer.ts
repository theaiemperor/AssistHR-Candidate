import {useEffect, useRef, useState, useCallback} from "react";

interface TimerOptions {
    active?: boolean;
    onComplete?: () => void;
}

export default function useTimer(initialSeconds: number, options: TimerOptions = {}) {
    const {active = true, onComplete} = options;
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const reset = useCallback(() => {
        setSecondsLeft(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (!active) {
            clearInterval(intervalRef.current!);
            return;
        }

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
    }, [active, onComplete]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return {secondsLeft, minutes, seconds, reset};
}
