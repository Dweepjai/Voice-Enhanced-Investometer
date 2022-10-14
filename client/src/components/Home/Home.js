import React, { useRef, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';

import Details from '../Details/Details';
import Main from '../Main/Main';
import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';

const Home = () => {
	const classes = useStyles();
	const { speechState } = useSpeechContext();
	const main = useRef(null);

	const executeScroll = () => main.current.scrollIntoView();

	useEffect(
		() => {
			if (speechState === SpeechState.Recording) {
				executeScroll();
			}
		},
		[ speechState ]
	);

	return (
		<div>
			<Grid
				className={classes.grid}
				container
				spacing={0}
				alignItems='center'
				justify='center'
				style={{ height: '100vh' }}
			>
				<Grid item xs={12} sm={4} className={classes.mobile}>
					<Details title='Equity' />
				</Grid>
				<Grid ref={main} item xs={12} sm={3} className={classes.main}>
					<Main />
				</Grid>
				<Grid item xs={12} sm={4} className={classes.desktop}>
					<Details title='Equity' />
				</Grid>
				<Grid item xs={12} sm={4} className={classes.last}>
					<Details title='Crypto' />
				</Grid>
			</Grid>
			<PushToTalkButtonContainer>
				<PushToTalkButton captureKey='' />
			</PushToTalkButtonContainer>
		</div>
	);
};

export default Home;
