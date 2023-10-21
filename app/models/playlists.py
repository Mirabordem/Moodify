from .db import db, environment, SCHEMA, add_prefix_for_prod
from .associations import playlist_songs


class Playlist(db.Model):
    __tablename__= 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    name = db.Column (db.String(255))
    cover_image_url = db.Column (db.String(255))
    description = db.Column (db.Text(1000))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)


    playlists_of_user = db.relationship('User',back_populates='users_playlists')
    songs_on_playlist = db.relationship('Song', secondary=playlist_songs, back_populates='playlists_with_song')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "coverImageUrl": self.cover_image_url,
            "description": self.description,
            "userId": self.user_id,
            "songsOnPlaylist": self.songs_on_playlist
        }
