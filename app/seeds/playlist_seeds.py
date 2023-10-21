from ..models import Playlist,db,environment, SCHEMA
from sqlalchemy.sql import text
import random
from random import randint


playlist_names = [
    "Groovy Vibes",
    "Chill Out Mix",
    "Summer Jams",
    "Indie Anthems",
    "Throwback Classics",
    "Electro Beats",
    "Acoustic Serenity",
    "Rock Legends",
    "R&B Soulful Hits",
    "Latin Fiesta",
    "Country Roads",
    "Hip-Hop Hype",
    "Alternative Vibes",
    "Reggae Rhythms",
    "Piano Melodies",
    "EDM Party Anthems",
    "Bluesy Tunes",
    "Jazz Fusion",
    "Folk & Americana",
    "Pop Extravaganza"
]


playlist_descriptions = [
    "Let's get this party started.",
    "This playlist be romantic as heck.  Man I miss my ex",
    "Bubble bath mix.  For after a hard day at the office",
    "I will get in shape this year!  This is my inspiration.",
    "Road trip mix.",
    "I'm angry at the world and I'm never coming out.",
    "Just calm down.  calm.....down",
    "Throwback mix.  For back when everything made sense",
    "I just wanna dance",
    "Meditation music."
]





blank_playlist={"id":0, "name":'random','cover_image_url':'random','description':'randomtextupto1000','user_id':'random 1 to 3'}
counter = 0
def seed_playlists():
    master_playlist=[]


    for i in range (1,4):
        blank_playlist.user_id = i
        rand_idx_list = [sample(range(20), 10)]
        counter = 0
        for idx in rand_idx_list:
            blank_playlist.name = playlist_names[idx]
            blank_playlist.description = playlist_descriptions[counter]
            counter += 1

            new_playlist = Playlist(
                name=blank_playlist.name,
                cover_image_url = None,
                description = blank_playlist.description,
                user_id = blank_playlist.user_id
                )

            master_playlist.append(new_playlist)
    db.session.add_all(master_playlist)
    db.session.commit()

def undo_playlists():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM playlists"))

        db.session.commit()
