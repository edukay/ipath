import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Get } from '../../../utilities/Api';
import Loader from '../../Main/Loader/Loader';

class Postlist extends Component {
    constructor(props) {
        super(props);
        this.subscribedPromises = [];

        this.state = {
            isLoading: true,
            posts: []
        };
    }

    componentDidMount () {
        this.fetchPosts();
    }

    fetchPosts () {
        let PostPromise = Get('/admin/posts');

        PostPromise.promise
			.then(response => {
				this.setState({
					posts: response.data,
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

		this.subscribedPromises.push(PostPromise);
		return PostPromise.promise;
    }

    render () {
        if (this.state.isLoading) return <Loader />;

        return (
            this.state.posts.map((post, index) => {
                return (
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Client Posts</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Post {index}</Panel.Body>
                    </Panel>
                );
            })
        );
    }
}

export default Postlist;