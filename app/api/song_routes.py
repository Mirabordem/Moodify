from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Song, likes, Album
from app.forms import EditSongForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import remove_file_from_s3,get_unique_filename,upload_file_to_s3
from icecream import ic
import os

song_routes = Blueprint('song', __name__)

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
    if current_song is None:
        return {'errors': {'message': 'Song not found'}}, 404
    album_of_song = Album.query.get(curr_song_dict['albumId'])
    if album_of_song.user_owner != current_user.id:
        return {'errors': {'message': "Song does not belong to current user"}}, 403

    if form.validate_on_submit():
        data = form.data
        if data["audio_url"]:
            song = data["audio_url"]
            song.filename = get_unique_filename(song.filename)
            upload = upload_file_to_s3(song)
            if 'url' not in upload:
                return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
            current_song.audio_url = upload['url']

            # current_song.audio_url = 'https://moodifybucket.s3.us-east-2.amazonaws.com/bubkas.mp3'

            # if os.environ.get('FLASK_ENV') == 'production':
            #     upload = upload_file_to_s3(song)
            #     if 'url' not in upload:
            #         return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500
            #     current_song.audio_url = upload['url']
            # else:
            #     current_song.audio_url = f'{song.filename}.mp3'

        current_song.name = data['name']
        current_song.track_number = data['track_number']
        current_song.song_length = data['song_length']

        db.session.commit()

        updated_album = Album.query.get(album_of_song.id)

        return {'song': current_song.to_dict(), 'album': updated_album.to_dict()}


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

    if selected_song is None:
        return {'errors': {'error':'Song not found'}}, 404
    elif userOwner != current_user.id:
        return {'errors': {'error':'Song does not belong to current user'}}, 403
    else:

        if os.environ.get('FLASK_ENV') == 'production':
            remove_file_from_s3(selected_song_dict['audioUrl'])


        db.session.delete(selected_song)
        db.session.commit()


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
        return { "errors": {"message":"User likes this song"} }, 405

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
        return { "errors": {"message" : "User does not like this song"} }, 405

    current_user.liked_songs.pop(idx)

    db.session.commit()
    return current_user.to_dict()
