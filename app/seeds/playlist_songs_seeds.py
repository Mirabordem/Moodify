from app.models import db, Playlist, environment, Song, SCHEMA
from random import sample
from sqlalchemy.sql import text


def seed_playlist_songs():

    playlists = Playlist.query.all()
    songs = Song.query.all()
    for playlist in playlists:
        song_selection = sample(songs, 20)
        playlist.songs_on_playlist.extend(song_selection)
    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
