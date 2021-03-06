import React, { Component } from 'react';
import ReactJoyride, { STATUS } from 'react-joyride';
import Modal from 'react-modal';
import styled from 'styled-components';
import a11yChecker from 'a11y-checker';

const Wrapper = styled.div`
  align-items: center;
  background: #ccc
    repeating-linear-gradient(
      45deg,
      #606dbc,
      #606dbc 10px,
      #465298 10px,
      #465298 20px
    );
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 10px;
  width: 100vw;
`;

const Heading = styled.h1`
  color: #fff;
  margin: 0;
  text-align: center;
`;

const SubHeading = styled.h3`
  color: #fff;
  text-align: center;
  
  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background-color: #f04;
  color: #fff;
  margin-bottom: 16px;
  padding: 8px;

  + button {
    margin-left: 15px;
  }
`;

class ModalDemo extends Component {
  state = {
    modalIsOpen: false,
    run: false,
    steps: [
      {
        target: '.ReactModal__Content button:nth-of-type(1)',
        content: 'Tabs or spaces? 🤔',
        placement: 'bottom',
        textAlign: 'center'
      },
      {
        target: '.ReactModal__Content button:nth-of-type(2)',
        content: 'A button! That\'s rare on the web',
        placement: 'bottom',
      },
      {
        target: '.ReactModal__Content button:nth-of-type(3)',
        content: 'Sometimes I wonder what\'s inside my mind',
        placement: 'bottom'
      },
      {
        target: '.ReactModal__Content button:nth-of-type(4)',
        content: 'Modal, Portal, Quintal!',
        placement: 'bottom'
      }
    ]
  };

  componentDidMount() {
    a11yChecker();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.modalIsOpen && this.state.modalIsOpen) {
      this.start();
    }
  }

  start = () => {
    this.setState({
      run: true,
      stepIndex: 0
    });
  };

  handleJoyrideCallback = (data) => {
    const { status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ run: false });
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      run: false
    });
  };

  afterOpenModal = () => {
    this.setState({
      run: true
    });
  };

  render() {
    const { modalIsOpen, run, steps } = this.state;

    const customStyles = {
      content: {
        maxHeight: '70%',
        textAlign: 'center'
      }
    };

    return (
      <Wrapper>
        <ReactJoyride
          callback={this.handleJoyrideCallback}
          continuous
          run={run}
          showSkipButton
          steps={steps}
          styles={{
            options: {
              arrowColor: '#e3ffeb',
              backgroundColor: '#e3ffeb',
              primaryColor: '#000',
              textColor: '#004a14',
              overlayColor: 'rgba(79, 26, 0, 0.4)',
            }
          }}
        />
        <Heading>It works with modals</Heading>
        <SubHeading>
          (using{' '}
          <a
            href="https://github.com/reactjs/react-modal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open react-modal in a new window"
          >
            react-modal
          </a>)
        </SubHeading>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>A react-modal example</h2>
          <p>I am a modal</p>
          <Button tabIndex={1}>tab navigation</Button>
          <Button tabIndex={2}>stays</Button>
          <Button tabIndex={3}>inside</Button>
          <Button tabIndex={4}>the modal</Button>
        </Modal>
      </Wrapper>
    );
  }
}

export default ModalDemo;
