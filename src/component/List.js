import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageButton from "./PageButton";
import { connect } from "react-redux";
import { getListAsync, setCurrentArticleIndex } from "../ActionCreator";

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
    totalPage: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.start();
    if (this.unListen) this.unListen();
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
  
  componentWillReceiveProps(nextProps) {
    this.aArticleList = this.ListGroup(nextProps.list);
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
  handleDetailClick(e) {
    let index = e.target.getAttribute('index');
    this.props.setCurrentArticleIndex(index);
  }
  ListGroup = arr => {
    return arr.map((val, index) => {
      return (
        <li key={index}>
          {val.title}
          <Link
            onClick={this.handleDetailClick.bind(this)}
            index={val.index}
            to={{
              pathname: `/detail/${val.id}`
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
        <ul>{this.aArticleList}</ul>
        <div>{aButtonList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getListAsync: page => {
      dispatch(getListAsync(page));
    },
    setCurrentArticleIndex: index => {
      dispatch(setCurrentArticleIndex(index))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
