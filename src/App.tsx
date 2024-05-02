import React from 'react';
import { useSelector } from "react-redux";
import type { RootState } from './store'
import StarsBackground from './images/bg-stars.jpeg';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import CharacterShow from './components/CharacterShow';
import './App.scss';

function App() {
  const { currentPage } = useSelector((state: RootState) => state.pages);

  return (
    <div className="App">
      <Header />

      <section className="app-description section mt-32">
          <div className="section-content app-description-content">
            <div className="box border border-primary rounded-lg py-12 section-content bg-dark-color">
              <img src={StarsBackground} alt="Stars background" className="bg-stars" />
              <div className="box-content relative mb-12 mt-16">
                <div className="text-section">
                  <h2>Info</h2>
                  <p>This is a sample app from <a href="https://proxify.io/articles/suggestions-for-reactjs-code-test-assignments">This website</a> that displays Star Wars characters along with their info.</p>
                </div>
                <div className="text-section">
                  <h4>Description</h4>
                  <p>Using a public API, display a list of all Star Wars characters using the endpoint “/people”. The API has paging, so the developer must also implement pagination. Also, a simple loader for fetching/refetching data as well as handling the error state (i.e., if the API server is down). This is how it would read:</p>
                  <p>For every user, we’d like to display a card with the name of each character along with a random picture for each character (see Picsum photos for random picture inspiration). Each character card should be colored based on their species and have some kind of animation when the user hovers over the card. When we click on a character’s card, more information should appear in a modal about the character.</p>
                  <p>In the character details modal, we’d like to display information about the person: name as the header of the modal, height displayed in meters, mass in kg, date person was added to the API (in dd-MM-yyyy format), number of films the person appears in and their birth year. We should also fetch information about the person’s homeworld and display its name, terrain, climate, and amount of residents.</p>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="main section">
          <div className="flex flex-col gap-4">
            <div className="search-bar-wrapper">
              <SearchForm />
            </div>
            <div className="character-show-wrapper">
              <CharacterShow currentPage={currentPage} />
            </div>
          </div>
      </section>
    </div>
  );
}

export default App;
