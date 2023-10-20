from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_albums():
    album_1 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_2 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_3 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_4 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_5 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_6 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_7 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )
    album_8 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_9 = Album(
        title="Heaven or Las Vegas",
        release_date="10-17-1990",
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )


    db.session.add(album_1)
    db.session.add(album_2)
    db.session.add(album_3)
    db.session.add(album_4)
    db.session.add(album_5)
    db.session.add(album_6)
    db.session.add(album_7)
    db.session.add(album_8)
    db.session.add(album_9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
