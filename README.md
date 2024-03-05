# Star Wars Character App

This project is a sample interview Assignment from [This website](https://proxify.io/articles/suggestions-for-reactjs-code-test-assignments).

## Assignment Description

Using a public API, display a list of all Star Wars characters using the endpoint “/people”. The API has paging, so the developer must also implement pagination. Also, a simple loader for fetching/refetching data as well as handling the error state (i.e., if the API server is down).
This is how it would read:

For every user, we’d like to display a card with the name of each character along with a random picture for each character (see Picsum photos for random picture inspiration). Each character card should be colored based on their species and have some kind of animation when the user hovers over the card. When we click on a character’s card, more information should appear in a modal about the character.

In the character details modal, we’d like to display information about the person: name as the header of the modal, height displayed in meters, mass in kg, date person was added to the API (in dd-MM-yyyy format), number of films the person appears in and their birth year. We should also fetch information about the person’s homeworld and display its name, terrain, climate, and amount of residents.

## Frameworks/Tools Used
- Typescript
- React
- Redux + Redux Toolkit
- Tailwind
- Sass

## Data

This is the required data held in our app's state (aka Redux store)

### API State
The state of our API calls
- Pending: The start of our API call
- Fullfilled: Request was successful. Response contains requested data.
- Rejected: Request failed. Response contains an error

### Page

Our app will have pagination based on the Star Wars API's pagination. We'll need:
- ENTRIES_PER_PAGE In the Star Wars API, this is currently 10
- total characters to display. This will be the total characters in the Star Wars API database unless search is implemented; in which case it will be the total number of search results
- Number of pages = total characters /ENTRIES_PER_PAGE
- Current Page

### Characters

A list of characters. Each character has the following data, according to the Star Wars API schema:
- name
- height
- mass
- hair_color
- skin_color
- eye_color
- birth_year
- gender
- homeworld (API requeset for homeworld)
- films []
- species []
- vehicles []
- starships []
- created
- edited
- url

Additionally:
- photo_url: retrieved from unsplash and cropped, so all character photos have equal dimensions
- We could also optionally provide our own id for each character

### Homeworlds

Each homeworld has the following data according to the Star Wars API schema:
- name
- rotation_period
- orbital_period
- diameter
- climate
- gravity
- terrain
- surface_water
- population
- residents []
- films []
- created
- edited
- url
- We could also optionally provide our own id for each character based on the API schema. E.g. https://swapi.dev/api/planets/{NUMBER} has an id of NUMBER.

## API

We need to request information from 2 APIs: 1. swapi, which contains information about Star Wars characters and 2. Unsplash, which retrieves images from the web.

### swapi

*fetchAllCharacters()* `GET https://swapi.dev/api/people/` to get the total count of Star Wars characters

*fetchCharactersByPage(n)* `GET https://swapi.dev/api/people/?page={n}` to get character info on the nth page

*fetchHomeworld(n)* `GET https://swapi.dev/api/planet/{n}` to get homeworld info

### unplash

*fetchImageByTerm(term)* `GET https://api.unsplash.com/search/photos?query={term}` to get an image for each Character

## Store

Our application has 3 categories of state, each with an associated reducer.



