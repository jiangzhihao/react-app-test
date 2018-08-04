import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getList } from "../service";
import PageButton from "./PageButton";
import Loading from "./Loading";

const ListGroup = arr => {
  return arr.map((val, index) => {
    return (
      <li key={index}>
        {val.title}
        <Link
          to={{
            pathname: `detail/${val.id}`
            // search: val.id
          }}
        >
          详情
        </Link>
      </li>
    );
  });
};

const PageButtonGroup = (total, handleClick) => {
  let aButton = [];
  for (let i = 1; i <= total; i++) {
    aButton.push(<PageButton page={i} key={i} handleClick={handleClick(i)} />);
  }
  return aButton;
};

class List extends Component {
  state = {
    list: [],
    totalPage: 0
  };
  componentDidMount() {
    this.start();
  }
  start(page = 1) {
    if (Loading.isLoading()) {
      return;
    }
    Loading.globalLoading();
    getList(page).then(result => {
      let total = result.data;
      let aPureData = total.map(val => {
        return {
          id: val.id,
          title: val.title
        };
      });
      this.setState({
        list: aPureData
      });
    }).then(() => {
        document.documentElement.scrollTop = 0;
        this.setState({
            totalPage: 4
        })
        Loading.stopGlobalLoading();
      }, (err) => {
        console.error(err);
        Loading.stopGlobalLoading();
      });
  }
  handleClick(pageNum) {
    return () => {
      this.start(pageNum);
    };
  }
  render() {
    let aArticleList =
      this.state.list.length > 0 ? ListGroup(this.state.list) : "";
    let aButtonList = PageButtonGroup(
      this.state.totalPage,
      this.handleClick.bind(this)
    );
    return (
      <div>
        <ul>{aArticleList}</ul>
        <div>{aButtonList}</div>
      </div>
    );
  }
}

export default List;
