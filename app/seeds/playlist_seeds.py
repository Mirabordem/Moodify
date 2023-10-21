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
    "Embark on a musical journey that will soothe your soul and lift your spirits.",
    "Experience a curated selection of songs that will take you back in time and touch your heart.",
    "Get lost in the melodies and rhythms of this enchanting playlist, perfect for late-night contemplation.",
    "Indulge in a collection of heartfelt tunes that will mend your broken heart and heal your soul.",
    "Dive into a sonic oasis filled with tracks that will transport you to a world of pure relaxation.",
    "Discover the perfect soundtrack for your road trips, featuring an eclectic mix of musical treasures.",
    "Elevate your mood with this handpicked playlist of energetic tracks that'll keep you grooving all day long.",
    "Unwind and destress with this carefully crafted collection of songs that'll make your worries melt away.",
    "Feel the rhythm and embrace the beats with this playlist designed to get your body moving and your heart pumping.",
    "Bid farewell to the day with this dreamy selection of songs that will lull you into a peaceful slumber."
]





blank_playlist={"id":0, "name":'random','cover_image_url':'random','description':'randomtextupto1000','user_id':'random 1 to 3'}
counter = 0
def seed_playlists():
    master_playlist=[]


    for i in range (1,4):
        blank_playlist.user_id = i
        for k in range(1,11):
            blank_playlist.name = playlist_names[randint(0,15)]
            blank_playlist.description = playlist_descriptions[randint(0,9)]

            new_playlist = Playlist(name=blank_playlist.name,
                                    cover_image_url = None,
                                    description = blank_playlist.description,
                                    user_id = blank_playlist.user_id)

            master_playlist.append(new_playlist)
    db.session.add_all(master_playlist)
    db.session.commit()

def undo_playlists():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM playlists"))

        db.session.commit()
