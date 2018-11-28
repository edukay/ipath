import React, { Component } from 'react';
import { Get } from '../../utilities/Api';
import Loader from '../Main/Loader/Loader';
import Table from './Table';

class Devicelist extends Component {
	constructor(props) {
		super(props);
		this.subscribedPromises = [];

		this.state = {
			isLoading: true,
			devices: []
		};
	}

	componentDidMount() {
		this.fetchDevices();
	}

	fetchDevices() {
		let DevicePromise = Get('/admin/devices');

        DevicePromise.promise
			.then(response => {
				this.setState({
					devices: response.data,
					isLoading: false,
					error: null
				});
				console.log('data fetched');
			})
			.catch(error => {
				this.setState({
		            error: error,
                    isLoading: false,
	          	});
			});

		this.subscribedPromises.push(DevicePromise);
		return DevicePromise.promise;
	}

	render () {
		if (this.state.isLoading) return <Loader />

        if (!this.state.loading) {
            return (
                <Table 
                    devices={this.state.devices}
                />
            );
        }
	}
}

export default Devicelist;