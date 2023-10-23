from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Album, db, Song
from app.forms import CreateAlbumForm, EditAlbumForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from mutagen.mp3 import MP3

album_routes = Blueprint('albums', __name__)

@album_routes.route('/new', methods=['POST'])
@login_required
def create_new_album():


    print('We are inside the albums/new route')
    something=request.form
    coverimagefile=something.get('cover_image_url')
    print('THIS IS REQUEST.FORM*****',something)
    print('before anything im trying to "get" cover_image_url which should be file. righ tnow is:',coverimagefile)
    # print('data.get cover image is',data.get('title'))
    # print('request data is this',data)
    """
    Creating a new Album.
    """
    try:
        print('this request form',request.form)
        form = CreateAlbumForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form.populate_obj(request.form)

        # form.data['user_id'] = current_user.id
        print('am i inside the try of the route?')
        if form.validate_on_submit():
            image= form.data['cover_image_url']
            print('what is the image?',form.data['cover_image_url'])
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print('THIS IS UPLOAD',upload)

            # if "url" not in upload:
            #     return { 'errors': validation_errors_to_error_messages(form.errors) }, 400

            url = upload['url']


            new_album = Album (
                title = form.data['title'],
                release_date = form.data['release_date'],
                artist = form.data['artist'],
                cover_image_url = url,
            )
            db.session.add(new_album)
            db.session.commit()

            return new_album.to_dict()
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
    except Exception as e:
        print('Error:',e)
@album_routes.route('')
def get_all_albums():
    """
    Query to get all albums. Returns list of album dictionaries.
    """
    return {"albums": [album.to_dict() for album in Album.query.all()]}




@album_routes.route('/:id')
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






@album_routes.route('/:id/edit', methods=['PUT'])
@login_required
def edit_album(id):
    """
    Editing an Album.
    """
    form = EditAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    album = Album.query.get(id)

    if album is None:
        return {'errors': 'Album not found'}, 404
    elif album.user_id != current_user.id:
        return {'errors': 'forbidden'}, 403

    if form.validate_on_submit():
        data = form.data
        album.title = data['title']
        album.release_date = data['release_date']
        album.artist = data['artist']
        if data['cover_image_url'] == '':
            album.cover_image_url = 'https://cdn-icons-png.flaticon.com/512/287/287422.png'
        else:
            album.cover_image_url = data['cover_image_url']

        db.session.commit()



        return album.to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@album_routes.route('/:id/delete', methods=['DELETE'])
@login_required
def delete_album(id):
    """
    Deleting album created by the user.
    """
    album = Album.query.get(id)

    if album is None:
        return {'errors': 'Album not found'}, 404
    elif album.user_id != current_user.id:
        return {'errors': 'forbidden'}, 403

# removing songs in deleted album:
    songs = album.to_dict()['songs']
    for song in songs:
        remove_file_from_s3(song['song_url'])

    db.session.delete(album)
    db.session.commit()

    return { 'message': 'Successfully Deleted'}



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

        return newSong.to_dict()

    print(validation_errors_to_error_messages(form.errors))
    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400
