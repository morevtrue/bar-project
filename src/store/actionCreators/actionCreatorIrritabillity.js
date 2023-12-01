import IRRITABILLITY from "../actions/actionIrritabillity";

function actionCreatorIrritabillity(value) {
  return {
    type: IRRITABILLITY,
    payload: value,
  }
}

export default actionCreatorIrritabillity;