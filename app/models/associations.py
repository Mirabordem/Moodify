from .db import db, environment, SCHEMA, add_prefix_for_prod


likes = db.Table('likes',
                 db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'),primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id'),primary_key=True)
)
if environment == "production":
    likes.schema = SCHEMA

playlist_songs = db.Table('playlist_songs',
                          db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id')),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id'))
)
if environment == "production":
    playlist_songs.schema = SCHEMA
