## Welcome to Moodify Music Experience.

Moodify's website:  https://moodify-s91r.onrender.com


# Description

Moodify is a Spotify inspired full-stack web application designed to experience your favorite music.
In Moodify, after successful signing in, you can create your own albums and playlists with your favorite songs.
User-friendly interface with exclusive features provide a tool to influence your Mood.


# Exclusive Features

- User Authentication Feature:
By hashing and storing user's password, Moodify's login system provides secure authentication.
- Personal account:
User can sign up and log in to own account.
Provided Demo User enables experiencing the functionality of the site.
Logged in User has a pleasure of using all build in features.
Logged out User can experience only public albums.

# Albums

- User can create/add a new album.
- User can read/view all albums.
- User can update/edit a chosen album.
- User can delete/remove a chosen album.

# Songs

- User can create/add a new song.
- User can read/view all songs.
- User can update/edit a chosen song.
- User can delete/remove a chosen song.

# Playlist

- User can create/add a new playlist.
- User can read/view all playlists.
- User can delete/remove a chosen playlist.

# Likes

- User can create/add a new like.
- User can read/view all likes.
- User can delete/remove a chosen like.


# Technologies Used In Moodify Creation

- Backend:
   - Python
   - Flask

- Frontend:
   - React
   - Redux
   - Javascript
   - HTML
   - CSS

- AWS
   - All songs, hosted on AWS, deliver a seamless user experience.

- Media Player
   - Users can experience songs in albums and playlists directly on the website.
   - The music keeps playing seamlessly as users navigate through different pages.
   - It automatically stops when the current playlist queue is completed.


# Design

Moodify, a unique and captivating take on the Spotify design, offers an experience that's both familiar and fresh.
While retaining the functional elegance of its predecessor, Moodify introduces a distinctive twist with its own signature logo and favicon. The color palette harmonizes with the mood and theme of the platform, creating a seamless and visually engaging atmosphere. Discover music in a new light with Moodify, where a touch of personality meets the rhythm of your favorite tunes.

# Screenshots
<img width="1422" alt="landing-page" src="https://github.com/Mirabordem/Moodify/assets/130639536/1320c417-d85d-4982-b1b0-90244cc99330">




# Documentation

Moodify's Redux store is a marvel of efficiency and organization. It follows a flat, normalized, and DRY (Don't Repeat Yourself) structure where each resource meticulously catalogues its relationship with songs, using unique IDs. This intelligent design allows for lightning-fast data retrieval and rendering as you seamlessly navigate from one page to another. With Moodify's Redux store, you'll experience a smooth and remarkably quick data pull, ensuring a seamless and enjoyable user experience.

<img width="311" alt="Redux-Store" src="https://github.com/Mirabordem/Moodify/assets/130639536/219336af-1e41-4a97-bc1d-940d357a8d69">




## Installation Instructions

1. Install dependencies
```bash
pipenv install -r requirements.txt
```
2. Create a **.env** file based on the example with proper settings for your development environment

4. Replace the value for `SCHEMA` with a unique name, **making sure you use the snake_case convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

```bash
pipenv shell
```
```bash
flask db upgrade
```
```bash
flask seed all
```
```bash
flask run
```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Contributors

Miroslawa(Mira) Borkowska
https://github.com/Mirabordem

Hayden Gogan
https://github.com/h-moon-g

Josh Goldenberg
https://github.com/jgoldenberg29

Alex Heasley
https://github.com/alexchrono





