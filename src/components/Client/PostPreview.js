import React, { Component } from 'react';
import { Modal, Button, Row, Col, Thumbnail } from 'react-bootstrap';

class PostPreview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: this.props.post,
			show: false
		}

		this.handleShowModal = this._handleShowModal.bind(this);
		this.handleCloseModal = this._handleCloseModal.bind(this);
	}

	_handleShowModal() {
        this.setState({ show: true })
    }

    _handleCloseModal() {
        this.setState({ show: false })
    }

	render () {
		const { day_image, night_image } = this.state.post
		return (
			<div>
				<Button onClick={this.handleShowModal} bsSize="xsmall">
					Preview
				</Button>

                <Modal show={this.state.show} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    	<Row>
                    		<Col md={6}>
                    			
                    		<Thumbnail src={day_image} className="ProfilePicture">
							        <p>Day Image</p>
						      	</Thumbnail>
                    		</Col>
                    		<Col md={6}>
		                        <Thumbnail src={night_image} className="ProfilePicture">
							        <p>Night Image</p>
						      	</Thumbnail>
                    		</Col>
                    	</Row>
                    </Modal.Body>
                    <Modal.Footer>
                    	<Button onClick={this.handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
			</div>
		);
	}
}

export default PostPreview;