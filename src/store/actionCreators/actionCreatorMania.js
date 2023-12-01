import MANIA from "../actions/actionMania";

function actionCreatorMania(value) {
  return {
    type: MANIA,
    payload: value,
  }
}

export default actionCreatorMania;