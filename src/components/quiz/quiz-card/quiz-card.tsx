import React from "react";
import { CorrectAnswersNames } from "types/api";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { Button } from "@alfalab/core-components/button";

import "./quiz-card.css";
import { MultipleCorrectAnswers } from "./quiz-card-questionType/multipleCorrectAnswers";
import { SingleCorrectAnswer } from "./quiz-card-questionType/singleCorrectAnswer";
import { useAppDispatch, useAppSelector } from "store";
import {
	currentQuestionSelector,
	multiValueSelector,
	quizActions,
	quizLengthSelector,
	quizzesSelector,
	valueSelector,
} from "store/quiz";
import { isSetTrue } from "utils/is-set-true";

export const QuizCard = () => {
	const dispatch = useAppDispatch();
	const quizzes = useAppSelector(quizzesSelector);
	const currentQuestion = useAppSelector(currentQuestionSelector);
	const quizLength = useAppSelector(quizLengthSelector);
	const { category, difficulty, correct_answers, multiple_correct_answers } = quizzes[currentQuestion] || {};
	const value = useAppSelector(valueSelector);
	const multiValue = useAppSelector(multiValueSelector);

	const handleChangeQuestion = () => {
		if (value) {
			dispatch(quizActions.switchQuestion(isSetTrue(correct_answers[`${value}_correct` as CorrectAnswersNames])));
		}
		if (Object.keys(multiValue).length) {
			const answers = Object.keys(multiValue)
				.sort()
				.filter((name) => multiValue[name])
				.map((name) => `${name}_correct`);
			dispatch(quizActions.switchMultipleQuestion(answers));
		}
	};

	const isEnabled = Object.keys(multiValue).filter((name) => multiValue[name]).length;

	return (
		<div className="quiz-card">
			<Space direction="vertical" size={16}>
				<Typography.Title tag="h1">
					Вопрос {currentQuestion + 1} из {quizLength}
				</Typography.Title>
				<Space direction="vertical" size={8}>
					<Typography.Text view="primary-small">Категория вопроса: {category}</Typography.Text>
					<Typography.Text view="primary-small">Сложность вопроса: {difficulty}</Typography.Text>
				</Space>
				{multiple_correct_answers === "true" ? <MultipleCorrectAnswers /> : <SingleCorrectAnswer />}
				<Button view="primary" size="m" onClick={handleChangeQuestion} disabled={!value && !isEnabled}>
					Следующий вопрос
				</Button>
			</Space>
		</div>
	);
};
