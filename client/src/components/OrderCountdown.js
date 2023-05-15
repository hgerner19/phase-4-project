import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"

const CountdownTimer = () => {
    const history = useHistory()

    const [minutes, setMinutes] = useState(4); 
    const [seconds, setSeconds] = useState(59);
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
          setRedirect(true);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
    
        return () => clearTimeout(timer);
      }, []);

    useEffect(() => {
        if (redirect) {
            history.push({pathname:'/'});
        }
    }, [redirect, history]);
    
    useEffect(() => {
    const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
                clearInterval(timer);
                return 0;
            }
            return prevMinutes - 1;
            });
            return 59;
        }
        return prevSeconds - 1;
        });
    }, 1000);
    return () => clearInterval(timer);
    }, []);

    const handleOrderCancel = () => {
        fetch("/cancel_order", {
            method: 'DELETE',
        })
        .then(console.log("Order successfully canceled."))
    }

    return (
        <>
            <p>{`You have ${minutes} minutes ${seconds} seconds remaining to cancel your order.`}</p>
            <button onClick={handleOrderCancel}>Cancel Order</button>
        </>
    );
};

export default CountdownTimer;