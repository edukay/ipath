import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Modal, Row, Col, Image, Radio, Alert } from 'react-bootstrap';
import './Client.css';
import Loader from '../Main/Loader/Loader';
import { Post } from '../../utilities/Api';


class Form extends Component {
    constructor(props) {
        super(props);
        this.subscribedPromises = [];

        this.state = {
            isLoading: false,
            title: 'Editing ',
            buttonText: 'Update Client',
            action: this.props.action,
            show: false,
            clientData: this.props.client,
            categories: this.props.categories,
            countries: this.props.countries,
            id: this.props.client.id,
            name: this.props.client.name || '',
            email: this.props.client.email || '',
            logo: this.props.client.logo || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 24 24"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" fill="#999"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
            active: this.props.client.active || 0,
            category_id: this.props.client.category_id || '',
            country_id: this.props.client.country_id || '',
            errors: [],
            responseStatus: 200,
            errorMessage: null
        }

        this.handleShowModal = this._handleShowModal.bind(this);
        this.handleCloseModal = this._handleCloseModal.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleInputChange = this._handleInputChange.bind(this);
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

        this.setState({ isLoading: true, errors: [], responseStatus: null, errorMessage: null })

        if (this.state.action === 'editing') {
            this.updateClient();
        }

        if (this.state.action === 'creating') {

        }
    }

    prepareFormData () {
        const { name, email, active, category_id, country_id, logo } = this.state;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("active", active);
        formData.append("category_id", category_id);
        formData.append("country_id", country_id);
        
        // formData.append("logo", logoFile);
        return formData;
    }

    updateClient () {
        const url = '/admin/clients/'+this.state.id;
        const updatePromise = Post(url, this.prepareFormData());
        updatePromise.promise
            .then(response => {
                this.setState({
                    isLoading: false,
                    responseStatus: response.status,
                });
                this._handleCloseModal();
                this.props.onClientUpdated();
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
        const { title, buttonText, isLoading, errorMessage } = this.state

        const alert = ( errorMessage !== null )  ?
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
                                <FormGroup validationState={this.hasErrorFor('email') ? 'error' : null}>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl
                                        type="email"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        placeholder="Client Email"
                                        onChange={this.handleInputChange}
                                     />
                                     <FormControl.Feedback />
                                     {this.renderErrorFor('email')}
                                </FormGroup>
                                <FormGroup validationState={this.hasErrorFor('country_id') ? 'error' : null}>
                                    <ControlLabel>Country</ControlLabel>
                                    <FormControl
                                        componentClass="select" 
                                        name="country_id"
                                        placeholder="-- Select Country --"    
                                        required
                                        value={this.state.country_id}
                                        onChange={this.handleInputChange}
                                     >
                                     <option value="">-- Select Country --</option>
                                    {      
                                     this.state.countries.map((country, index) => {
                                        return ( <option key={country.id} value={country.id}>{country.name}</option>  )
                                     })
                                    }
                                     </FormControl>
                                     <FormControl.Feedback />
                                        {this.renderErrorFor('country_id')}
                                </FormGroup>
                                <FormGroup validationState={this.hasErrorFor('category_id') ? 'error' : null}>
                                    <ControlLabel>Category</ControlLabel>
                                    <FormControl
                                        componentClass="select" 
                                        name="category_id"
                                        placeholder="-- Select Category --"    
                                        required
                                        value={this.state.category_id}
                                        onChange={this.handleInputChange}
                                     >
                                     <option value="">-- Select Category --</option>
                                    {      
                                     this.state.categories.map((category, index) => {
                                        return ( <option key={category.id} value={category.id}>{category.name}</option>  )
                                     })
                                    }
                                     </FormControl>
                                     <FormControl.Feedback />
                                        {this.renderErrorFor('category_id')}
                                </FormGroup>
                                <FormGroup>
                                    <Radio name="active" value="1" onChange={this.handleInputChange} checked={this.state.active == "1"} inline>
                                        Active
                                    </Radio>{' '}
                                    <Radio name="active" value="0" onChange={this.handleInputChange} checked={this.state.active == "0"} inline>
                                        Inactive
                                    </Radio>
                            
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
                <Button 
                    onClick={this.handleShowModal}
                    bsSize="xsmall"
                >Edit</Button>

                <Modal show={this.state.show} onHide={this.handleCloseModal} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>{ title + this.state.name }</Modal.Title>
                    </Modal.Header>

                    {alert}
                    
                    {form}

                </Modal>
            </div>
        );
    }
}

export default Form;