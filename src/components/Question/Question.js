import React, { useState } from 'react';
import './Question.css';

export const Question = () => {

    const [currectAnswerNumber, setCurrectAnswerNumber] = useState('A');
    const [isCurrectAnswerNumber, setIsCurrectAnswerNumber] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const answers = [
        {
            number: 'A',
            text: 'червен'
        },
        {
            number: 'B',
            text: 'син'
        },
        {
            number: 'C',
            text: 'черен'
        },
        {
            number: 'D',
            text: 'червен'
        }
    ];

    function handleAnswer(event) {
        const answer = event.target.querySelector('.answer-number').textContent;

        setIsAnswered(true);

        setTimeout(() => {
            setIsAnswered(false);
        }, 1000);

        if (currectAnswerNumber === answer) {
            setIsCurrectAnswerNumber(true);
        } else {
            setIsCurrectAnswerNumber(false);
        }
    }

    return (
        <div className="question">
            <h2 className="title">Какъв е цветът на екипите на ЦСКА?</h2>
            <ul className="answers">
                {answers.map((answer) =>
                    <li onClick={handleAnswer}>
                        <span className="answer-number">{answer.number}</span>
                        <span className="answer-text">{answer.text}</span>
                    </li>)}
            </ul>
            <h2 className="question-msg">
                {isAnswered ? isCurrectAnswerNumber ?
                    <i class="fas fa-check"></i> :
                    <i class="fas fa-times"></i> :
                    ''}
            </h2>
        </div>
    )
}
