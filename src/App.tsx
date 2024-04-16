import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-description content-block">
        <div className="section">
          <h3>Info</h3>
          <p>This is a sample app from <a href="https://proxify.io/articles/suggestions-for-reactjs-code-test-assignments">This website</a> that displays Star Wars characters along with their info.</p>
        </div>

        <div className="section">
          <h3>Assignment Description</h3>
          <p>Using a public API, display a list of all Star Wars characters using the endpoint “/people”. The API has paging, so the developer must also implement pagination. Also, a simple loader for fetching/refetching data as well as handling the error state (i.e., if the API server is down). This is how it would read:</p>
          <p>For every user, we’d like to display a card with the name of each character along with a random picture for each character (see Picsum photos for random picture inspiration). Each character card should be colored based on their species and have some kind of animation when the user hovers over the card. When we click on a character’s card, more information should appear in a modal about the character.</p>
          <p>In the character details modal, we’d like to display information about the person: name as the header of the modal, height displayed in meters, mass in kg, date person was added to the API (in dd-MM-yyyy format), number of films the person appears in and their birth year. We should also fetch information about the person’s homeworld and display its name, terrain, climate, and amount of residents.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
