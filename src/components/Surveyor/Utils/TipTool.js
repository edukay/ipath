import React, { Component } from 'react';
import { Tooltip, OverlayTrigger} from 'react-bootstrap';
import './utils.css';

class TipTool extends Component {
	constructor(props) {
		super(props);

		this.state = {
			roads: this.props.roads,
			roadNames: '',
			roadsArray: []
		}
	}

	componentDidMount () {
		this.formatRoads();
	}

	formatRoads () {
		const { roads } = this.state
		var roadNames = [];

		roads.forEach(function(road) {
            roadNames.push(road.name);
        })

		this.setState({ 
			roadsArray: roadNames,
			roadNames: roadNames.join(', ') 
		});
	}

	render () {
		const { roadsArray } = this.state

		const roads = roadsArray.length > 1 ? ( roadsArray[0] + '...' ) : ( roadsArray.length === 1 ? roadsArray[0] : '-' )

		const tooltip = ( 	<Tooltip id="tooltip">
						    		{
						    			this.state.roadsArray.map((road, index) => {
						    				return ( <span key={index}>{road}<br /></span> )
						    			})	
						    		}
						  	</Tooltip>
						);

		
		return (
			<span>
				{roads}
				<OverlayTrigger placement="top" overlay={tooltip}>
					<span className="badge pull-right">{ roadsArray.length }</span>
			    </OverlayTrigger>
			</span>
		);
	}
}

export default TipTool;