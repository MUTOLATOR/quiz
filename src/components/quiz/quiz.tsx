import React, { useCallback } from "react";
import { Spinner } from "@alfalab/core-components/spinner";
import { QuizCard } from "./quiz-card";
import { QuizSettings } from "./quiz-settings";

import "./quiz.css";
import { QuizResults } from "./quiz-results";
import { Notification } from "@alfalab/core-components/notification";
import { useAppDispatch, useAppSelector } from "store";
import {
	currentQuestionSelector,
	hasErrorSelector,
	isLoadingSelector,
	quizActions,
	quizLengthSelector,
	showSettingsSelector,
} from "store/quiz";

export const Quiz = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(isLoadingSelector);
	const hasError = useAppSelector(hasErrorSelector);
	const showSettings = useAppSelector(showSettingsSelector);
	const currentQuestion = useAppSelector(currentQuestionSelector);
	const quizLength = useAppSelector(quizLengthSelector);

	const hideNotification = useCallback(() => dispatch(quizActions.hideNotification()), [dispatch]);

	if (showSettings) {
		return (
			<div className="settings centered">
				<QuizSettings />
				<Notification
					title={"По выбранным параметрам не удалось получить список вопросов"}
					visible={hasError}
					onClickOutside={hideNotification}
					onClose={hideNotification}
					onCloseTimeout={hideNotification}
				/>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="quiz centered">
				<Spinner visible={true} size="m" />
			</div>
		);
	}

	return <div className="quiz">{currentQuestion === quizLength ? <QuizResults /> : <QuizCard />}</div>;
};
