import { CheckboxGroup, CheckboxGroupProps } from "@alfalab/core-components/checkbox-group";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { AnswersNames } from "types/api";
import { useAppDispatch, useAppSelector } from "store";
import { currentQuestionSelector, multiValueSelector, quizActions, quizzesSelector } from "store/quiz";

export const MultipleCorrectAnswers = () => {
	const dispatch = useAppDispatch();
	const quizzes = useAppSelector(quizzesSelector);
	const currentQuestion = useAppSelector(currentQuestionSelector);
	const { answers, question } = quizzes[currentQuestion] || {};
	const multiValue = useAppSelector(multiValueSelector);

	const handleChangeChecked: CheckboxGroupProps["onChange"] = (_, payload) => {
		dispatch(
			quizActions.changeMultiValue(
				Object.assign(Object.assign({}, multiValue), { [payload?.name as string]: payload?.checked })
			)
		);
	};

	return (
		<CheckboxGroup label={question} onChange={handleChangeChecked}>
			{Object.keys(answers)
				.filter((name) => answers[name as AnswersNames])
				.map((name) => (
					<Checkbox
						label={answers[name as AnswersNames]}
						key={name}
						name={name || ""}
						checked={multiValue[name] || false}
					/>
				))}
		</CheckboxGroup>
	);
};
