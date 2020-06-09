import React from 'react';

import { Card } from 'reactstrap';
import ReactPlayer from 'react-player';
import classflow from '../assests/icons/classflow.png';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			url: '',
			modal: false
		}
	}

	// function is used to see video on large section
	handleEmbedVideo = (url) => {
		this.setState({
			url: url
		})
	}

	// fuction is used to classflow modal open or close.
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		})
	}

	componentWillReceiveProps(nextprops){
		this.setState({
			url: ''
		})
	}

	render(){

		let { modal } = this.state;
		let { objectiveVideos, objectiveClassflow } = this.props;
		return(
			<React.Fragment>
				<div className="player-wrapper">
					{this.state.url ?
						<ReactPlayer url={this.state.url} playing={true} className='react-player' width="100%" height="100%" />
					: ''
					}
				</div>
				<ul className="list-unstyled classflow-activity">
					<li className="list-item mt-3">
						<Card>
							<img src={classflow} alt="" style={{'margin': '0 auto', 'width':'47px', 'height':'47px'}} />
							<span>View Activity</span>
						</Card>
					</li>
					<li className="list-item mt-3">
						<Card onClick={this.toggle}>
							<img src={classflow} alt="" style={{'margin': '0 auto', 'width':'47px', 'height':'47px'}} />
							<span>View Classflow</span>
						</Card>
						<Modal isOpen={modal} toggle={this.toggle}>
							<ModalHeader toggle={this.toggle}>Classflow</ModalHeader>
							<ModalBody>{objectiveClassflow}</ModalBody>
						</Modal>
					</li>
				</ul>
				<ul className="list-inline video-thumbnails">
					{objectiveVideos !== null ?
						<React.Fragment>
							{objectiveVideos.map((item, index) => (
								<li className="list-inline-item mr-4" key={index} >
									<div className="card-overlay" onClick={() => this.handleEmbedVideo(item.url)}></div>
									<Card>
										<ReactPlayer url={item.url} width="100%" height="100%" light={true} />
									</Card>
								</li>
							))}
						</React.Fragment>
					: ""
					}
				</ul>
			</React.Fragment>
		)
	}
}