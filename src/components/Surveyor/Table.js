import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import TipTool from './Utils/TipTool';
import SurveyorForm from './SurveyorForm';

class Table extends Component {
	constructor(props) {
		super(props);

		this.state ={
			surveyors: this.props.surveyors
		}

        this.handleSurveyorUpdate = this._handleSurveyorUpdate.bind(this);
	}

    _handleSurveyorUpdate () {
        this.props.onSurveyorUpdated();
    }

	componentDidMount() {
        this.drawTable();
    }

	drawTable () {
        $(this.refs.main).DataTable({
            dom: "<'row'<'col-md-3 pull-left'l><'col-md-4 pull-right'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
            data: this.state.surveyors,
            ordering: true,
            paging: true,
            stateSave: true,
            columns: [
                {
                    title: '#',
                    width: 20,
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    title: 'Name',
                    data: 'name',
                    width: 120,
                    render: function(data, type, row) {
                        return '<a href="/surveyors/'+row.id+'">'+data+'</a>';
                    }
                },
                {
                    title: 'National ID',
                    data: 'national_id',
                    width: 90
                },
                {
                    title: 'Phone',
                    data: 'phone_number',
                    width: 90
                },
                {
                    title: 'Status',
                    data: 'status',
                    width: 50,
                    render: function( data, type, full) {
                        return data === 1 ? 
                            '<span class="label label-success">'+data+'</span>' :
                            '<span class="label label-warning">'+data+'</span>'
                    }
                },
                {
                    title: 'Roads',
                    data: 'roads',
                    width: 150,
                    createdCell: ((td, cellData, rowData, row, col) => {
                        ReactDOM.render(
                            <TipTool roads={cellData} />, td)
                    })
                },
                {
                    title: 'Actions',
                    data: 'id',
                    width: 30,
                    orderable: false,
                    createdCell: ((td, cellData, rowData, row, col) => {
                        ReactDOM.render(
                            <SurveyorForm surveyor={rowData} onSurveyorUpdated={this.handleSurveyorUpdate} action="edit" />, td)
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
                <table id="table" className="table table-striped table-hover" ref="main"></table>
            </div>
		);
	}
}

export default Table;