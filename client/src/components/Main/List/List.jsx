import React, { useContext } from 'react';
import {
	List as MUIList,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	ListItemSecondaryAction,
	IconButton,
	Slide
} from '@material-ui/core';
import { Delete, Money } from '@material-ui/icons';
import axios from 'axios';

import { InvestmentTrackerContext } from '../../../context/context';
import useStyles from './styles';

const List = () => {
	const classes = useStyles();
	const {user, dispatch} = useContext(InvestmentTrackerContext);
	const transactions = user.investments;
	const deleteTransaction = async (id) => {
		const email = user.email;
		try {
			dispatch({ type: "UPDATE_START" });
			const res = await axios.post("delete/", {
				email,
				id,
			});
			dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
		} catch (err) {
			dispatch({ type: "UPDATE_FAILURE", payload: user });
			console.log(err);
		}
	}
	return (
		<MUIList dense={false} className={classes.list}>
			{transactions.slice(0).reverse().map((transaction) => (
				<Slide direction="down" in mountOnEnter unmountOnExit key={transaction._id}>
					<ListItem>
						<ListItemAvatar>
							<Avatar
								className={transaction.type === 'Equity' ? classes.avatarEquity : classes.avatarCrypto}
							>
								<Money />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={transaction.category}
							secondary={`₹${transaction.amount} - ${transaction.date}`}
						/>
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => deleteTransaction(transaction._id)}
							>
								<Delete />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</Slide>
			))}
		</MUIList>
	);
}

export default List;
