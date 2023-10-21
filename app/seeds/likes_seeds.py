from app.models import db, User, environment, SCHEMA, Song
from sqlalchemy.sql import text
from random import sample

# Adds a demo user, you can add other users here if you want
def seed_likes():

#for each user add an extend their liked songs with sample for range number of songs
    users = User.query.all()
    songs = Song.query.all()
    for user in users:
        song_selection = sample(songs, 40)
        user.liked_songs.extend(song_selection)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
