import { ApplicationState } from "store";

export const quizSelector = (state: ApplicationState) => state.quiz;

export const quizzesSelector = (state: ApplicationState) => quizSelector(state).quizzes;
export const isLoadingSelector = (state: ApplicationState) => quizSelector(state).isLoading;
export const hasErrorSelector = (state: ApplicationState) => quizSelector(state).hasError;
export const showSettingsSelector = (state: ApplicationState) => quizSelector(state).showSettings;
export const currentQuestionSelector = (state: ApplicationState) => quizSelector(state).currentQuestion;
export const rightAnswersSelector = (state: ApplicationState) => quizSelector(state).rightAnswers;
export const quizLengthSelector = (state: ApplicationState) => quizSelector(state).quizLength;

export const categorySelector = (state: ApplicationState) => quizSelector(state).categoryValue;
export const difficultySelector = (state: ApplicationState) => quizSelector(state).difficultyValue;
export const limitSelector = (state: ApplicationState) => quizSelector(state).limitValue;
export const valueSelector = (state: ApplicationState) => quizSelector(state).value;
export const multiValueSelector = (state: ApplicationState) => quizSelector(state).multiValue;
