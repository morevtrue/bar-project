import DATE from "../actions/actionDate";

function actionCreatorDate(value) {
  return {
    type: DATE,
    payload: value,
  }
}

export default actionCreatorDate;