import React, { useContext, useEffect, useState } from 'react';
import CurrentQuestionContext from '../../Context/CurrentQuestionContext';
import QuestionContext from '../../Context/QuestionContext';
import { shuffle } from '../../utils/shuffleArray';
import './Question.css';

export const Question = () => {
    let nextQuestionNumber = 0;

    const { currentQuestionNumber, setCurrentQuestionNumber } = useContext(CurrentQuestionContext);
    const { questionContext, setQuestionContext } = useContext(QuestionContext);

    const [question, setQuestion] = useState(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [isLockBoard, setIsLockBoard] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameCompleted, setIsGameCompleted] = useState(false);

    function handleStart() {
        setIsGameOver(false);
        setIsGameCompleted(false);
        setCurrentQuestionNumber(0);
        reset();
        updateQuestion();
    }

    function reset() {
        async function fetchQuestions() {
            const res = await getAll();
            return await res.json();
        }

        fetchQuestions()
            .then(data => {
                let shuffledQuestions = shuffle(data);
                shuffledQuestions.forEach(q => {
                    q.answers = shuffle(q.answers);
                })
                setQuestionContext(shuffledQuestions);
            });
    }

    function handleAnswer(event) {
        const answer = event.target.querySelector('.answer-text').textContent;

        setIsLockBoard(true);

        const isCorrect = answer === question.currectAnswerText;

        if (isCorrect) {
            nextQuestionNumber = currentQuestionNumber;
            nextQuestionNumber++;
            setIsCorrectAnswer(true);
        }

        setTimeout(() => {
            setIsLockBoard(false);
            setIsCorrectAnswer(false);
            if (isCorrect) {
                setCurrentQuestionNumber(nextQuestionNumber);
                updateQuestion();
            } else {
                setIsGameOver(true);
            }
        }, 1000);
    }

    useEffect(() => {
        reset();
    }, []);

    async function getAll() {
        return fetch('http://localhost:3001/questions');
    }

    function updateQuestion() {
        if (questionContext.length === nextQuestionNumber) {
            setIsGameCompleted(true);
            return;
        }

        setQuestion({
            title: questionContext[nextQuestionNumber].title,
            answers: questionContext[nextQuestionNumber].answers,
            currectAnswerText: questionContext[nextQuestionNumber].currectAnswerText
        });
    }

    return (
        <div>
            {question ?
                isGameOver === false ?
                    isGameCompleted === false ?
                        <div className="question">
                            <h2 className="title">{question.title}</h2>
                            <ul className="answers">
                                {question.answers.map((answer) =>
                                    <li key={answer.number} onClick={handleAnswer}>
                                        <span className="answer-number">{answer.number}</span>
                                        <span className="answer-text">{answer.text}</span>
                                    </li>)}
                            </ul>
                            <h2 className="question-msg">
                                {isLockBoard ? isCorrectAnswer ?
                                    <i className="fas fa-check"></i> :
                                    <i className="fas fa-times"></i> :
                                    ''}
                            </h2>
                        </div>
                        : <div className="question">
                            <h2>Congratulations!</h2>
                            <h4>100,000 лв.</h4>
                            <button onClick={handleStart} className="game-over">
                                <i className="fas fa-undo"></i>
                            Нова игра
                        </button>
                        </div>
                    : <div className="question">
                        <button onClick={handleStart} className="game-over">
                            <i className="fas fa-undo"></i>
                            Нова игра
                        </button>
                    </div>
                : <div className="question">
                    <button onClick={handleStart} className="start-btn">Start Game</button>
                </div>}
        </div>
    )
}
