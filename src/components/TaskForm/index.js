import React from 'react'
import {withStyles} from '@material-ui/styles'
import styles from './styles'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

const TaskForm = ({classes, open, onClose}) => {
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add Task</DialogTitle>
			<DialogContent>
				<TextField
					label="Name"
					className={classes.textField}
				/>
				<TextField
					label="Multiline"
					multiline
					rowsMax="4"
					className={classes.textField}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">Cancel</Button>
				<Button onClick={onClose} color="primary">OK</Button>
			</DialogActions>
		</Dialog>
	)
}

export default withStyles(styles)(TaskForm)