import { RadioGroup, RadioGroupProps } from "@alfalab/core-components/radio-group";
import { Radio } from "@alfalab/core-components/radio";
import { AnswersNames } from "types/api";
import { useAppDispatch, useAppSelector } from "store";
import { currentQuestionSelector, quizActions, quizzesSelector, valueSelector } from "store/quiz";

export const SingleCorrectAnswer = () => {
	const dispatch = useAppDispatch();
	const quizzes = useAppSelector(quizzesSelector);
	const currentQuestion = useAppSelector(currentQuestionSelector);
	const { answers, question } = quizzes[currentQuestion] || {};
	const value = useAppSelector(valueSelector);

	const handleChangeRadio: RadioGroupProps["onChange"] = (_, payload) => {
		dispatch(quizActions.changeValue(payload?.value));
	};

	return (
		<RadioGroup label={question} value={value} onChange={handleChangeRadio}>
			{Object.keys(answers)
				.filter((name) => answers[name as AnswersNames])
				.map((name) => (
					<Radio label={answers[name as AnswersNames]} key={name} value={name} />
				))}
		</RadioGroup>
	);
};
