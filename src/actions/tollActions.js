
import { TOLLGURU_API_KEY } from '../config';

export const FETCH_TOLL_SUCCESS = 'FETCH_TOLL_SUCCESS';
export const FETCH_TOLL_FAILURE = 'FETCH_TOLL_FAILURE';

export const fetchToll = (startLocation, endLocation) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.tollguru.com/v1/calculate?from=${startLocation}&to=${endLocation}&vehicle=2Axle&departure_time=2023-01-01T12:00:00Z&key=${TOLLGURU_API_KEY}`
    );
    const data = await response.json();

    dispatch({
      type: FETCH_TOLL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOLL_FAILURE,
      payload: error.message,
    });
  }
};
