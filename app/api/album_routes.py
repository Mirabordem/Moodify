from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, db, Song
from app.forms import CreateAlbumForm, EditAlbumForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from mutagen.mp3 import MP3

album_routes = Blueprint('albums', __name__)


@album_routes.route('/')
def get_all_albums():
    """
    Query to get all albums. Returns list of album dictionaries.
    """
    return jsonify([album.to_dict() for album in Album.query.all()])




@album_routes.route('/albums/:id')
def get_album_by_id(id):
    """
    Query for an album by id. Returns album in a dictionary.
    """
    album = Album.query.get(id)
    return jsonify(album.to_dict())




@album_routes.route('/current')
@login_required
def get_user_albums():
    """
    Query for all albums created by the current user. Returns a list of album dictionaries.
    """
    users_albums = Album.query.filter(Album.user_id == current_user.id)
    albums_dict = [album.to_dict() for album in users_albums]
    return jsonify(albums_dict)





@album_routes.route('/albums/:id/delete', methods=['DELETE'])
@login_required
def delete_album(id):
    """
    Deleting album created by the user.
    """
    album = Album.query.get(id)

    if album is None or album.user_id != current_user.id:
        return {'errors': 'Album not found'}, 404

# removing songs in deleted album:
    songs = album.to_dict()['songs']
    for song in songs:
        remove_file_from_s3(song['song_url'])

    db.session.delete(album)
    db.session.commit()

    return { 'message': 'Successfully Deleted'}





@album_routes.route('/albums/new', methods=['POST'])
@login_required
def create_new_album():
    """
    Creating a new Album.
    """
    form = CreateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.data['user_id'] = current_user.id

    if form.validate_on_submit():
        new_album = Album (
            user_id = current_user.id,
            title = form.data['title'],
            release_date = form.data['release_date'],
            artist = form.data['artist'],
            cover_image_url = 'https://cdn-icons-png.flaticon.com/512/287/287422.png' if form.data['cover_image_url'] == '' else form.data['cover_image_url'],
        )
        db.session.add(new_album)
        db.session.commit()

        return jsonify(new_album.to_dict())
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400





@album_routes.route('/albums/:id/edit', methods=['PUT'])
@login_required
def edit_album(id):
    """
    Editing an Album.
    """
    form = EditAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        album = Album.query.get(id)

        if album is None or album.user_id != current_user.id:
            return { 'errors': 'Album not found'}, 404

        album.title = form.data['title']
        album.release_date = form.data['release_date']
        album.artist = form.data['artist']
        if form.data['cover_image_url'] == '':
            album.cover_image_url = 'https://cdn-icons-png.flaticon.com/512/287/287422.png'
        else:
            album.cover_image_url = form.data['cover_image_url']

        db.session.commit()

        return jsonify(album.to_dict())

    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400





@album_routes.route('/songs/new', methods=['POST'])
@login_required
def create_album_song(id):
    """
    Create Song for Album.
    """
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('form data:', form.data)

    if form.validate_on_submit():
        album = Album.query.get(id)

        if album is None or album.user_id != current_user.id:
            return { 'errors': 'Album not found'}, 404

        song = form.data['song']
        audio = MP3(song)
        song.filename = get_unique_filename(song.filename)
        song.seek(0)
        upload = upload_file_to_s3(song)


        if 'url' not in upload:
            return { 'errors': 'upload error'}

        newSong = Song (
            name = form.data['name'],
            album_id = form.data['album.id'],
            track_number = form.data['track_number'],
            audio_url = form.data['audio_url'],
            song_length = form.data['song_length']
        )
        db.session.add(newSong)
        db.session.commit()

        return jsonify(newSong.to_dict())

    print(validation_errors_to_error_messages(form.errors))
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400