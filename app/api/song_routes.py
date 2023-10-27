from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Song, likes, Album
from app.forms import EditSongForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import remove_file_from_s3,get_unique_filename,upload_file_to_s3
from icecream import ic
import os

song_routes = Blueprint('song', __name__)



# @song_routes.route('/new', methods=['POST'])
# @login_required
# def create_new_song():
#     """
#     Creates a new song. Returns a song dictionary.
#     """
#     form = CreateSongForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         new_song = Song(
#             name = form.data['name'],
#             album_id = form.data['album_id'],
#             track_number = form.data['track_number'],
#             audio_url = form.data['audio_url'],
#             song_length = form.data['song_length']
#         )

#         db.session.add(new_song)
#         db.session.commit()
#         return new_song.to_dict()

#     return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    """
    Edits a song. Returns a new song dictionary.
    """
    form = EditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_song = Song.query.get(id)
    curr_song_dict = current_song.to_dict()
    ic(current_song)
    ic(current_song.to_dict())
    if current_song is None:
        return {'errors': 'Song not found'}, 404
    album_of_song = Album.query.get(curr_song_dict['albumId'])
    if album_of_song.user_owner != current_user.id:
        return {'errors': 'forbidden'}, 403


    if form.validate_on_submit():
        data = form.data
        ic(data["audio_url"])
        if data["audio_url"]:
            print("HIT THE IF BLOCK")
            song = data["audio_url"]
            song.filename = get_unique_filename(song.filename)


            # current_song.audio_url = 'https://moodifybucket.s3.us-east-2.amazonaws.com/bubkas.mp3'

            if os.environ.get('FLASK_ENV') == 'production':
                upload = upload_file_to_s3(song)
                print(upload)
                if 'url' not in upload:
                    return { 'errors': 'upload error'}
                current_song.audio_url = upload['url']
            else:
                current_song.audio_url = f'{song.filename}.mp3'

        current_song.name = data['name']
        ic(data['name'])
        print(data['name'])

        current_song.track_number = data['track_number']

        current_song.song_length = data['song_length']

        ic(current_song.to_dict())

        db.session.commit()

        print('Did we make it beyond the commit?????????')

        updated_album_obj = Album.query.get(album_of_song.id).to_dict()
        song_instances = [song.to_dict() for song in updated_album_obj['albumSongs']]
        updated_album_obj['albumSongs'] = [song['id'] for song in song_instances]
        current_song_obj = current_song.to_dict()

        return {'song': current_song_obj, 'album': updated_album_obj}


    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@song_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_song(id):
    """
    Deletes a song.
    """
    selected_song = Song.query.get(id)
    selected_song_dict=selected_song.to_dict()

    albumId=selected_song_dict['albumId']
    targetAlbum=Album.query.get(albumId)
    targetAlbumToDict= targetAlbum.to_dict()
    userOwner= targetAlbumToDict['userOwner']

    if userOwner != current_user.id:
        return { 'errors': 'Song not found' }
    else:

        if os.environ.get('FLASK_ENV') == 'production':
            remove_file_from_s3(selected_song_dict['audioUrl'])

        ic(targetAlbum.album_songs)

        db.session.delete(selected_song)
        db.session.commit()

        ic(targetAlbum.album_songs)

        # idx = targetAlbum.album_songs.index(selected_song)
        # targetAlbum.album_songs.pop(idx)

        return  {'message': 'successfuly deleted', 'album': targetAlbum.to_dict()}





@song_routes.route('/<int:id>/like')
@login_required
def add_song_like(id):
    """
    Adds like to a selected song. Returns likes for the song as a list of like dictionaries.
    """

    song = Song.query.get(id)

    if song in current_user.liked_songs:
        return { "errors": "User likes this song" }, 405

    current_user.liked_songs.append(song)

    db.session.commit()
    return current_user.to_dict()




@song_routes.route('/<int:id>/unlike')
@login_required
def remove_song_like(id):
    """
    Removes like from a selected song. Returns a message if successful.
    """

    song = Song.query.get(id)

    try:
        idx = current_user.liked_songs.index(song)
    except ValueError:
        return { "errors": "User has never liked this song" }, 405

    current_user.liked_songs.pop(idx)

    db.session.commit()
    return current_user.to_dict()
