import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/const';

let initState = lastRecord && !isNaN(parseInt(lastRecord.startLines, 10)) ?
  parseInt(lastRecord.startLines, 10) : 5;
if (initState < 0 || initState > 10) {
  initState = 0;
}

initState = 5;

const startLines = (state = initState, action) => {
  switch (action.type) {
    case reducerType.START_LINES:
      return action.data;
    default:
      return state;
  }
};

export default startLines;
