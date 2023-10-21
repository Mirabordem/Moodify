from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_albums():
    album_1 = Album(
        title="Heaven or Las Vegas",
        release_date=date(1990,10,17),
        artist="Cocteau Twins",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hol-album-art.jpg",
        user_owner=1
    )

    album_2 = Album(
        title="IGOR",
        release_date=date(2019,5,17),
        artist="Tyler, The Creator",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/igor-album-image.jpg",
        user_owner=1
    )

    album_3 = Album(
        title="Hazardous Bubble Basics",
        release_date=date(2021,2,11),
        artist="Golemm",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/hbb-album-image.jpg",
        user_owner=1
    )

    album_4 = Album(
        title="Ziggy Stardust",
        release_date=date(1971,11,11),
        artist="David Bowie",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/Ziggy-Stardust.png",
        user_owner=2
    )

    album_5 = Album(
        title="2000",
        release_date=date(2023,2,17),
        artist="Manuel Turizo",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/ManuelTurizo.png",
        user_owner=2
    )

    album_6 = Album(
        title="Love delux",
        release_date=date(1992,10,26),
        artist="Sade",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/Sade.png",
        user_owner=2
    )

    album_7 = Album(
        title="Back to Black",
        release_date=date(2006,10,27),
        artist="Amy Winehouse",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/Amy+Winehouse+-+Back+to+Black+-2006+released/BackToBlackAlbumCover.jpg",
        user_owner=3
    )
    album_8 = Album(
        title="Playing the Angel",
        release_date=date(2005,10,27),
        artist="Depeche Mode",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/Depeche+Mode+-+Playing+The+Angel+-2005+released/depeche-mode-playing-the-angel-800x800.jpg",
        user_owner=3
    )

    album_9 = Album(
        title="A Posteriori",
        release_date=date(2006,9,22),
        artist="Enigma",
        cover_image_url="https://moodifybucket.s3.us-east-2.amazonaws.com/Enigma+-+A+Posteriori+-+2006/enigma-aposteriori-album-cover.jpg",
        user_owner=3
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
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
