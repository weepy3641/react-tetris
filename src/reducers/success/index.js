import * as reducerType from '../../unit/reducerType';
import { lastRecord } from '../../unit/const';

const initState = lastRecord && lastRecord.success !== undefined ? !!lastRecord.success : false;

const success = (state = initState, action) => {
  switch (action.type) {
    case reducerType.SUCCESS:
      return action.data;
    default:
      return state;
  }
};

export default success;
