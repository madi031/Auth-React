'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };
	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyAw9Gsow0-FLDssJG9m6XhWFX1FwSvn-Vk',
			authDomain: 'authentication-2a6b9.firebaseapp.com',
			databaseURL: 'https://authentication-2a6b9.firebaseio.com',
			projectId: 'authentication-2a6b9',
			storageBucket: 'authentication-2a6b9.appspot.com',
			messagingSenderId: '518054957845'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()}>
							Log Out
						</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner />;
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
