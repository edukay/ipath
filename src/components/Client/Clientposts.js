import React, { Component } from 'react';
import { Panel, Button, MenuItem, DropdownButton, ButtonToolbar } from 'react-bootstrap';
import { Get } from '../../utilities/Api';
import PostsTable from './PostsTable';


class Clientposts extends Component {
	constructor(props) {
		super(props);
        this.subscribedPromises = [];

		this.state ={
            clientId: this.props.clientId,
			posts: [],
            isLoading: false,
            postsFetched: false
		}

        this.fetchData = this._fetchData.bind(this);
	}

	_fetchData() {
        this.setState({ isLoading: true })
        this.fetchClientPosts();
    }

    fetchClientPosts() {
        let url = '/admin/posts?clientId='+this.state.clientId;
        let PostsPromise = Get( url );

        PostsPromise.promise
            .then(response => {
                this.setState({
                    posts: response.data,
                    isLoading: false,
                    postsFetched: true,
                    error: null
                });
                console.log('data fetched');
            })
            .catch(error => {
                this.setState({
                    error: error,
                    isLoading: false
                });
            });

        this.subscribedPromises.push(PostsPromise);
        return PostsPromise.promise;
    }


	render () {
        const { isLoading, postsFetched } = this.state;

        const button = isLoading ?
                        ( <Button className="pull-right"> <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> Fetching </Button> ) : 
                        ( <Button className="pull-right" onClick={this.fetchData}> Fetch Posts </Button> );

        const posts = (this.state.posts.length > 0 && !isLoading) ? 
                      ( <PostsTable posts={this.state.posts} /> ) : ( '' )

        const noPosts = ( postsFetched && !isLoading && this.state.posts.length === 0 ) ?
                        ( <p><code>0 posts associatted with this client</code></p> ) : ( '' );

        const filter = ( this.state.posts.length > 0 && !isLoading) ?
        (
            <ButtonToolbar>
                <DropdownButton title="Filter" id="dropdown-size-medium">
                    <MenuItem eventKey="1">Action</MenuItem>
                    <MenuItem eventKey="2">Another action</MenuItem>
                    <MenuItem eventKey="3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4">Separated link</MenuItem>
                </DropdownButton>
            </ButtonToolbar>
        ) : ( '' );

		return (
			<div>

                <Panel className="mt-sm">
                    <Panel.Heading className="clearfix">
                        {button} {filter}
                    </Panel.Heading> 
                    <Panel.Body>
                        {noPosts}
                        {posts}
                    </Panel.Body>
                </Panel>

            </div>
		);
	}
}

export default Clientposts;
