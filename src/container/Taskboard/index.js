import React, { useState, useEffect } from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/styles'
import { Button, Grid } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { STATUSES } from '../../constants'
import TaskList from './../../components/TaskList'
import TaskForm from './../../components/TaskForm'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as taskActions from '../../redux/task/taskActions'
import { bindActionCreators } from 'redux'
import SearchBox from './../../components/SearchBox'

const TaskBoard = props => {
	const { classes, taskActionsProps, listTask } = props
	// useEffect(() => {
	// 	const { fetchListTask } = taskActionsProps
	// 	fetchListTask()
	// }, [taskActionsProps])
	
	const [open, setOpen] = useState(false)

	const renderBoard = () => {
		let xhtml = null
		xhtml = (
			<Grid container spacing={2}>
				{STATUSES.map(status => {
					const taskFiltered = listTask.filter(task => task.status === status.value)
					return <TaskList key={status.value} status={status} task={taskFiltered}/>
				})}
			</Grid>
		)
		return xhtml;
	}
	
	const renderForm = () => {
		let xhtml = null
		xhtml = <TaskForm open={open} onClose={handleClose}/>

		return xhtml
	}

	const handleClose = () => {
		setOpen(false)
	}

	const openForm = () => {
		setOpen(true)
	}

	const loadData = () => {
		const { taskActionsProps } = props
		const { fetchListTask } = taskActionsProps
		fetchListTask()
	}

	const renderSearchBox = () => {
		let xhtml = null
		xhtml = <SearchBox />
		return xhtml
	}

	return (
		<div className={classes.taskboard}>
			<Button onClick={loadData} variant="contained" color="primary" className={classes.button}>
				Load data
			</Button>
			<Button onClick={openForm} variant="contained" color="primary" className={classes.button}>
				<AddIcon /> Add task
			</Button>
			{renderSearchBox()}
			{renderBoard()}
			{renderForm()}
		</div>
	)
}

TaskBoard.propTypes = {
	classes: PropTypes.object,
	taskActionsProps: PropTypes.shape({
		fetchListTask: PropTypes.func
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
		taskActionsProps: bindActionCreators(taskActions, dispatch)
	}
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard))