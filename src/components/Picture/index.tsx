
import * as React from 'react';
import classNames from 'classnames';
import "./index.less";
import "../../style/css/animate.less";
interface IProps {
  src?: string;
  name?: string;
  author?: string;
  style?: string;
}

interface IState {
  isPressed: boolean
  isHovered: boolean,
  isOpen: boolean
}

class PictureList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isHovered: false,
      isPressed: false,
      isOpen: false
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

  private openDetails = () => {
    this.setState({ isOpen: true })
  };

  private closeDetails = () => {
    this.setState({ isOpen: false })
  }

  public render() {
    const pictureClass = classNames({
      'picture-normal': true,
      'picture-pressed': this.state.isPressed,
      'picture-hover': !this.state.isPressed && this.state.isHovered
    });
    const maskClass = classNames({
      'no-mask': true,
      'mask animated fadeInDown faster': !this.state.isPressed && this.state.isHovered,
    });

    const detailsClass = classNames({
      'close-details': !this.state.isOpen,
      'open-details animated pulse faster': this.state.isOpen,
    });
    return (
      <section className={pictureClass} tabIndex={0}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onMouseLeave={this.handleLeave}
        onMouseOver={this.handleHover}
      >
        <div className={detailsClass}>
          <span onClick={this.closeDetails}>X</span>
          <img src={this.props.src} className="outterPic" />
          <h1>{this.props.name}</h1>
        </div>
        <div className={maskClass} onClick={this.openDetails}>
          <h2 className="animated fadeInDown faster delay-500 " >{this.props.name}</h2>
          <h4 className="animated fadeInUp faster delay-500 ">{this.props.author}/{this.props.style}</h4>
        </div>
        <img src={this.props.src} className="innerPic" />
      </section>
    )
  }
}

export default PictureList;