import React, { Component } from 'react';
import axios from 'axios';

const APIKEY = process.env.REACT_APP_API_KEY; // Your API Key goes here, we should put this in .env

// Searchform is in charge of the actual call to the API, 
// It should have a controlled input for searching (what are the 3 things we need to make a controlled input?)
// It will recieve 2 function props, one to pass the current search term to App
// And one to pass the current search results to the App

// This component should have the structure:
// <form>
// 	<label></label>
//	<input type="search"/>
// </form>

class SearchForm extends Component {

	constructor() {
		super();

		this.state = {
			searchInput: ''
		};
	}

	async getSearchResults(query) {

		try {
			// Make an Ajax call with Axios here
			const results = await axios.get('https://www.rijksmuseum.nl/api/en/collection', {
				params: {
					imgonly: true,
					ps: 20,
					q: query,
					key: APIKEY
				}
			});

			const art = results.data.artObjects;
			console.log(results);

			this.props.updateArt(art);
			this.props.updateCurrentSearch(this.state.searchInput);

			// Reset our search form
			this.setState({
				searchInput: ''
			});

		} catch (error) {
			console.log(error.message);
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.getSearchResults(this.state.searchInput);
	}

	handleChange = (event) => {
		this.setState({
			searchInput: event.target.value
		});
	}

	render() {
		return (
			<form onSubmit={ (event) => this.handleSubmit(event) }>
				<label htmlFor="search">Find some art</label>
				<input 
					id="search" 
					name="search" 
					type="search"
					value={ this.state.searchInput }
					onChange={ (event) => this.handleChange(event) }
				/>
			</form>
		);
	}
}

export default SearchForm;