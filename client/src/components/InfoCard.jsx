import React from 'react';

const isEquity = Math.round(Math.random());

const InfoCard = () => {
	return (
		<div style={{ textAlign: 'center', padding: '0 10%' }}>
			Try saying: <br />
			Add Investment in {isEquity ? 'Equity ' : 'Crypto '}
			for {isEquity ? '₹100 ' : '₹50 '}
			in {isEquity ? 'Reliance ' : 'Bitcoin '}
			for {isEquity ? 'Monday ' : 'Friday '}
		</div>
	);
};

export default InfoCard;
