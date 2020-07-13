import { Box, Button, Grid, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import * as modalActions from './../../redux/modal/modalActions'
import * as taskActions from './../../redux/task/taskActions'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField, Select } from 'formik-material-ui'

const TaskForm = props => {
	const { classes, modalActionsProps, taskActionsProps, taskEditing } = props
	const { hideModal } = modalActionsProps
	const handleSubmitForm = data => {
		const { addTask, updateTask } = taskActionsProps
		const { title, description, status } = data
		if (taskEditing && taskEditing.id) {
			updateTask(title, description, status)
		} else {
			addTask(title, description)
		}
	}
	const initialValues = {
		title: '',
		description: ''
	}
	const validationSchema = Yup.object({
		title: Yup.string().required('Required ccc')
	})
	const renderStatusSelection = () => {
		let xhtml = null
		if (taskEditing && taskEditing.id) {
			xhtml = (
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="status-simple">Status</InputLabel>
					<Field
						component={Select}
						name="status"
						value={taskEditing.value}
					>
						<MenuItem value={0}>Ready</MenuItem>
						<MenuItem value={1}>In Progress</MenuItem>
						<MenuItem value={2}>Completed</MenuItem>
					</Field>
				</FormControl>
			)
		}
		return xhtml
	}

	return (
		<Formik
			initialValues={taskEditing || initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmitForm}
		>
			<Form>
				<Grid container>
					<Grid item md={12} xs={12}>
						<Field
							id="title"
							className={classes.textField}
							label="Title"
							margin="normal"
							name="title"
							component={TextField}
						/>
					</Grid>
					<Grid item md={12} xs={12}>
						<Field
							id="description"
							className={classes.textField}
							label="Description"
							margin="normal"
							name="description"
							component={TextField}
						/>
					</Grid>
					<Grid item md={12} xs={12}>
						{renderStatusSelection()}
					</Grid>
					<Grid item md={12} xs={12}>
						<Box display="flex" flexDirection="row-reverse" mt={2}>
							<Box ml={1}>
								<Button variant="contained" color="primary" type="submit">Save</Button>
							</Box>
							<Button variant="contained" onClick={hideModal}>Cancel</Button>
						</Box>
					</Grid>
				</Grid>
			</Form>
		</Formik>
	)
}

TaskForm.propTypes = {
	classes: PropTypes.object,
	modalActionsProps: PropTypes.shape({
		hideModal: PropTypes.func
	}),
	taskActionsProps: PropTypes.shape({
		addTask: PropTypes.func,
		updateTask: PropTypes.func
	}),
	taskEditing: PropTypes.object
}

const mapStateToProps = state => {
	return {
		taskEditing: state.task.taskEditing
	}
}
const mapDispatchToProps = dispatch => {
	return {
		modalActionsProps: bindActionCreators(modalActions, dispatch),
		taskActionsProps: bindActionCreators(taskActions, dispatch)
	}
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
	withConnect,
	withStyles(styles)
)(TaskForm)