import React from 'react';

import check from '../assests/icons/check.png';
import close from '../assests/icons/close.png';
import next_lesson from '../assests/icons/next-lesson.png';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Sidebar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			objective_id: null,
			lessonObj: null,
			objectiveStatusArray: [],
			setLessons: []
		}
	}

	// function is used sent current objective to parent component
	handleObjective = (e) => {
		let objective_id = e.target.dataset.id;
		this.setState({
			objective_id: objective_id
		}, function(){
			this.props.handleObjective(objective_id);
		})
	}

	// function is used to check all objectives are done or not
	checkAllDoneLesson = (data) => {
		if (data.filter(e => e.item_status === 'Done').length === data.length) {
		  return true
		} else {
			return false
		}
	}

	// function is used to set current position of objectives
	setObjectiveStatus = (e) => {
		let objective_status = e.target.dataset.status;
		let objectiveStatusArray = this.state.objectiveStatusArray;
		for (var i = 0; i < objectiveStatusArray.length; i++) {
			for(var j = 0; j < objectiveStatusArray[i].item_cards.length; j++) {
				if (objectiveStatusArray[i].item_cards[j].item_id === this.state.objective_id) {
					objectiveStatusArray[i].item_cards[j].item_status = objective_status;
				}
			}
			var checkAllDoneLesson = this.checkAllDoneLesson(objectiveStatusArray[i].item_cards)
			if(checkAllDoneLesson){
				this.state.setLessons.filter(item => {
					if(item.lesson_id === objectiveStatusArray[i].item_cards[0].item_lesson){
						item.lesson_status = "done";
					}
				})
			}
		}
		
		this.setState({
			objectiveStatusArray: this.state.objectiveStatusArray
		}, function(){
			this.props.handleObjectiveData(objectiveStatusArray)
		})
	}

	componentWillReceiveProps(nextprops) {
		let data = nextprops.lessonObj;
		let objectiveData = nextprops.objectiveData
		this.setState({
			lessonObj: data,
			objectiveStatusArray: objectiveData,
			setLessons: nextprops.setLessons
		})
	}

	render(){
		let objectives;
		let { lessonObj } = this.state;

		if(lessonObj !== null) {
			objectives = lessonObj.objectiveDetails.map((item, index) => {
				return (
					<React.Fragment key={index}>
						<li className="list-item" data-id={item.id} onClick={(e) => this.handleObjective(e)}>
							<div className={`lesson-card p-2`} data-id={item.id}>
								<h5 data-id={item.id}>{item.title} <small data-id={item.id}>({item.durationInMinutes} mins)</small></h5>
							</div>
						</li>
						<div className="objective-icons mb-2">
							<ul className="list-inline">
								<li className="list-inline-item">
									<img src={check} className="icons" alt="" data-status="Done" onClick={(e) => this.setObjectiveStatus(e)} />
								</li>
								<li className="list-inline-item">
									<img src={close} className="icons" alt="" data-status="Not Doing" onClick={(e) => this.setObjectiveStatus(e)} />
								</li>
								<li className="list-inline-item">
									<img src={next_lesson} className="icons" alt="" data-status="Next Lesson" onClick={(e) => this.setObjectiveStatus(e)}/>
								</li>
							</ul>
						</div>
					</React.Fragment>
				)
			})			
		} else {
			objectives = ""
		}

		return(
			<div className="sidebar">
				<h5 className="text-center text-bold p-1 menu">Menu</h5>
				<div className="video-links">
					<ul className="list-unstyled text-center m-0">
						<li className="list-item">Video Link 1</li>
						<li className="list-item">Video Link 2</li>
						<li className="list-item">Video Link 3</li>
					</ul>
				</div>
				<div className="lesson-tags p-3">
					<ul className="list-unstyled text-center m-0">
						{objectives}
					</ul>
				</div>
			</div>
		)
	}
}