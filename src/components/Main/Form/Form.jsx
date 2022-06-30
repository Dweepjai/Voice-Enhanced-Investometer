import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { InvestmentTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';

import formatDate from '../../../utils/formatDate';
import useStyles from './styles';
import { equityCategories, cryptoCategories } from '../../../constants/categories';
import Snackbar from '../../Snackbar/Snackbar';

const initialState = {
	amount: '',
	category: '',
	type: 'Equity',
	date: formatDate(new Date()),
};

const Form = () => {
	const classes = useStyles();
	const [ formData, setFormData ] = useState(initialState);
	const { addTransaction } = useContext(InvestmentTrackerContext);
	const { segment } = useSpeechContext();
	const [ open, setOpen ] = useState(false);

	const createTransaction = () => {
		if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
		const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() };

		setOpen(true);
		addTransaction(transaction);
		setFormData(initialState);
	};

	useEffect(
		() => {
			if (segment) {
				if (segment.intent.intent === 'add_crypto') {
					setFormData({ ...formData, type: 'Crypto' });
				} else if (segment.intent.intent === 'add_equity') {
					setFormData({ ...formData, type: 'Equity' });
				} else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
					createTransaction();
					return;
				} else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
					setFormData(initialState);
					return;
				}

				segment.entities.forEach((s) => {

					switch (s.type) {
						case 'amount':
							setFormData({ ...formData, amount: s.value });
							break;
						case 'category':
							const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
							if (equityCategories.map((iC) => iC.type).includes(category)) {
								setFormData({ ...formData, type: 'Equity', category });
							} else if (cryptoCategories.map((iC) => iC.type).includes(category)) {
								setFormData({ ...formData, type: 'Crypto', category });
							}
							break;
						case 'date':
							setFormData({ ...formData, date: s.value });
							break;
						default:
							break;
					}
				});

				if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
					createTransaction();
				}
			}
		},
		[ segment ]
	);

	const selectedCategories = formData.type === 'Equity' ? equityCategories : cryptoCategories;

	return (
		<Grid container spacing={2}>
			<Snackbar open={open} setOpen={setOpen} />
			<Grid item xs={12}>
				<Typography align='center' variant='subtitle2' gutterBottom>
					
					{segment && <div className='segment'>{segment.words.map((w) => w.value).join(' ')}</div>}
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Type</InputLabel>
					<Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
						<MenuItem value='Equity'>Equity</MenuItem>
						<MenuItem value='Crypto'>Crypto</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<FormControl fullWidth>
					<InputLabel>Category</InputLabel>
					<Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
						{selectedCategories.map((c) => (
							<MenuItem key={c.type} value={c.type}>
								{c.type}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={6}>
				<TextField
					type='number'
					label='Amount'
					fullWidth
					value={formData.amount}
					onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					type='date'
					label='Date'
					fullWidth
					value={formData.date}
					onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
				/>
			</Grid>
			<Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction}>
				Create
			</Button>
		</Grid>
	);
};

export default Form;
