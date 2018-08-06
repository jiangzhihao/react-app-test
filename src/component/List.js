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
            pathname: `/detail/${val.id}`
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
    totalPage: 0,
    currentPage: 1
  };
  componentDidMount() {
    this.start();
    if(this.unListen) this.unListen();
    this.unListen = this.props.history.listen(location => {
      if (location.pathname.includes("list")) {
        let page = location.pathname.slice(-1);
        if (page !== this.state.currentPage) {
          this.setState({
            currentPage: page
          });
          this.start(page);
        }
      }
    });
  }
  componentWillUnmount() {
    this.unListen();
    this.unListen = null;
  }
  start(page = this.props.match.params.page) {
    if (Loading.isLoading()) {
      return;
    }
    Loading.globalLoading();
    getList(page)
      .then(result => {
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
      })
      .then(
        () => {
          document.documentElement.scrollTop = 0;
          this.setState({
            totalPage: 4
          });
          Loading.stopGlobalLoading();
        },
        err => {
          console.error(err);
          Loading.stopGlobalLoading();
        }
      );
  }
  handleClick(pageNum) {
    return () => {
      this.setState({
        currentPage: pageNum
      });
      this.start(pageNum);
      this.props.history.push(`/list/${pageNum}`);
    };
  }
  prePage() {
    let { currentPage } = this.state;
    if (this.state.currentPage - 1 > 0) {
      this.setState({
        currentPage: currentPage - 1
      });
      this.start(this.state.currentPage - 1);
    }
  }
  nextPage() {
    let { currentPage } = this.state;
    if (this.state.currentPage + 1 <= this.state.totalPage) {
      this.setState({
        currentPage: currentPage + 1
      });
      this.start(this.state.currentPage + 1);
    }
  }
  render() {
    let aArticleList =
      this.state.list.length > 0 ? ListGroup(this.state.list) : "";
    let aButtonList = PageButtonGroup(
      this.state.totalPage,
      this.handleClick.bind(this)
    );
    aButtonList.unshift(
      <button onClick={this.prePage.bind(this)} key="pre">
        前一页
      </button>
    );
    aButtonList.push(
      <button onClick={this.nextPage.bind(this)} key="next">
        后一页
      </button>
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
