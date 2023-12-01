import PANIC from "../actions/actionPanic";

function actionCreatorPanic(value) {
  return {
    type: PANIC,
    payload: value,
  }
}

export default actionCreatorPanic;