import DESPONDENCY from "../actions/actionDespondency";

function actionCreatorDespondency(value) {
  return {
    type: DESPONDENCY,
    payload: value,
  }
}

export default actionCreatorDespondency;