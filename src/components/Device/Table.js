import React, { Component } from 'react';
import $ from 'jquery';
import { toDateString } from '../../utilities/helpers';


class Table extends Component {
	constructor(props) {
		super(props);

		this.state ={
			devices: this.props.devices,
		}
	}

	componentDidMount() {
        this.drawTable();
    }

	drawTable () {
        $(this.refs.main).DataTable({
                dom: "<'row'<'col-md-3 pull-left'l><'col-md-4 pull-right'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
                data: this.state.devices,
                ordering: true,
                paging: true,
                stateSave: true,
                columns: [
                    {
                        title: '#',
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        title: 'Details',
                        data: 'details',
                        render: function(data, type, row) {
                            return '<a href="/devices/'+row.id+'">'+data+'</a>';
                        },
                    },
                    {
                        title: 'Imei Number',
                        data: 'imei_number'
                    },
                    {
                        title: 'Status',
                        data: 'status',
                        render: function( data, type, full) {
                            return data === 1 ? 
                                '<span class="label label-success">'+data+'</span>' :
                                '<span class="label label-warning">'+data+'</span>'
                        }
                    },
                    {
                        title: 'Created At',
                        data: 'created_at',
                        render: function (data, type, full) {
                             return toDateString(data);
                        }
                    },
                    {
                        title: 'Actions',
                        data: 'id',
                        orderable: false,
                        render: function(data, type, row) {
                            return '<a href="/devices/'+row.id+'/edit">Edit</a>';
                        },
                    }
                ],
                pageLength: 25
            });
    }

	componentWillUnmount() {
        $('#table').DataTable().destroy(true);
    }

	render () {
		return (
			<div>
                <table 
                    id="table" 
                    className="table table-striped table-hover" 
                    ref="main"
                >
                </table>
                
            </div>
		);
	}
}

export default Table;