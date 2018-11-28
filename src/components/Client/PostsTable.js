import React, { Component } from 'react';
import $ from 'jquery';
import { toDateString } from '../../utilities/helpers';
import ReactDOM from 'react-dom';
import PostPreview from './PostPreview';
import { Panel, ButtonToolbar, Dropdown, Glyphicon } from 'react-bootstrap';

class PostsTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: this.props.posts
		}
	}

	componentDidMount () {
		this.renderTable();
	}

	renderTable () {
		const data = this.state.posts;
        var $self = this;
        $(this.refs.main)
        .on('draw.dt', function () {
            var table = $(this).DataTable();

            // Determine the visible columns and update the dropdown column.
            var columns = table.columns().visible().join(',').split(',');
            // columns.splice(-1, 1);

            // columns.forEach(function(status, col) {
            //     if (status === 'true') {
            //         $('[data-column="'+col+'"]')[0].checked = true;
            //     } else if (status === 'false') {
            //         $('[data-column="'+col+'"]')[0].checked = false;
            //     }
            // })
        })
        .DataTable({
            dom: "<'row'<'col-md-3 pull-left'l><'col-md-4 pull-right'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
            data: data,
            ordering: true,
            paging: true,
            stateSave: true,
            scrollX: true,
            columns: [
                {
                    title: '#',
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    title: 'Serial No',
                    data: 'serial_no',
                    width: 80
                },
                {
                    title: 'Advert Type',
                    data: 'advert_type',
                    width: 120
                },
                {
                    title: 'Campaign Name',
                    data: 'campaign_name',
                    width: 300
                },
                {
                    title: 'County',
                    data: 'county_name',
                    width: 110
                },
                {
                    title: 'Road',
                    data: 'road_name',
                    width: 180
                },
                {
                    title: 'Condition',
                    data: 'faded',
                    width: 220,
                    render: function (data, type, row) {
                        let faded = row.faded, destroyed = row.destroyed;
                        let f1 = faded === 0 ? 'Not Faded' : 'Faded'; 
                        let f2 = destroyed === 0 ? 'Not Destroyed' : 'Destoyed'; 
                        return '<span class="badge">'+f1+'</span>&nbsp;<span class="badge">'+f2+'</span>';
                    }
                },
                {
                    title: 'Position',
                    data: 'position',
                    width: 120
                },
                {
                    title: 'Created At',
                    data: 'created_at',
                    width: 120,
                    render: function (data, type, full) {
                         return toDateString(data);
                    }
                },
                {
                    title: 'Actions',
                    data: 'id',
                    orderable: false,
                    createdCell: ((td, cellData, rowData, row, col) => {
                        ReactDOM.render(
                            <PostPreview 
                                post={rowData} 
                            />, td)
                    })
                }
            ],
            pageLength: 10
        });
	}

	componentWillUnmount() {
        $('#table').DataTable().destroy(true);
    }

    shouldComponentUpdate() {
        return false;
    }

	render () {
        const filter = ( this.state.posts.length > 0 ) ?
        (
            <ButtonToolbar className="pull-right pb-sm">
                <Dropdown id="dropdown-custom-1">
                    <Dropdown.Toggle>
                        <Glyphicon glyph="filter" /> 
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="0" type="checkbox"/>&nbsp;Index</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="1" type="checkbox"/>&nbsp;Serial No</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="2" type="checkbox"/>&nbsp;Advert Type</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="3" type="checkbox"/>&nbsp;Campaign Name</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="4" type="checkbox"/>&nbsp;County</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="5" type="checkbox"/>&nbsp;Road</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="6" type="checkbox"/>&nbsp;Condition</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="7" type="checkbox"/>&nbsp;Position</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="8" type="checkbox"/>&nbsp;Created At</a></li>
                        <li><a href="#"><input onClick={this.handleColumnChange} data-column="9" type="checkbox"/>&nbsp;Actions</a></li>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonToolbar>
        ) : ( '' );

		return (
			<div>
                {filter}

				<table id="table" className="table table-striped table-hover" ref="main"></table>
			</div>	
		);	
	}
}

export default PostsTable;