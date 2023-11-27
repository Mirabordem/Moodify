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

# LANDING PAGE

<img width="1434" alt="landing-page" src="https://github.com/Mirabordem/Moodify/assets/130639536/fb3f64f6-52f2-45b2-ae6e-09e2177f1f0f">

# LOGGED IN LANDING PAGE

<img width="1438" alt="landing-page-logged-in" src="https://github.com/Mirabordem/Moodify/assets/130639536/b34e5f03-601e-4815-bdf5-7a120f6f005c">

# ALBUM PAGE

<img width="1440" alt="album-page" src="https://github.com/Mirabordem/Moodify/assets/130639536/2b050805-6632-4237-b292-9848eeee31ad">

# PLAYLIST PAGE

<img width="1440" alt="playlist-page" src="https://github.com/Mirabordem/Moodify/assets/130639536/67f3c8cb-e105-4699-bbfc-051d68fafde7">

# LOVED SONGS PAGE

<img width="1430" alt="loved-songs-page" src="https://github.com/Mirabordem/Moodify/assets/130639536/95a2f502-1b3d-4b06-93e6-575396ba1527">

# LOGIN FORM

<img width="587" alt="login-form" src="https://github.com/Mirabordem/Moodify/assets/130639536/d9fcd2cd-7ea7-41b2-8249-94941f922fee">

# CREATE ALBUM FORM

<img width="916" alt="create-album-form" src="https://github.com/Mirabordem/Moodify/assets/130639536/73734645-7b10-4022-8ec0-36b15efaa163">

# DROPDOWNS

<img width="1435" alt="dropdowns" src="https://github.com/Mirabordem/Moodify/assets/130639536/da60d0d6-6b18-48b4-a5c8-9ddce00f3fe5">

# ADD SONG TO PLAYLIST

<img width="1438" alt="add-song-to-playlist" src="https://github.com/Mirabordem/Moodify/assets/130639536/251eb109-3cc3-47a9-b7e0-3a90830bd844">

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

## Contributors:

Miroslawa(Mira) Borkowska
https://github.com/Mirabordem
https://www.linkedin.com/in/miroslawa-borkowska-3b72332a0/

Hayden Gogan
https://github.com/h-moon-g
https://www.linkedin.com/in/hayden-gogan-2570a92a1/

Josh Goldenberg
https://github.com/jgoldenberg29
https://www.linkedin.com/in/josh-goldenberg-252416a1/

Alex Heasley
https://github.com/alexchrono
https://www.linkedin.com/in/alexander-heasley-1979732a0/

