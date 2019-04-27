import React, { Component } from 'react';
import './App.scss';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import DisplayArea from './components/DisplayArea';

// Our app should have state for the current search term and results, so it can pass these things to the display area

class App extends Component {

  constructor() {
    super();

    this.state = {
      currentSearch: '',
      art: []
    };
  }

  updateCurrentSearch = (currentSearch) => {
    this.setState({
      currentSearch
    });
  }

  updateArt = (art) => {
    this.setState({
      art: art
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <SearchForm
            updateCurrentSearch={ this.updateCurrentSearch }
            updateArt={ this.updateArt }
          />
          <DisplayArea 
            art={ this.state.art }
            currentSearch={ this.state.currentSearch }
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
