import React, { Component } from 'react'
import Loader from '../../Main/Loader/Loader';
import { Get } from '../../../utilities/Api'; 
import Table from '../Table';  

class Clientlist extends Component {
    constructor(props) {
        super(props);
        this.subscribedPromises = [];

        this.state = {
            isLoading: true,
            clients: [],
            categories: [],
            countries: [],
            showModal: false
        }

        this.handleClientUpdated = this._handleClientUpdated.bind(this);
    }

    componentDidMount() {
        this.fetchClientCategories()
                .then( response => this.fetchCountries() )
                .then(response => this.fetchClients() );
    }

    fetchClients() {
        let ClientPromise = Get('/admin/clients');

        ClientPromise.promise
			.then(response => {
				this.setState({
					clients: response.data,
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

		this.subscribedPromises.push(ClientPromise);
		return ClientPromise.promise;
    }

    fetchCountries() {
        let CountryPromise = Get('/admin/countries');

        CountryPromise.promise
            .then(response => {
                this.setState({
                    countries: response.data,
                });
                console.log('data fetched');
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    error: error
                });
            });

        this.subscribedPromises.push(CountryPromise);
        return CountryPromise.promise;
    }

    fetchClientCategories() {
        let CategoryPromise = Get('/admin/client-categories');

        CategoryPromise.promise
            .then(response => {
                this.setState({
                    categories: response.data,
                });
                console.log('data fetched');
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    error: error
                });
            });

        this.subscribedPromises.push(CategoryPromise);
        return CategoryPromise.promise;
    }

    _handleClientUpdated() {
        this.setState({ isLoading: true });
        this.fetchClients();
    }

    

    render() {
        if (this.state.isLoading) return <Loader />

        if (!this.state.loading) {
            return (
                <Table 
                    categories={this.state.categories}
                    countries={this.state.countries}
                    clients={this.state.clients}
                    onClientUpdated={this.handleClientUpdated}
                />
            );
        }
        
            
    }
}

export default Clientlist;