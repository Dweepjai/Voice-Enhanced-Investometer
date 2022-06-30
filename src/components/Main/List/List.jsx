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

import { InvestmentTrackerContext } from '../../../context/context';
import useStyles from './styles';

function List() {
	const classes = useStyles();
	const { deleteTransaction, transactions } = useContext(InvestmentTrackerContext);

	return (
		<MUIList dense={false} className={classes.list}>
			{transactions.map((transaction) => (
				<Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
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
								onClick={() => deleteTransaction(transaction.id)}
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
