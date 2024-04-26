# Pokemon Showdown Teams Builder

This is a front-end project built with .NET, aimed at providing users with a platform to create and save their Pokémon teams by interacting with a backend system via UI.

## Project Members
- Eduard Carrillo
- Kung Lo
- Michael Phan
- Evan Wilcher

## Project Requirements
- Application must build and run.
- Unit Testing (70% code coverage for Services and Models layer)
- Utilize an external API (https://pokeapi.co/)
- Backend hosted on Azure Cloud Service

## Tech Stack

- React/JS (Front End)
- HTML, CSS
    - Bootstrap? Tailwind? 

## User Stories
- User should be able to login/logout if they already have an account
- User should be able to register if they do not have an account
- User should be able to create a new showdown team
- User should be able to choose up to six Pokemon
- User should be able to customize stat totals, levels, move sets and held items for each Pokemon
- User should be able view all previous teams that they created
- User should be able to delete teams that they don’t need
- User should be able to have all data needed to import their team to Pokemon Showdown

## Tables
![PokemonDB](./images/DB.png)

## MVP Goals
- Trainer(s) can create a new team with up to six pokemon
- Trainer(s) can view previous teams that they created
- Trainer(s) can delete team(s)
- Trainer(s) can view previous teams even if all cache data is cleared or a new browser instance is created on a different machine
- Trainer teams are fully customizable:
- EV and IV spreads, abilities, move sets, held items etc.
- Exportable data(via string) to transfer team information to Pokemon Showdown

## Stretch Goals
- Implement login/logout and register functionality to allow for multiple users
- User authentication and password encryption
- Login using google, facebook account
- Possibly implement Dockersize for packaging application

## MockUp of UI Design
- Homepage/Landing Page where User can sign in or sign up
![alt text](./images/image.png)

- Edit/Delete Team page where User can edit/delete teams they have created
![alt text](./images/image-1.png)

- Team creation page where User can create team and import/copy team to Pokemon Showdown
![alt text](./images/image-2.png)