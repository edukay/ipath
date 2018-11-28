import React, { Component } from 'react';
import Form from './Form';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { toDateString } from '../../utilities/helpers';
import { Link } from 'react-router-dom';

function reloadTableData(clients) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    table.clear();
    table.rows.add(clients);
    table.draw();
}

function updateTable(clients) {
	console.log('updating datatable');

    const table = $('.data-table-wrapper').find('table').DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldClient = this.data();
        const newClient = clients.find((client) => {
            return client.id === oldClient.id;
        });
        if (oldClient.name !== newClient.name || oldClient.active !== newClient.active) {
            dataChanged = true;
            this.data(newClient);
        }
       return true;
    });

    if (dataChanged) {
        table.draw();
    }
}

function fetchLink(row) {
    return <Link to={`/clients/${row.id}`}>{row.name}</Link>
}

class Table extends Component {
	constructor(props) {
		super(props);

		this.state ={
			countries: this.props.countries,
			categories: this.props.categories,
			clients: this.props.clients
		}

		this.handleClientUpdated = this._handleClientUpdated.bind(this);
	}

	_handleClientUpdated() {
		this.props.onClientUpdated()
	}

	componentDidMount() {
        this.drawTable();
    }

    shouldComponentUpdate(nextProps) {
    	console.log('should update');
        if (nextProps.clients.length !== this.props.clients.length) {
            reloadTableData(nextProps.clients);
        } else {
            updateTable(nextProps.clients);
        }
        return false;
    }

	drawTable () {
        $(this.refs.main).DataTable({
                dom: "<'row'<'col-md-3 pull-left'l><'col-md-4 pull-right'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
                data: this.state.clients,
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
                        title: 'Name',
                        data: 'name',
                        render: function(data, type, row) {
                            return '<a href="/clients/'+row.id+'">'+data+'</a>';
                        },
                        createdCell: ((td, cellData, rowData, row, col) => {
                            fetchLink(row);
                        })
                    },
                    {
                        title: 'Email',
                        data: 'email'
                    },
                    {
                        title: 'Status',
                        data: 'active',
                        render: function( data, type, full) {
                            return data === 1 ? 
                                '<span class="label label-success">'+data+'</span>' :
                                '<span class="label label-warning">'+data+'</span>'
                        }
                    },
                    {
                        title: 'Category',
                        data: 'category.name',
                        render: function( data, type, full) {
                            return '<span class="badge">'+data+'</span>';
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
                        orderable: false,
                        data: 'id',
                        createdCell: ((td, cellData, rowData, row, col) => {
                            ReactDOM.render(
                                <Form 
                                    client={rowData} 
                                    categories={this.state.categories} 
                                    countries={this.state.countries} 
                                    onClientUpdated={this.handleClientUpdated}
                                    action={"editing"} 
                                />, td)
                        })
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