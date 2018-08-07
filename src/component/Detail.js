import React, { Component } from "react";
import { getDetail } from "../service";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Detail extends Component {
  state = {
    content: "",
    siblingList: [{ id: "0", title: "0" }, { id: "0", title: "0" }]
  };

  componentDidMount() {
    this.initContent(this.props.match.params.id);
    this.getSibling();
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
      this.getSibling(nextProps.list, nextProps.match.params.id);
    }
  }

  getSibling(nextList, id) {
    let list = nextList || this.props.list;
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

  render() {
    let { goBack } = this.props.history;
    return (
      <div>
        <button onClick={goBack}>后退</button>
        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
        {this.state.siblingList[0].id !== "0" && (
          <Link
            to={{
              pathname: `/detail/${this.state.siblingList[0].id}`
            }}
          >
            上一篇:{this.state.siblingList[0].title}
          </Link>
        )}
        {this.state.siblingList[1].id !== "0" && (
          <Link
            className="next"
            to={{
              pathname: `/detail/${this.state.siblingList[1].id}`
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
    list: state.list
  };
};

export default connect(
  mapStateToProps
)(Detail);
