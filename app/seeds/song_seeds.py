from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    [
        {
            name: "Chery coloured Funk",
            album_id: 1,
            track_number: 1,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Cherry+coloured+Funk+-+1.mp3",
            song_length: 193,
        },
        {
            name: "Pitch the Baby",
            album_id: 1,
            track_number: 2,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Pitch+the+Baby+-+2.mp3",
            song_length: 194,
        },
        {
            name: "Iceblink Luck",
            album_id: 1,
            track_number: 3,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Iceblink+Luck+-+3.mp3",
            song_length: 197,
        },
        {
            name: "Fifty-fifty Clown",
            album_id: 1,
            track_number: 4,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Fifty-fifty+Clown+-+4.mp3",
            song_length: 190,
        },
        {
            name: "Heaven Or Las Vegas",
            album_id: 1,
            track_number: 5,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Heaven+Or+Las+Vegas+-+5.mp3",
            song_length: 231,
        },
        {
            name: "I Wear Your Ring",
            album_id: 1,
            track_number: 6,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/I+Wear+Your+Ring+-+6.mp3",
            song_length: 209,
        },
        {
            name: "Fotzepolitic",
            album_id: 1,
            track_number: 7,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Fotzepolitic+-+7.mp3",
            song_length: 211,
        },
        {
            name: "Wolf in the Breast",
            album_id: 1,
            track_number: 8,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Wolf+in+the+Breast+-+8.mp3",
            song_length: 211,
        },
        {
            name: "Road, River and Rail",
            album_id: 1,
            track_number: 9,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Road%2C+River+and+Rail+-+9.mp3",
            song_length: 201,
        },
        {
            name: "Frou-frou Foxes in Midsummer Fires",
            album_id: 1,
            track_number: 10,
            audio_url: "https://moodifybucket.s3.us-east-2.amazonaws.com/songs/Frou-frou+Foxes+in+Midsummer+Fires+-10.mp3",
            song_length: 338,
        },

    ]

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
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
