import USERS from "../actions/actionUsers";

function actionCreatorUsers(value) {
  return {
    type: USERS,
    payload: value,
  }
}

export default actionCreatorUsers;