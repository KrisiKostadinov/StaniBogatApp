import React, { useContext } from 'react';
import CurrentQuestionContext from '../../Context/CurrentQuestionContext';
import './MoneyList.css';

export const MoneyList = () => {

    const numbersMoney = [
        {
            number: 1,
            money: 50
        },
        {
            number: 2,
            money: 100
        },
        {
            number: 3,
            money: 150
        },
        {
            number: 4,
            money: 200
        },
        {
            number: 5,
            money: 250
        },
        {
            number: 6,
            money: 500
        },
        {
            number: 7,
            money: 1000
        },
        {
            number: 8,
            money: 1500
        },
        {
            number: 9,
            money: 2000
        },
        {
            number: 10,
            money: 2500
        },
        {
            number: 11,
            money: 5000
        },
        {
            number: 12,
            money: 10000
        },
        {
            number: 13,
            money: 25000
        },
        {
            number: 14,
            money: 50000
        },
        {
            number: 15,
            money: 100000
        }
    ];

    const { currentQuestionNumber } = useContext(CurrentQuestionContext);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="money-list">
            {numbersMoney.map((numberMoney) => 
            <div key={numberMoney.number} className={"number-money " + (currentQuestionNumber + 1 === numberMoney.number ? "selected" : '')}>
                <span className="number">{numberMoney.number}</span>
                <span className="money">{numberWithCommas(numberMoney.money)}</span> лева
            </div>)}
        </div>
    )
}
