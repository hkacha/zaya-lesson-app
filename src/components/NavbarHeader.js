import React from 'react';

import logo from '../assests/icons/logo.png';

import { Media } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class NavbarHeader extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			currentLessonActive: null
		}
	}

	// function is used to sent current lession to parent component.
	handleLesson = (e) => {
		let selectedLesson = e.target.innerText;
		this.setState({
			currentLessonActive: parseInt(selectedLesson)
		}, function(){
			this.props.handleLesson(selectedLesson);
		})
	}

	render(){
		let { currentLessonActive } = this.state;
		let { recitalTitle, instrumentTitle, setLessons } = this.props;
		
		let lessons_array = setLessons.map((item, index) => {
			return(
				<li className={`list-inline-item ${index+1 === currentLessonActive ? 'active' : ''} ${item.lesson_status} `} key={index} onClick={(e) => this.handleLesson(e)}>{index+1}</li>
			)
		})

		return(
			<Media className="px-0 pt-4 pb-3">
				<Media left href="#">
					<img src={logo} alt="" />
				</Media>
				<Media body>
					<h1 className="text-center">{recitalTitle}</h1>
					<ul className="list-inline text-center">
						Lessons
						{lessons_array}
					</ul>
				</Media>
				<Media right>
					<h3>{instrumentTitle}</h3>
					<button className="btn btn-danger btn-sm mt-2">Exit Lesson</button>
				</Media>
			</Media>
		)
	}
}