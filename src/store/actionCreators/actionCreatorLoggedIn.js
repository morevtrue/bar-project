import LOGGEDIN from "../actions/actionLoggedIn";

function actionCreatorLoggedIn(value) {
  return {
    type: LOGGEDIN,
    payload: value,
  }
}

export default actionCreatorLoggedIn;