import { getList } from "./service";

export const getListAsync = (page = 1) => {
  return dispatch => {
    getList(page).then(result => {
      let total = result.data;
      let aPureData = total.map(val => {
        return {
          id: val.id,
          title: val.title
        };
      });
      dispatch({type: 'INIT', payload: aPureData});
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