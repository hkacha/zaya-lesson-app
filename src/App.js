import React from 'react';
import './assests/css/style.css';

import Main from './components/Main.js';
import Sidebar from './components/Sidebar.js';
import NavbarHeader from './components/NavbarHeader.js';

import data from './assests/data/zaya-docs.json';

let data_array = []

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			recitalTitle: data.recitalTitle,
			instrumentTitle: data.instrumentTitle,
			lessonDetails: data.lessonDetails,
			lessonDetailsLength: data.lessonDetails.length,
			selectedLessonObj: null,
			objectiveVideos: null,
			objectiveClassflow: '',
			objectiveData: [],
			setLessons: []
		}
	}

	// function is used to display lessons on header with respective states.
	handleLesson = (data) => {
		let selectedLesson = data;
		let getLesson = this.state.lessonDetails.filter(item => {
			return item.lessonTitle.split(' ')[1] === selectedLesson;
		})

		let data_dict = {}
		let data_sub_array = []

		getLesson[0].objectiveDetails.map((item, index) => {
			let data_sub_dict = {}
			data_sub_dict['item_status'] = '';
			data_sub_dict['item_id'] = item.id;
			data_sub_dict['item_lesson'] = item.lesson;
			data_sub_array.push(data_sub_dict)
		})

		data_dict['item_title'] = getLesson[0].lessonTitle;
		data_dict['item_cards'] = data_sub_array;
		if(data_array.some(e => e.item_title === getLesson[0].lessonTitle)){
			console.log("pass ")
		} else {
			data_array.push(data_dict)
		}

		this.setState({
			selectedLessonObj: getLesson[0],
			objectiveData: data_array,
			objectiveVideos: null
		})
	}

	// function is used to set state of lessons based on objective
	handleObjectiveData = (data) => {
		this.setState({
			objectiveData: data
		})	
	}

	// function is used to set objectives details
	handleObjective = (data) => {
		let objective_id = data;
		let getobjectivedetail = this.state.selectedLessonObj.objectiveDetails.filter(item => {
			return item.id === objective_id
		});
		
		this.setState({
			objectiveVideos: getobjectivedetail[0].objectiveVideosDetails,
			objectiveClassflow: getobjectivedetail[0].classFlow
		})
	}

	setLesson = (data) => {
		let lesson_array = []
		data.map((item, index) => {
			let lesson_dict = {}
			lesson_dict['lesson_id'] = item.id;
			lesson_dict['lesson_status'] = '';
			lesson_array.push(lesson_dict);
		})
		this.setState({
			setLessons: lesson_array
		})
	}

	componentDidMount(){
		this.setLesson(this.state.lessonDetails)
	}

	render(){
		let { recitalTitle, instrumentTitle, selectedLessonObj, objectiveVideos, objectiveClassflow, objectiveData, setLessons } = this.state;
		return(
			<div className="container lessons">
				<NavbarHeader
					recitalTitle={recitalTitle}
					instrumentTitle={instrumentTitle}
					setLessons={setLessons}
					handleLesson={this.handleLesson}
					objectiveData={objectiveData}
				/>
				<div className="lesson-section">
					<div className="row">
						<div className="col-lg-2">
							<Sidebar
								lessonObj={selectedLessonObj}
								handleObjective={this.handleObjective}
								objectiveData={objectiveData}
								handleObjectiveData={this.handleObjectiveData}
								setLessons={setLessons}
							/>
						</div>
				
						<div className="col-lg-10">
							<div className="main">
								<Main
									objectiveVideos={objectiveVideos}
									objectiveClassflow={objectiveClassflow}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}