import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Modal, Row, Col, HelpBlock, Image, Radio, Alert, Glyphicon } from 'react-bootstrap';
import Loader from '../Main/Loader/Loader';
import { Post } from '../../utilities/Api';


class Form extends Component {
    constructor(props) {
        super(props);
        this.subscribedPromises = [];

        const surveyor = this.props.surveyor || {};

        this.state = {
            isLoading: false,
            buttonText: '',
            action: this.props.action || 'create',
            show: false,
            surveyorData: surveyor,
            id: surveyor.id || '',
            name: surveyor.name || '',
            phone_number: surveyor.phone_number || '',
            national_id: surveyor.national_id || '',
            password: '',
            logo: surveyor.logo || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 24 24"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" fill="#999"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
            active: surveyor.status || 0,
            errors: [],
            responseStatus: 200,
            errorMessage: ''
        }

        this.handleShowModal = this._handleShowModal.bind(this);
        this.handleCloseModal = this._handleCloseModal.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleInputChange = this._handleInputChange.bind(this);
    }

    componentDidMount () {
        let { action } = this.state;

        var buttonText = (action === 'create') ? 'Create Surveyor' : 'Update Surveyor';

        this.setState({
            buttonText: buttonText
        })
    }

    _handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    _handleShowModal() {
        this.setState({ show: true })
    }

    _handleCloseModal() {
        this.setState({ show: false, errorMessage: '', errors: [], responseStatus: null })
    }

    _handleSubmit (event) {
        event.preventDefault();

        this.setState({ isLoading: true, errors: [], responseStatus: null, errorMessage: '' })

        if (this.state.action === 'edit') {
            this.updateSurveyor();
        }

        if (this.state.action === 'create') {
        	this.createSurveyor()
        }
    }

    prepareFormData () {
        const { name, national_id, phone_number, active, password, logo } = this.state;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("national_id", national_id);
        formData.append("phone_number", phone_number);
        formData.append("active", active);

        if (password.length)
        	formData.append("password", password);
        
        // formData.append("logo", logoFile);
        return formData;
    }

    createSurveyor () {
        const url = '/admin/surveyors';
        const createPromise = Post(url, this.prepareFormData());
        createPromise.promise
            .then(response => {
                this.setState({
                    isLoading: false,
                    responseStatus: response.status,
                });
                this._handleCloseModal();
                this.props.onSurveyorUpdated();
            }).catch(error => {
                this.setState({
                    errors: error,
                    isLoading: false,
                    errorMessage: error.data.message,
                    responseStatus: error.status,
                });
            });
        this.subscribedPromises.push(createPromise);
    }

    updateSurveyor () {
        const url = '/admin/surveyors/'+this.state.id;
        const updatePromise = Post(url, this.prepareFormData());
        updatePromise.promise
            .then(response => {
                this.setState({
                    isLoading: false,
                    responseStatus: response.status,
                });
                this._handleCloseModal();
                this.props.onSurveyorUpdated();
            }).catch(error => {
                this.setState({
                    errors: error,
                    isLoading: false,
                    errorMessage: error.data.message,
                    responseStatus: error.status,
                });
            });
        this.subscribedPromises.push(updatePromise);
    }

    renderErrorFor (field) {
      if (this.hasErrorFor(field)) {
        return (
          <span className='help-block'>
            <strong>{ this.getErrorForField(field) }</strong>
          </span>
        )
      }
    }

    formHasError () {
        return this.state.responseStatus !== 200;
    }

    hasErrorFor (field) {
      return this.state.responseStatus === 422 ? 
        !!this.state.errors.data.errors[field] :
        false
    }

    getErrorForField (field) {
        if (this.state.responseStatus === 422) {
            return this.state.errors.data.errors[field][0];
        }
    }

    render () {
        const { action, buttonText, isLoading, errorMessage } = this.state;

        const label = action === 'edit' ?
                    (   <Button onClick={this.handleShowModal} bsSize="xsmall">Edit</Button> ) :
                    (   <Button bsStyle="info" onClick={this.handleShowModal} className="pull-right" >
                            <Glyphicon glyph="plus" /> Add Surveyor
                        </Button>    
                    );


        const alert = ( errorMessage.length )  ?
            (    <Alert bsStyle="warning" className="mr-xs ml-xs mt-xs">
                  <strong>Error! </strong>{ errorMessage }
                </Alert>
            ) : ( '' );


        const form = 
            isLoading ? ( <Loader /> ) :
            (
                <form onSubmit={this.handleSubmit}> 
        
                    <Modal.Body>
                        <Row>   
                            <Col md={7}>
                                <FormGroup validationState={this.hasErrorFor('name') ? 'error' : null}>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="name"
                                        required
                                        value={this.state.name}
                                        placeholder="Client Name"
                                        onChange={this.handleInputChange}
                                     />
                                     <FormControl.Feedback />
                                     {this.renderErrorFor('name')}
                                </FormGroup>
                                <FormGroup validationState={this.hasErrorFor('national_id') ? 'error' : null}>
                                    <ControlLabel>National ID</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="national_id"
                                        required
                                        value={this.state.national_id}
                                        placeholder="Surveyor National ID"
                                        onChange={this.handleInputChange}
                                     />
                                     <FormControl.Feedback />
                                     {this.renderErrorFor('national_id')}
                                </FormGroup>
                                <FormGroup validationState={this.hasErrorFor('phone_number') ? 'error' : null}>
                                    <ControlLabel>Phone Number</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="phone_number"
                                        required
                                        value={this.state.phone_number}
                                        placeholder="Surveyor phone number"
                                        onChange={this.handleInputChange}
                                     />
                                     <FormControl.Feedback />
                                     {this.renderErrorFor('phone_number')}
                                </FormGroup>
                                <FormGroup>
                                    <Radio name="active" value="1" onChange={this.handleInputChange} checked={this.state.active == "1"} inline>
                                        Active
                                    </Radio>{' '}
                                    <Radio name="active" value="0" onChange={this.handleInputChange} checked={this.state.active == "0"} inline>
                                        Inactive
                                    </Radio>
                            
                                </FormGroup>
                                <FormGroup validationState={this.hasErrorFor('password') ? 'error' : null}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        placeholder="Surveyor Password"
                                        onChange={this.handleInputChange}
                                     />
                                     <HelpBlock>Password field only required when creating new surveyors.</HelpBlock>
                                     <FormControl.Feedback />
                                     {this.renderErrorFor('password')}
                                </FormGroup>
                            </Col>
                        <Col md={5}>
                            <div className="pt-sm pb-sm ProfilePicture">
                                <Image
                                        thumbnail
                                        responsive
                                        src={
                                            this.state.logo
                                        }
                                    />
                                </div>
                            </Col>   
                        </Row>

                        <Button bsStyle="primary" type="submit">{ buttonText }</Button> 
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleCloseModal}>Close</Button>
                    </Modal.Footer>

                </form>
            );

        return (
            <div>
                {label}

                <Modal show={this.state.show} onHide={this.handleCloseModal} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>{ action + ': ' + this.state.name }</Modal.Title>
                    </Modal.Header>

                    {alert}
                    
                    {form}

                </Modal>
            </div>
        );
    }
}

export default Form;