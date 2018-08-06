import { getList } from "./service";
import Loading from "./component/Loading";

export const getListAsync = (page = 1) => {
  return dispatch => {
    Loading.globalLoading();
    getList(page).then(result => {
      let total = result.data;
      let aPureData = total.map(val => {
        return {
          id: val.id,
          title: val.title
        };
      });
      dispatch({type: 'INIT', payload: aPureData});
      Loading.stopGlobalLoading();
    });
  };
};

export const initArticleList = list => {
  return {
    type: 'INIT',
    payload: list
  };
};

export const setCurrentArticleIndex = index => {
  return {
    type: 'SET_ARTICLE_INDEX',
    payload: index
  }
}