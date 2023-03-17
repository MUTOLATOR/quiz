import axios from "axios";
import { QuizType } from "types/api";
import { store } from "store";

const API_KEY = process.env.REACT_APP_API_KEY;

export const category = [
	{ key: "1", content: "Linux" },
	{ key: "2", content: "Bash" },
	{ key: "3", content: "Uncategorized" },
	{ key: "4", content: "Docker" },
	{ key: "5", content: "SQL" },
	{ key: "6", content: "CMS" },
	{ key: "7", content: "Code" },
	{ key: "8", content: "DevOps" },
];

export const difficulty = [
	{ key: "1", content: "easy" },
	{ key: "2", content: "medium" },
	{ key: "3", content: "hard" },
];

export const getQuizzes = (): Promise<QuizType[]> => {
	const state = store.getState();
	const CATEGORY_VALUE = state.quiz.categoryValue;
	const DIFFICULTY_VALUE = state.quiz.difficultyValue;
	const LIMIT_VALUE = state.quiz.limitValue;

	return axios
		.get<QuizType[]>(
			`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${CATEGORY_VALUE}&difficulty=${DIFFICULTY_VALUE}&limit=${LIMIT_VALUE}`
		)
		.then((response) => response.data);
};
