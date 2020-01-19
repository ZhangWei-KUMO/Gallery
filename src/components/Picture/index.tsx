
import * as React from 'react';
import classNames from 'classnames';
import "./index.less";

interface IProps {
  src?: string
}

interface IState {
  isPressed: boolean
  isHovered: boolean
}

class PictureList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isHovered: false,
      isPressed: false
    }
  }
  private handleHover = () => {
    this.setState({ isHovered: true })
  };

  private handleLeave = () => {
    this.setState({ isHovered: false })
  }

  private handleClick = (e: object) => {
    this.setState({ isPressed: true })
  };

  private handleBlur = (e: object) => {
    this.setState({ isPressed: false })
  }
  public render() {
    const pictureClass = classNames({
      'picture-normal': true,
      'picture-pressed': this.state.isPressed,
      'picture-hover': !this.state.isPressed && this.state.isHovered
    });
    return (
      <section className={pictureClass} tabIndex={0}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onMouseLeave={this.handleLeave}
        onMouseOver={this.handleHover}
      >
        <img src={this.props.src} />
      </section>
    )
  }
}

export default PictureList;