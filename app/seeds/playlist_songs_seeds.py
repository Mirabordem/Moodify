from app.models import db, Playlist, environment, Song
from random import sample
from sqlalchemy.sql import text


def seed_playlist_songs():

    for i in range(1, 31):
        playlist = Playlist.query.get(i)
        print("playlist here:", playlist)
        song_ids = sample(range(1,90), 20)
        playlist.songs_on_playlist.extend(song_ids)

    db.session.commit()


def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
