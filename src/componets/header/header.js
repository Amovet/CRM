import React from 'react'
// import {} from "./file_bundle";


function Header() {
    return (
        <header className='header'>
            <div className='header__container'>
                <div className='header__date'>Четверг, 02 мар</div>
                <div className='header__statistic'>
                    <div className="new-call__title">
                        Новые звонки <span>20 из 30</span>
                    </div>
                    <input
                        type="range"
                        className='new-call range-input'
                        min={0}
                        max={30}
                        value={20}
                    />
                </div>
                <div className='header__statistic'>
                    <div className="quality__title">
                        Качество разговоров <span>40%</span>
                    </div>
                    <input
                        type="range"
                        className='quality range-input'
                        min={0}
                        max={30}
                        value={20}
                    />
                </div>
                <div className='header__statistic'>
                    <div className="сonversion__title">
                        Конверсия в заказ <span>67%</span>
                    </div>
                    <input
                        type="range"
                        className='сonversion range-input'
                        min={0}
                        max={30}
                        value={20}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;