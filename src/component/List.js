import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageButton from "./PageButton";
import { connect } from "react-redux";
import { getListAsync, setCurrentPage } from "../ActionCreator";

const PageButtonGroup = (total, handleClick) => {
  let aButton = [];
  for (let i = 1; i <= total; i++) {
    aButton.push(<PageButton page={i} key={i} handleClick={handleClick(i)} />);
  }
  return aButton;
};

class List extends Component {
  componentDidMount() {
    let currentPage = this.props.match.params.page; 
    this.props.getListAsync(currentPage);
    this.props.setCurrentPage(Number(currentPage));
    if (this.unListen) this.unListen();
    this.unListen = this.props.history.listen(location => {
      if (location.pathname.includes("list")) {
        let page = Number(location.pathname.slice(-1));
        if (page !== this.props.currentPage) {
          this.props.setCurrentPage(page);
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
    this.props.getListAsync(page);
    document.documentElement.scrollTop = 0;
  }

  handleClick(pageNum) {
    return () => {
      this.props.setCurrentPage(pageNum);
      this.start(pageNum);
      this.props.history.push(`/list/${pageNum}`);
    };
  }

  prePage() {
    if (this.props.currentPage - 1 > 0) {
      this.props.history.push(`/list/${this.props.currentPage - 1}`)
      this.props.setCurrentPage(this.props.currentPage - 1);
    }
  }

  nextPage() {
    if (this.props.currentPage + 1 <= this.props.totalPage) {
      this.props.history.push(`/list/${this.props.currentPage + 1}`)
      this.props.setCurrentPage(this.props.currentPage + 1);
    }
  }
 
  ListGroup(arr) {
    return arr.map((val, index) => {
      return (
        <li key={index}>
          {val.title}
          <Link
            index={val.index}
            to={{
              pathname: `/detail/${val.id}`,
              search: `currentPage=${this.props.currentPage}`
            }}
          >
            详情
          </Link>
        </li>
      );
    });
  };
  render() {
    let aButtonList = PageButtonGroup(
      this.props.totalPage,
      this.handleClick.bind(this)
    );
    (this.props.currentPage > 1) && aButtonList.unshift(
      <button onClick={this.prePage.bind(this)} key="pre">
        前一页
      </button>
    );
    (this.props.currentPage < this.props.totalPage) && aButtonList.push(
      <button onClick={this.nextPage.bind(this)} key="next">
        后一页
      </button>
    );
    return (
      <div>
        <ul>{this.ListGroup(this.props.list)}</ul>
        <div>{aButtonList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list,
    currentPage: state.currentPage,
    totalPage: state.totalPage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getListAsync: page => {
      dispatch(getListAsync(page));
    },
    setCurrentPage: pageNum => {
      dispatch(setCurrentPage(pageNum))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
