from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from .mira_song_seeds import mira_songs
from .hayden_song_seeds import hayden_songs
from .song_seeds_alex import alex_songs


# Adds a demo user, you can add other users here if you want
def seed_songs():
    all_songs = [mira_songs, hayden_songs, alex_songs]
    for song_list in all_songs:
        for song_obj in song_list:
            song_seed = Song(
                name=song_obj['name'],
                album_id=song_obj['album_id'],
                track_number=song_obj['track_number'],
                audio_url=song_obj['audio_url'],
                song_length=song_obj['song_length'],
            )
            db.session.add(song_seed)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
