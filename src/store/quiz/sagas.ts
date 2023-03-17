import { getQuizzes } from "api/quiz";
import { takeLatest, call, put } from "redux-saga/effects";
import { QuizType } from "types/api";
import { quizActions } from "./slice";

function* getQuizzesSaga() {
	try {
		const quizzes: QuizType[] = yield call(getQuizzes);

		yield put(quizActions.success(quizzes));
	} catch (error) {
		yield put(quizActions.failure());
	}
}

export function* watchQuizSaga() {
	yield takeLatest(quizActions.request.type, getQuizzesSaga);
}
