import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { Select, SelectProps } from "@alfalab/core-components/select";
import { SliderInput, SliderInputProps } from "@alfalab/core-components/slider-input";
import { Button } from "@alfalab/core-components/button";
import { category, difficulty } from "api/quiz";
import { useAppDispatch, useAppSelector } from "store";
import { categorySelector, difficultySelector, limitSelector, quizActions } from "store/quiz";

export const QuizSettings = () => {
	const dispatch = useAppDispatch();

	const categorySettings = category;
	const difficultySettings = difficulty;

	const categoryValue = useAppSelector(categorySelector);
	const difficultyValue = useAppSelector(difficultySelector);
	const limitValue = useAppSelector(limitSelector);

	const handleCategoryValue: SelectProps["onChange"] = ({ selected }) => {
		dispatch(quizActions.changeCategory(selected?.content as string));
	};

	const handleDifficultyValue: SelectProps["onChange"] = ({ selected }) => {
		dispatch(quizActions.changeDifficulty(selected?.content as string));
	};

	const handleChangeLimitValue: SliderInputProps["onChange"] = (_, payload) => {
		dispatch(quizActions.changeLimit(payload.value));
	};

	const handleOnButtonClick = () => {
		dispatch(quizActions.request());
	};

	return (
		<div className="quiz-settings">
			<Space direction="vertical" size={20}>
				<Typography.Text view="primary-large">
					Для успешного прохождения теста необходимо набрать не менее 80% правильных ответов
				</Typography.Text>
				<Select options={categorySettings} placeholder="Выберите категорию" onChange={handleCategoryValue} />
				<Select
					options={difficultySettings}
					placeholder="Выберите сложность"
					onChange={handleDifficultyValue}
				/>
				<SliderInput
					min={1}
					max={20}
					step={1}
					steps={["0", "10", "20"]}
					block={true}
					value={limitValue}
					onChange={handleChangeLimitValue}
					label="Максимальное количество вопросов"
				/>
				<Button view="primary" onClick={handleOnButtonClick} disabled={!categoryValue || !difficultyValue}>
					Начать тест
				</Button>
			</Space>
		</div>
	);
};
