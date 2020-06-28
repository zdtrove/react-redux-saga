import React from 'react'
import { withStyles } from '@material-ui/styles'
import { Grid, Box } from '@material-ui/core'
import styles from './styles'
import TaskItem from './../TaskItem'

const TaskList = ({status, classes, task}) => {
	return (
		<Grid item md={4} xs={12} key={status.value}>
			<Box mt={1} mb={1}>
				<div className={classes.status}>{status.label}</div>
			</Box>
			<div className={classes.wrapperListTask}>
				{task.map(task => {
					return <TaskItem key={task.id} status={status} task={task} />
				})}
			</div>
		</Grid>
	)
}

export default withStyles(styles)(TaskList)