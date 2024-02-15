import TEXT from "../actions/actionText";

function actionCreatorText(value) {
  return {
    type: TEXT,
    payload: value,
  }
}

export default actionCreatorText;