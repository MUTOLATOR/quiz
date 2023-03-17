import { fork } from "redux-saga/effects";
import { watchQuizSaga } from "./quiz";

export function* rootSaga() {
	yield fork(watchQuizSaga);
}
