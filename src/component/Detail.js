import React, { Component } from "react";
import { getDetail } from "../service";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import querystring from 'querystring';
import { getListAsync, setCurrentPage } from '../ActionCreator';

class Detail extends Component {
  state = {
    content: "",
    siblingList: [{ id: "0", title: "0" }, { id: "0", title: "0" }]
  };

  componentDidMount() {
    if (this.props.list.length === 0) {
      let { currentPage } = querystring.parse(this.props.location.search.slice(1));
      this.props.getListAsync(currentPage);
      this.props.setCurrentPage(currentPage);
    }
    this.initContent(this.props.match.params.id);
    this.getSibling(this.props.list, this.props.match.params.id);
  }

  initContent(id) {
    getDetail(id).then(result => {
      this.setState({
        content: result.data.content
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.initContent(nextProps.match.params.id);
    }
    this.getSibling(nextProps.list, nextProps.match.params.id);
  }

  getSibling(nextList, id) {
    let list = nextList;
    let index = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        index = i;
        break;
      }
    }
    let siblingList = [];
    let pre = index - 1;
    let next = index + 1;
    let nullList = {
      id: "0",
      title: "没有了"
    };
    if (pre > 0 || pre === 0) {
      siblingList.push(list[pre]);
    } else {
      siblingList.push(nullList);
    }
    if (next < list.length - 1) {
      siblingList.push(list[next]);
    } else {
      siblingList.push(nullList);
    }
    this.setState({
      siblingList
    });
  }

  goBack() {
    const { currentPage } = this.props;
    this.props.history.push(`/list/${currentPage}`);
  }

  render() {
    return (
      <div>
        <button onClick={this.goBack.bind(this)}>回到列表页</button>
        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
        {this.state.siblingList[0].id !== "0" && (
          <Link
            to={{
              pathname: `/detail/${this.state.siblingList[0].id}`,
              search: `currentPage=${this.props.currentPage}`
            }}
          >
            上一篇:{this.state.siblingList[0].title}
          </Link>
        )}
        {this.state.siblingList[1].id !== "0" && (
          <Link
            className="next"
            to={{
              pathname: `/detail/${this.state.siblingList[1].id}`,
              search: `currentPage=${this.props.currentPage}`
            }}
          >
            下一篇:{this.state.siblingList[1].title}
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list,
    currentPage: state.currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListAsync: (pageNum) => {
      dispatch(getListAsync(pageNum))
    },
    setCurrentPage: (pageNum) => {
      dispatch(setCurrentPage(pageNum))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);
