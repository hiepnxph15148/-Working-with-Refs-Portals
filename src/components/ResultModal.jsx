import React from 'react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useEffect } from 'react'
import {createPortal} from 'react-dom'
const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialog = useRef()
    const userLost = remainingTime <= 0;
    const formattedRemainTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && dialog.current?.open) {
                onReset();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onReset]);
    return createPortal(
        <dialog ref={dialog} className='result-modal'>
            {userLost && <h2>Your Lost!</h2>}
            {!userLost && <h2>Your Lost : {score} </h2>}
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{formattedRemainTime} seconds left.</strong></p>
            <form action="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModal