from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .songs import Song
# from .playlists import Playlist
# from .user import User


likes = db.Table('likes',
                 db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')),primary_key=True)
)
if environment == "production":
    likes.schema = SCHEMA

playlist_songs = db.Table('playlist_songs',
                          db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id'))),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')))
)
if environment == "production":
    playlist_songs.schema = SCHEMA
