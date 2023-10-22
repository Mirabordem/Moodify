from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, db, Song, Playlist
from app.forms import CreateAlbumForm, EditAlbumForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from mutagen.mp3 import MP3
from icecream import ic

get_all_routes = Blueprint('all', __name__)


@get_all_routes.route('')
def get_all():
    """
    Query to get all albums. Returns list of album dictionaries.
    """
    albums = Album.query.all()
    album_dict_list = [album.to_dict() for album in albums]
    for album in album_dict_list:
        song_instances = [song.to_dict() for song in album['albumSongs']]
        album['albumSongs'] = [song['id'] for song in song_instances]

    playlists = Playlist.query.all()
    playlist_dict_list = [playlist.to_dict() for playlist in playlists]
    for playlist in playlist_dict_list:
        song_instances = [song.to_dict() for song in playlist['songsOnPlaylist']]
        playlist['songsOnPlaylist'] = [song['id'] for song in song_instances]

    songs = Song.query.all()
    song_dict_list = [song.to_dict() for song in songs]

    return {"albums": album_dict_list, "playlists": playlist_dict_list, "songs": song_dict_list}
    # return {albums: {"album": "this is an album"}, playlists: {"playlists": "this is a playlist"}, songs: {"songs": "this is a song"}}
