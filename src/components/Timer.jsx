import React, { useEffect, useState } from "react";

const Timer = ({ time, trigger, setTrigger, classes }) => {
    const [timer, setTimer] = useState(time);

    // console.log(trigger)
    // console.log(timer)
    // console.log(setTrigger)
    useEffect(() => {
        let interval;
        if (trigger) {
            setTimer(time)
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setTrigger(false);
                        }, 0);
                        return time;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [trigger, time, setTrigger]);

    return <span className={classes}>{trigger ? timer : ""}</span>;
};

export default Timer;
