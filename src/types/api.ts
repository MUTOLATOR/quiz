export type AnswersNames = "answer_a" | "answer_b" | "answer_c" | "answer_d" | "answer_e" | "answer_f";
export type CorrectAnswersNames =
	| "answer_a_correct"
	| "answer_b_correct"
	| "answer_c_correct"
	| "answer_d_correct"
	| "answer_e_correct"
	| "answer_f_correct";

export type QuizType = {
	answers: Record<AnswersNames, string | null>;
	category: string;
	correct_answer: AnswersNames | null;
	correct_answers: Record<CorrectAnswersNames, "true" | "false">;
	description: string | null;
	difficulty: "Easy" | "Medium" | "Hard";
	explanation: string | null;
	id: number;
	multiple_correct_answers: "true" | "false";
	question: string;
	tags: Array<{ name: string }>;
	tip: null;
};
