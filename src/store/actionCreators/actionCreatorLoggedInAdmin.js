import LOGGEDINADMIN from "../actions/actionLoggedInAdmin";

function actionCreatorLoggedInAdmin(value) {
  return {
    type: LOGGEDINADMIN,
    payload: value,
  }
}

export default actionCreatorLoggedInAdmin;