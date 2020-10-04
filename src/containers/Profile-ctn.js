import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAAccount } from '../actions/actions';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose() {
    this.setState({
      show: false
    })
  }

  handleShow() {
    this.setState({
      show: true
    })
  }
  
  render() {
    const { firstName, lastName, middleName, email, ssn } = this.props.profile;
    return (
      <div>
      <Button variant="primary" onClick={this.handleShow}>
          Profile
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
        <LocalForm className="pop-up" onSubmit={(values) => {
                    this.handleSubmit(values)
                }} >
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div >
                <p><strong>First Name:</strong> {firstName}</p>
                <p><strong>Middle Name:</strong> {middleName}</p>
                <p><strong>Last Name:</strong> {lastName}</p>
                <p><strong>email:</strong> {email}</p>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
          </LocalForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      profile: state.profile
  }
}

export default connect(mapStateToProps)(Profile);

