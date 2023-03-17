import React from "react";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";

import "./quiz-results.css";
import { Button } from "@alfalab/core-components/button";
import { useAppDispatch, useAppSelector } from "store";
import { quizActions, quizLengthSelector, rightAnswersSelector } from "store/quiz";

export const QuizResults = () => {
	const dispatch = useAppDispatch();
	const rightAnswers = useAppSelector(rightAnswersSelector);
	const quizLength = useAppSelector(quizLengthSelector);

	const handleRetryTest = () => {
		dispatch(quizActions.retryTest());
	};

	const handleNewTest = () => {
		dispatch(quizActions.newTest());
	};

	const percent: boolean = (100 * rightAnswers) / quizLength >= 80;
	const resultText = percent
		? "Вы успешно прошли тест, вы набрали больше 80% верных ответов."
		: "Тест не пройден, вы набрали меньше 80% верных ответов.";

	return (
		<div className="quiz-results">
			<Space direction="vertical" size={20}>
				<Typography.Title tag="h1">Тест закончен</Typography.Title>
				<Typography.Text view="primary-large">{resultText}</Typography.Text>
				<Typography.Text view="primary-large">
					Результат: {rightAnswers} из {quizLength} правильных ответов.
				</Typography.Text>
				{!percent ? (
					<Button view="primary" onClick={handleRetryTest}>
						Начать заново
					</Button>
				) : null}
				<Button view="primary" onClick={handleNewTest}>
					Выбрать другой тест
				</Button>
			</Space>
		</div>
	);
};
