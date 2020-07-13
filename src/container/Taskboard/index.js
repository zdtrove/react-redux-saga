import React, { useEffect } from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/styles'
import { Button, Grid, Box } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { STATUSES } from '../../constants'
import TaskList from './../../components/TaskList'
import TaskForm from './../TaskForm'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as taskActions from '../../redux/task/taskActions'
import * as modalActions from '../../redux/modal/modalActions'
import { bindActionCreators } from 'redux'
import SearchBox from './../../components/SearchBox'

const TaskBoard = ({ classes, listTask, taskActionsProps, modalActionsProps }) => {
	useEffect(() => {
		const { fetchListTask } = taskActionsProps
		fetchListTask()
	}, [taskActionsProps])

	const openForm = () => {
		const { showModal, changeModalTitle, changeModalContent } = modalActionsProps
		const { setTaskEditing } = taskActionsProps
		showModal()
		changeModalTitle('Add new task')
		changeModalContent(<TaskForm />)
		setTaskEditing(null)
	}

	const loadData = () => {
		const { fetchListTask } = taskActionsProps
		fetchListTask()
	}

	const handleFilter = e => {
		const { value } = e.target
		const { filterTask } = taskActionsProps
		filterTask(value)
	}

	const handleEditTask = task => {
		const { setTaskEditing } = taskActionsProps
		setTaskEditing(task)
		const { showModal, changeModalTitle, changeModalContent } = modalActionsProps
		showModal()
		changeModalTitle('Edit task')
		changeModalContent(<TaskForm />)
	}

	const showModalDeleteTask = task => {
		const { setTaskEditing } = taskActionsProps
		setTaskEditing(task)
		const { showModal, hideModal, changeModalTitle, changeModalContent } = modalActionsProps
		showModal()
		changeModalTitle('Delete task')
		changeModalContent(
			<div className={classes.modalDelete}>
				<div className={classes.modalConfirmText}>
					Are you sure to delete this <span className={classes.modalConfirmTextBold}>{task.title}</span>?
				</div>
				<Box display="flex" flexDirection="row-reverse" mt={2}>
					<Box ml={1}>
						<Button onClick={() => handleDeleteTask(task)} variant="contained" color="primary">Delete</Button>
					</Box>
					<Box>
						<Button onClick={hideModal} variant="contained">Cancel</Button>
					</Box>
				</Box>
			</div>
		)
	}

	const handleDeleteTask = task => {
		const { id } = task
		const { deleteTask } = taskActionsProps
		deleteTask(id)
	}

	const renderBoard = () => {
		let xhtml = null
		xhtml = (
			<Grid container spacing={2}>
				{STATUSES.map(status => {
					const taskFiltered = listTask.filter(task => task.status === status.value)
					return <TaskList 
						onClickDelete={showModalDeleteTask}
						onClickEdit={handleEditTask} 
						key={status.value} 
						status={status} 
						task={taskFiltered}
					/>
				})}
			</Grid>
		)
		return xhtml;
	}

	const renderSearchBox = () => {
		let xhtml = null
		xhtml = <SearchBox handleChange={handleFilter} />
		return xhtml
	}

	return (
		<div className={classes.taskboard}>
			<Button style={{ marginRight: '10px' }} onClick={loadData} variant="contained" color="primary" className={classes.button}>
				Load data
			</Button>
			<Button onClick={openForm} variant="contained" color="primary" className={classes.button}>
				<AddIcon /> Add task
			</Button>
			{renderSearchBox()}
			{renderBoard()}
		</div>
	)
}

TaskBoard.propTypes = {
	classes: PropTypes.object,
	taskActionsProps: PropTypes.shape({
		fetchListTask: PropTypes.func,
		filterTask: PropTypes.func,
		setTaskEditing: PropTypes.func,
		deleteTask: PropTypes.func
	}),
	modalActionsProps: PropTypes.shape({
		showModal: PropTypes.func,
		hideModel: PropTypes.func,
		changeModalTitle: PropTypes.func,
		changeModalContent: PropTypes.func
	}),
	listTask: PropTypes.array
}

const mapStateToProps = state => {
	return {
		listTask: state.task.listTask
	}
}
const mapDispatchToProps = dispatch => {
	return {
		taskActionsProps: bindActionCreators(taskActions, dispatch),
		modalActionsProps: bindActionCreators(modalActions, dispatch)
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard))