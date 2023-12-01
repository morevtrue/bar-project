import EMOTION_LIST from "../actions/actionEmotionList";

function actionCreatorEmotionList(value) {
  return {
    type: EMOTION_LIST,
    payload: value,
  }
}

export default actionCreatorEmotionList;