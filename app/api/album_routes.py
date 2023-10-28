from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, db, Song
from app.forms import CreateAlbumForm, EditAlbumForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from mutagen.mp3 import MP3
from icecream import ic
from random import randint
import os

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
        # when we remove this if statement it for sure workks

        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
        print('THIS IS UPLOAD IN OUR CREATE ALBUM',upload)
        url = upload['url']




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
    # for album in album_dict_list:
    #     song_instances = [song.to_dict() for song in album['albumSongs']]
    #     album['albumSongs'] = [song['id'] for song in song_instances]

    return album_dict_list




@album_routes.route('/<int:id>')
def get_album_by_id(id):
    """
    Query for an album by id. Returns album in a dictionary.
    """
    album = Album.query.get(id)
    return album.to_dict()




# @album_routes.route('/current')
# @login_required
# def get_user_albums():
#     """
#     Query for all albums created by the current user. Returns a list of album dictionaries.
#     """
#     users_albums = Album.query.filter(Album.user_id == current_user.id).all()
#     albums_dict = [album.to_dict() for album in users_albums]
#     return albums_dict






@album_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_album(id):
    form = EditAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    album = Album.query.get(id)
    album_to_dict=album.to_dict()

    ic(album_to_dict)

    if album is None:
        return {'errors': {'message':'Album not found'}}, 404
    elif album.user_owner != current_user.id:
        return {'errors': {'message':'forbidden'}}, 403

    if form.validate_on_submit():
        ic (form.data)

        if form.data['cover_image_url']:
            image = form.data['cover_image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
            url = upload['url']
            ic(url)

            # if os.environ.get('FLASK_ENV') == 'production':
            # image= form.data['cover_image_url']
            # upload = upload_file_to_s3(image)
            # print(upload)
            # if 'url' not in upload:
            #     return { 'errors': 'upload error'}
            # url = upload['url']
        elif album_to_dict['coverImageUrl']:
            url=album_to_dict['coverImageUrl']



        elif not album_to_dict['coverImageUrl']:
            url="https://i.imgur.com/sG9LYzh.jpg"

        album.cover_image_url =url
        data = form.data
        if data["title"]:
            album.title = data['title']
        if data["release_date"]:
            album.release_date = data['release_date']
        if data["artist"]:
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
    ic('DELETE ALBUM!!!!!!!')
    album = Album.query.get(id)

    if album is None:
        return {'errors': {'error':'Album not found'}}, 404
    elif album.user_owner != current_user.id:
        return {'errors': {'error':'forbidden'}}, 403

# removing songs in deleted album:
    songs = album.album_songs
    if os.environ.get('FLASK_ENV') == 'production':
        print("In Production Check")
        if len(songs) != 0:
            print("songs to delete")
            for song in songs:
                remove_file_from_s3(song.audio_url)
                print('songs removed from AWS')
            remove_file_from_s3(album.image_url)
            print('image removed from AWS')

    if len(songs) != 0:
        print('going to delete songs from db')
        for song in songs:
            db.session.delete(song)
            print('songs deleted songs from db')


    db.session.delete(album)
    print('deleted Album from db')
    db.session.commit()
    print('commited changes to db')
    return { 'message': 'Successfully Deleted'}



@album_routes.route('/<int:id>/songs/new', methods=['POST'])
@login_required
def create_album_song(id):
    """
    Create Song for Album.
    """

    print()
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    album = Album.query.get(id)
    if album is None:
        return {'errors': {'message':'Album not found'}}, 404
    elif album.user_owner != current_user.id:
        return {'errors': {'message':'forbidden'}}, 403
    if form.validate_on_submit():
        data = form.data

        song = data["audio_url"]
        ic(song)
        song.filename = get_unique_filename(song.filename)
        # if os.environ.get('FLASK_ENV') == 'production':
        url='test'
        upload = upload_file_to_s3(song)
        print(upload)
        if 'url' not in upload:
            return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
        url = upload['url']

        # else:
        # url = f'{song.filename}.mp3'

        new_song = Song (
            name = data['name'],
            album_id = album.id,
            track_number = data['track_number'],
            audio_url = url,
            song_length = data['song_length']
        )
        db.session.add(new_song)
        db.session.commit()

        ic(new_song.to_dict())
        print(new_song.to_dict())
        ic(Album.query.get(id))
        updated_album = Album.query.get(id)
        updated_album_obj = updated_album.to_dict()
        ic(updated_album_obj)
        song_instances = [Song.query.get(song_id).to_dict() for song_id in updated_album_obj['albumSongs']]
        updated_album_obj['albumSongs'] = [song['id'] for song in song_instances]
        new_song_obj = new_song.to_dict()
        return {'song': new_song_obj, 'album': updated_album_obj}

    print(validation_errors_to_error_messages(form.errors))
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400
