import React from "react";
import produce from "immer";

export default class FAIcon extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      iconStyle: {opacity: 1}
    };
  }

  clickActionAndFeedback = () => {
    this.props.clickAction();

    this.setState(
      produce(draft => {
        draft.iconStyle = {
          opacity: 0.7
        }
      })
    );

    setTimeout(() => {
      this.setState(
        produce(draft => {
          draft.iconStyle = {
            opacity: 1
          }
        })
      );
    }, 300);
  }

  render() {
    const onClickAction = this.props.showFeedback ? this.clickActionAndFeedback : this.props.clickAction;

    return (
      <a onClick={onClickAction}>
        <i className={this.props.iconClasses} style={this.state.iconStyle} />
      </a>
    );
  }
}