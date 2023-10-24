from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .associations import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    users_playlists = db.relationship('Playlist', back_populates='playlists_of_user')
    users_albums = db.relationship('Album', back_populates= 'album_owner')
    liked_songs = db.relationship('Song', secondary=likes, back_populates='likers')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "userPlaylists": self.users_playlists,
            "userAlbums": self.users_albums,
            "likedSongs": self.liked_songs
        }


    def add_like(self, song):
        self.liked_songs.append(song)
