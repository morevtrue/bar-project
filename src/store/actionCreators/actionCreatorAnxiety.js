import ANXIETY from "../actions/actionAnxiety";

function actionCreatorAnxiety(value) {
  return {
    type: ANXIETY,
    payload: value,
  }
}

export default actionCreatorAnxiety;