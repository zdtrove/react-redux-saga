import React from 'react'
import { withStyles } from '@material-ui/core'
import { Grid, Card, CardContent, CardActions, Typography, Fab, Icon } from '@material-ui/core'
import styles from './styles'

const TaskItem = ({classes, task, status }) => {
	const { id, title, description } = task
	return (
		<Card key={id} className={classes.card}>
			<CardContent>
				<Grid container justify="space-between">
					<Grid item md={8}>
						<Typography component="h2">{title}</Typography>
					</Grid>
					<Grid item md={4}>
						{status.label}
					</Grid>
					<p>{description}</p>
				</Grid>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Fab color="primary" aria-label="Edit" className={classes.fab} size="small">
					<Icon fontSize="small">edit_icon</Icon>
				</Fab>
				<Fab color="primary" aria-label="Edit" className={classes.fab} size="small">
					<Icon fontSize="small">delete</Icon>
				</Fab>
			</CardActions>
		</Card>
	)
}

export default withStyles(styles)(TaskItem)