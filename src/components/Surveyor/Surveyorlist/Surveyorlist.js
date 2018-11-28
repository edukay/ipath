import React, { Component } from 'react';
import Loader from '../../Main/Loader/Loader';
import { Get } from '../../../utilities/Api'; 
import $ from 'jquery';
import './Surveyorlist.css';
import { Panel } from 'react-bootstrap';
import Table from '../Table';
import SurveyorForm from '../SurveyorForm';


class Surveyorlist extends Component {
    constructor(props) {
        super(props);
        this.subscribedPromises = [];

        this.state = {
            isLoading: true,
            surveyors: []
        }

        this.handleSurveyorUpdated = this._handleSurveyorUpdated.bind(this);
    }

    _handleSurveyorUpdated () {
        this.setState({ isLoading: true });
        this.fetchSurveyors();
    }

    componentDidMount () {
        this.fetchSurveyors();
    }

    fetchSurveyors () {
        let SurveyorPromise = Get('/admin/surveyors');

        SurveyorPromise.promise
			.then(response => {
				this.setState({
					surveyors: response.data,
					isLoading: false,
					error: null
				});
				console.log('data fetched');
			})
			.catch(error => {
				this.setState({
		            error: error
	          	});
			});

		this.subscribedPromises.push(SurveyorPromise);
		return SurveyorPromise.promise;
    }

    componentWillUnmount() {
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);

	    this.subscribedPromises.forEach(function(promise) {
	      promise.cancel();
	    });
    }

    shouldComponentUpdate() {
        return true;
    }

    render () {
        if (this.state.isLoading) return <Loader />;

        return (
		    <div>
                <Panel>
                    <Panel.Heading className="clearfix">
                        <SurveyorForm onSurveyorUpdated={this.handleSurveyorUpdated} action="create" label="Add Surveyor" />
                    </Panel.Heading>
                    <Panel.Body>
                        <Table surveyors={this.state.surveyors} onSurveyorUpdated={this.handleSurveyorUpdated}/>
                    </Panel.Body>
                </Panel>
            </div>

		);


    }
}

export default Surveyorlist;