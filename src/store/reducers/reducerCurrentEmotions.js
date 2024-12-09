import IRRITABILLITY from "../actions/actionIrritabillity";
import MANIA from "../actions/actionMania";
import ANXIETY from "../actions/actionAnxiety";
import PANIC from "../actions/actionPanic";
import DESPONDENCY from "../actions/actionDespondency";
import DEPRESSION from "../actions/actionDepression";
import TEXT from "../actions/actionText";
import EMOTION_LIST from "../actions/actionEmotionList";
import LOGGEDIN from "../actions/actionLoggedIn";
import LOGGEDINADMIN from "../actions/actionLoggedInAdmin";
import DATE from "../actions/actionDate";
// import initialState from "../initialState";

// function reducerCurrentEmotions(state = initialState, action) {
function reducerCurrentEmotions(state, action) {
  switch (action.type) {
    case IRRITABILLITY: return { ...state, value_irritabillity: action.payload };
    case MANIA: return { ...state, value_mania: action.payload };
    case ANXIETY: return { ...state, value_anxiety: action.payload };
    case PANIC: return { ...state, value_panic: action.payload };
    case DESPONDENCY: return { ...state, value_despondency: action.payload };
    case DEPRESSION: return { ...state, value_depression: action.payload };
    case TEXT: return { ...state, value_text: action.payload };
    case EMOTION_LIST: return { ...state, value_emotionList: action.payload };
    case LOGGEDIN: return { ...state, value_loggedIn: action.payload };
    case LOGGEDINADMIN: return { ...state, value_loggedIn_admin: action.payload };
    case DATE: return { ...state, value_date: action.payload };

    default: return state;
  }
}

export default reducerCurrentEmotions;