
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import  { slideInLeft, slideInRight, slideOutRight, slideInUp } from "react-animations";

const AnimationWrapper = styled.div`
  animation: ${({ duration }) => duration}s ${({ animation }) => animation};
  // animation-iteration-count: infinite;
`;

const withAnim = AnimComponent => {
  class WithAnimHoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        AsyncComponent: () => null,
        animation: this.props.animation,
        duration: this.props.duration,
      };
    }

    async componentDidMount() {
      const myModule = await import(`react-animations/lib/${
        this.state.animation
      }`);

      const AsyncComponent = () => (
        <AnimationWrapper
          duration={this.state.duration}
          animation={keyframes`${myModule.default}`}
        >
          <AnimComponent {...this.props} />
        </AnimationWrapper>
      );

      this.setState({ AsyncComponent });
    }

    render() {
      const { AsyncComponent } = this.state;

      return <AsyncComponent />;
    }
  }

  WithAnimHoc.defaultProps = {
    duration: "1.5"
  };

  WithAnimHoc.propTypes = {
    animation: PropTypes.string.isRequired,
    duration: PropTypes.string
  };

  return WithAnimHoc;
};

export default withAnim;
