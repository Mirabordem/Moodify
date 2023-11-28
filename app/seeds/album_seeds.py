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

    album_10 = Album(
        title="Don't Look Back",
        release_date=date(1978,8,2),
        artist="Boston",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/f1595d68e0ab4ace89eb13a25cd2907f.jpg",
        user_owner=1
    )
    album_11 = Album(
        title="24K Magic",
        release_date=date(2016,11,18),
        artist="Bruno Mars",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/5e7f35c45d1641ec99ae012554eeb517.jpg",
        user_owner=2
    )
    album_12 = Album(
        title="Collage",
        release_date=date(2016, 11, 4),
        artist="ChainSmokers",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/83d65adbb58e4b61af227d53507e6ecf.jpg",
        user_owner=1
    )

    album_13 = Album(
        title="The Essence",
        release_date=date(2008, 10, 15),
        artist="Deva Premal",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/a34236f270374f399d1da7a842a50e78.jpg",
        user_owner=2
    )

    album_14 = Album(
        title="Hotel California",
        release_date=date(1976, 12, 8),
        artist="Eagles",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/66113f69bbd347e88c7cd6163dc9dc95.png",
        user_owner=3
    )

    album_15 = Album(
        title="Powerslave",
        release_date=date(1984, 9, 3),
        artist="Iron Maiden",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/4ba249c7a9d04f9bbb5779a3830d956a.jpg",
        user_owner=1
    )

    album_16 = Album(
        title="One of the Boys",
        release_date=date(2008, 6, 17),
        artist="Katy Perry",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/0687230ca2944dd1b07fb72b9c601898.jpg",
        user_owner=2
    )

    album_17 = Album(
        title="Wish You Were Here",
        release_date=date(1975, 9, 12),
        artist="Pink Floyd",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/0dcb3208222f4155a192ff234ca4711e.jpg",
        user_owner=3
    )

    album_18 = Album(
        title="The Grand Illusion",
        release_date=date(1977, 7, 7),
        artist="Styx",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/55b31fa476094e3c887e37a54178b6f6.jpg",
        user_owner=1
    )

    album_19 = Album(
        title="House of Balloons",
        release_date=date(2011, 3, 21),
        artist="The Weeknd",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/9ccf9d767c1e4ee1b1bcf9d177c47619.jpg",
        user_owner=2
    )

    album_20 = Album(
        title="Blue Album",
        release_date=date(1994, 5, 10),
        artist="Weezer",
        cover_image_url="https://moodifybucket.s3.amazonaws.com/9b3c0fd510b04a7cb0b711ba594cd9b4.jpg",
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
    db.session.add(album_10)
    db.session.add(album_11)
    db.session.add(album_12)
    db.session.add(album_13)
    db.session.add(album_14)
    db.session.add(album_15)
    db.session.add(album_16)
    db.session.add(album_17)
    db.session.add(album_18)
    db.session.add(album_19)
    db.session.add(album_20)

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
