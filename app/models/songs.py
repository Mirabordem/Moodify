from .db import db, environment, SCHEMA, add_prefix_for_prod
from .associations import likes,playlist_songs

class Song(db.Model):
    __tablename__= 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50),nullable = False)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')),nullable=False)
    track_number = db.Column(db.Integer,nullable=False)
    audio_url = db.Column(db.String(255), nullable=False, unique=True)
    song_length = db.Column(db.Integer,nullable=False)
    album_of_song = db.relationship('Album',back_populates = 'album_songs')

    likers = db.relationship('User', secondary=likes, back_populates='liked_songs')
    playlists_with_song = db.relationship('Playlist', secondary=playlist_songs, back_populates='songs_on_playlist')


    def to_dict(self):
        #no likers
        #no playlists_with_song
        return {
            "id": self.id,
            "name": self.name,
            "albumId": self.album_id,
            "trackNumber": self.track_number,
            "songLength":self.song_length,
            "audioUrl": self.audio_url
        }
