import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { Get } from '../../utilities/Api';
import PostsTable from '../Client/PostsTable';


class SurveyorPosts extends Component {
	constructor(props) {
		super(props);
        this.subscribedPromises = [];

		this.state ={
            surveyorId: this.props.id,
			posts: [],
            isLoading: false,
            postsFetched: false
		}

        this.fetchData = this._fetchData.bind(this);
	}

	_fetchData() {
        this.setState({ isLoading: true })
        this.fetchSurveyorPosts();
    }

    fetchSurveyorPosts() {
        let url = '/admin/posts?surveyorId='+this.state.surveyorId;
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
                        ( <Button bsStyle="danger" className="pull-right" onClick={this.fetchData}> Fetch Posts <i className="fa fa-cloud-download" aria-hidden="true"></i> </Button> );

        const posts = (this.state.posts.length > 0 && !isLoading) ? 
                      ( <PostsTable posts={this.state.posts} /> ) : ( '' )

        const noPosts = ( postsFetched && !isLoading && this.state.posts.length === 0 ) ?
                        ( <p><code>0 posts associatted with this surveyor</code></p> ) : ( '' );

        

		return (
			<div>

                <Panel className="mt-sm">
                    <Panel.Heading className="clearfix">
                        {button}
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

export default SurveyorPosts;
