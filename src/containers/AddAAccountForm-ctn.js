import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Control, LocalForm, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAAccount } from '../actions/actions';

const required = val => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const positive = (val) => parseFloat(val) > 0;

class AddAAccountForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    let newValues = JSON.parse(JSON.stringify(values));
    newValues.balance = parseFloat(newValues.balance);

    this.props.addAAccount(newValues, this.props.jwt);
    this.handleClose();
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
    return (
      <>
      <Button variant="primary" onClick={this.handleShow}>
          Add An Account
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
        <LocalForm className="pop-up" onSubmit={(values) => {
                    this.handleSubmit(values)
                }} >
          <Modal.Header closeButton>
            <Modal.Title>Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Control.select 
            model=".accType" 
            name="accType" 
            className="form-control form-field"
            validators={{
              required
            }}
            >
                <option value="">Select an account type</option>
                <option value="checking">Checking Account</option>
                <option value="saving">Saving Account</option>
                <option value="cd">CD Account</option>
            </Control.select>
            <Errors
              className="text-danger"
              model=".accType"
              show="touched"
              messages={{
                  required: 'Required field. ',
                  isNumber: 'Must be numbers. ',
                  positive: 'Must be positive. '
              }}
            />
            <Control.text model=".balance" id="balance" name="balance" 
                          className="form-control form-field"
                          // parser={val => (parseFloat(val) || 0)}
                          validators= {{
                            isNumber, positive
                          }}
            />
            <Errors
                className="text-danger"
                model=".balance"
                show="touched"
                messages={{
                    required: 'Required field. ',
                    isNumber: 'Must be numbers. ',
                    positive: 'Must be positive. '
                }}
            />
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
          </LocalForm>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      jwt: state.JWT
  }
}

const mapDispatchToProps = (dispatch) => () => {
  return {
      addAAccount: bindActionCreators(addAAccount, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(AddAAccountForm);

