import React from 'react'
export const DEFINE_RATE = 'DEFINE_RATE';
export const BAD_RATE = 'BAD_RATE';
export const MEDIUM_RATE = 'MEDIUM_RATE';
export const GOOD_RATE = 'GOOD_RATE';


function RateButton({type}) {

    switch (type) {
        case BAD_RATE:
            return (
                <button className='bad-rate-btn rate-btn'>
                    <div className='rate-btn__rate'>
                        <div/>
                    </div>
                    <div className='rate-btn__btn'>Плохо</div>
                </button>
            );
        case MEDIUM_RATE:
            return (
                <button className='medium-rate-btn rate-btn'>
                    <div className='rate-btn__rate'>
                        <div/><div/>
                    </div>
                    <div className='rate-btn__btn'>Хорошо</div>
                </button>
            );
        case GOOD_RATE:
            return (
                <button className='good-rate-btn rate-btn'>
                    <div className='rate-btn__rate'>
                        <div/><div/><div/>
                    </div>
                    <div className='rate-btn__btn'>Отлично</div>
                </button>
            );
        case DEFINE_RATE:
            return (
                <button className='define-rate-btn'>
                    Распознать
                </button>
            );
        default:
            return (
                <button className='rate-btn'>
                    {name}
                </button>
            );
    }

}

export default RateButton;