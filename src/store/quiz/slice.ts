import { RadioGroupProps } from "@alfalab/core-components/radio-group";
import { SelectProps } from "@alfalab/core-components/select";
import { SliderInputProps } from "@alfalab/core-components/slider-input";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CorrectAnswersNames, QuizType } from "types/api";
import { isSetTrue } from "utils/is-set-true";

export type QuizStateType = {
	quizzes: QuizType[];
	currentQuestion: number;
	isLoading: boolean;
	hasError: boolean;
	rightAnswers: number;
	quizLength: number;
	showSettings: boolean;
	categoryValue: SelectProps["selected"];
	difficultyValue: SelectProps["selected"];
	limitValue: SliderInputProps["value"];
	value: RadioGroupProps["value"];
	multiValue: { [answer: string]: boolean };
};

const initialState: QuizStateType = {
	quizzes: [],
	currentQuestion: 0,
	isLoading: true,
	hasError: false,
	rightAnswers: 0,
	quizLength: 0,
	showSettings: true,
	categoryValue: undefined,
	difficultyValue: undefined,
	limitValue: 1,
	value: null,
	multiValue: {}, // сюда записывается массив пользовательских ответов для вопроса с мультивыбором в формате answer_a: true и т.д.
};

const NAME = "quiz";

const request: CaseReducer<QuizStateType> = (state) => {
	state.showSettings = false;
	state.isLoading = true;
	state.hasError = false;
};

const success: CaseReducer<QuizStateType, PayloadAction<QuizType[]>> = (state, { payload }) => {
	state.showSettings = false;
	state.isLoading = false;
	state.hasError = false;
	state.quizzes = payload;
	state.quizLength = payload.length;
};

const failure: CaseReducer<QuizStateType> = (state) => {
	state.showSettings = true;
	state.isLoading = false;
	state.hasError = true;
};

const retryTest: CaseReducer<QuizStateType> = (state) => {
	state.rightAnswers = 0;
	state.currentQuestion = 0;
};

const newTest: CaseReducer<QuizStateType> = (state) => {
	state.rightAnswers = 0;
	state.currentQuestion = 0;
	state.categoryValue = undefined;
	state.difficultyValue = undefined;
	state.showSettings = true;
};

const switchQuestion: CaseReducer<QuizStateType, PayloadAction<boolean>> = (state, { payload }) => {
	state.rightAnswers = payload ? state.rightAnswers + 1 : state.rightAnswers;
	state.currentQuestion += 1;
	state.value = null;
};

const switchMultipleQuestion: CaseReducer<QuizStateType, PayloadAction<string[]>> = (state, { payload }) => {
	const { correct_answers } = state.quizzes[state.currentQuestion] || {};
	const filteredApiAnswer = Object.keys(correct_answers).filter((apiAnswer) =>
		isSetTrue(correct_answers[apiAnswer as CorrectAnswersNames])
	);
	if (
		payload.length === filteredApiAnswer.length &&
		payload.every((value, index) => value === filteredApiAnswer[index])
	) {
		state.rightAnswers += 1;
	}
	state.currentQuestion += 1;
	state.multiValue = {};
};

const hideNotification: CaseReducer<QuizStateType> = (state) => {
	state.hasError = false;
};

const changeCategory: CaseReducer<QuizStateType, PayloadAction<SelectProps["selected"]>> = (state, { payload }) => {
	state.categoryValue = payload;
};

const changeDifficulty: CaseReducer<QuizStateType, PayloadAction<SelectProps["selected"]>> = (state, { payload }) => {
	state.difficultyValue = payload;
};

const changeLimit: CaseReducer<QuizStateType, PayloadAction<SliderInputProps["value"]>> = (state, { payload }) => {
	state.limitValue = payload;
};

const changeValue: CaseReducer<QuizStateType, PayloadAction<RadioGroupProps["value"]>> = (state, { payload }) => {
	state.value = payload;
};

const changeMultiValue: CaseReducer<QuizStateType, PayloadAction<{ [answer: string]: boolean }>> = (
	state,
	{ payload }
) => {
	state.multiValue = payload;
};

export const { actions: quizActions, reducer: quizReducer } = createSlice({
	name: NAME,
	initialState: initialState,
	reducers: {
		request,
		success,
		failure,
		retryTest,
		newTest,
		switchQuestion,
		switchMultipleQuestion,
		hideNotification,
		changeCategory,
		changeDifficulty,
		changeLimit,
		changeValue,
		changeMultiValue,
	},
});
