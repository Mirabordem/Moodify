from .db import db, environment, SCHEMA, add_prefix_for_prod



class Album(db.Model):
    __tablename__= 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100))
    release_date = db.Column(db.Date,nullable = False)
    artist = db.Column(db.String(100), nullable = False)
    cover_image_url = db.Column(db.String(255), nullable = False)
    user_owner = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    album_owner = db.relationship('User', back_populates = 'users_albums')
    album_songs = db.relationship('Song',back_populates = 'album_of_song')


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "releaseDate": self.release_date,
            "artist": self.artist,
            "coverImageUrl": self.cover_image_url,
            "userOwner": self.user_owner,
            "albumSongs": [song.id for song in self.album_songs]
        }
