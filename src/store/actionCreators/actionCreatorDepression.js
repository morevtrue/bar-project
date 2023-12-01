import DEPRESSION from "../actions/actionDepression";

function actionCreatorDepression(value) {
  return {
    type: DEPRESSION,
    payload: value,
  }
}

export default actionCreatorDepression;