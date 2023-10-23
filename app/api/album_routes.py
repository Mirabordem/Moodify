from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, db, Song
from app.forms import CreateAlbumForm, EditAlbumForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from mutagen.mp3 import MP3
from icecream import ic

album_routes = Blueprint('albums', __name__)


@album_routes.route('/new', methods=['POST'])
@login_required
def create_new_album():
    """
    Creates new album. Returns album dictionary.
    """
    form = CreateAlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        image= form.data['cover_image_url']
        image.filename = get_unique_filename(image.filename)
        url='https://i.imgur.com/8LMyVdU.jpg'

        ##KEEP THIS. uncomment this code when we actually want to upload to aws
        # upload = upload_file_to_s3(image)
        # print('THIS IS UPLOAD',upload)

        # # if "url" not in upload:
        # #     return { 'errors': validation_errors_to_error_messages(form.errors) }, 400

        # url = upload['url']




        new_album = Album (
            title = form.data['title'],
            release_date = form.data['release_date'],
            artist = form.data['artist'],
            cover_image_url = url,
            user_owner= current_user.id
        )
        db.session.add(new_album)
        db.session.commit()

        return new_album.to_dict()
    print(form.errors)
    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@album_routes.route('')
def get_all_albums():
    """
    Query to get all albums. Returns list of album dictionaries.
    """
    albums = Album.query.all()
    album_dict_list = [album.to_dict() for album in albums]
    for album in album_dict_list:
        song_instances = [song.to_dict() for song in album['albumSongs']]
        album['albumSongs'] = [song['id'] for song in song_instances]

    return album_dict_list




@album_routes.route('/<int:id>')
def get_album_by_id(id):
    """
    Query for an album by id. Returns album in a dictionary.
    """
    album = Album.query.get(id)
    return album.to_dict()




@album_routes.route('/current')
@login_required
def get_user_albums():
    """
    Query for all albums created by the current user. Returns a list of album dictionaries.
    """
    users_albums = Album.query.filter(Album.user_id == current_user.id).all()
    albums_dict = [album.to_dict() for album in users_albums]
    return albums_dict






@album_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_album(id):
    form = EditAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    album = Album.query.get(id)

    if album is None:
        return {'errors': 'Album not found'}, 404
    elif album.user_owner != current_user.id:
        return {'errors': 'forbidden'}, 403

    if form.validate_on_submit():
        if form.data['cover_image_url']:
            image = form.data['cover_image_url']
            image.filename = get_unique_filename(image.filename)
            url="https://i.imgur.com/sG9LYzh.jpg"

            ##KEEP THIS. uncomment this code when we actually want to upload to aws
            # upload = upload_file_to_s3(image)
            # # if "url" not in upload:
            # #     return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
            # url = upload['url']

            album.cover_image_url =url
        data = form.data
        album.title = data['title']
        album.release_date = data['release_date']
        album.artist = data['artist']
        db.session.commit()
        return album.to_dict()
    print(form.errors)

    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400




@album_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_album(id):
    """
    Deleting album created by the user.
    """
    album = Album.query.get(id)

    if album is None:
        return {'errors': 'Album not found'}, 404
    elif album.user_owner != current_user.id:
        return {'errors': 'forbidden'}, 403

# removing songs in deleted album:
    songs = album.to_dict()['albumSongs']
    for song in songs:
        remove_file_from_s3(song['song_url'])

    db.session.delete(album)
    db.session.commit()

    return { 'message': 'Successfully Deleted'}



@album_routes.route('/<int:id>/songs/new', methods=['POST'])
@login_required
def create_album_song(id):
    """
    Create Song for Album.
    """
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']


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

        return newSong.to_dict()

    print(validation_errors_to_error_messages(form.errors))
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@album_routes.route('/<int:id>/songs', methods=['GET'])
def get_album_songs(id):
    """
    Retrieve songs within an album by its Id. Returns a list of song dictionaries.
    """
    album = Album.query.get(id)

    if album is None:
        return {'errors': 'Album not found'}, 404

    album_songs = album.albumSongs
    song_dict_list = [song.to_dict() for song in album_songs]

    return song_dict_list
