from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Playlist, Song
from app.forms import CreatePlaylistForm,EditPlaylistForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages
from mutagen.mp3 import MP3
from icecream import ic


playlist_routes = Blueprint('playlists', __name__)



@playlist_routes.route('/new', methods=['POST'])
@login_required
def create_new_playlist():
    print('im inside create_new_playlist ROUTE!!!!!')
    """
    Creates a new playlist. Returns a playlist dictionary.
    """
    form = CreatePlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
            if form.data['cover_image_url']:

                image = form.data['cover_image_url']
                image.filename = get_unique_filename(image.filename)
                url='https://i.imgur.com/wzh4JdR.jpg'

                ##KEEP THIS. uncomment this code when we actually want to upload to aws
                # upload = upload_file_to_s3(image)
                # print('THIS IS UPLOAD',upload)

                # # if "url" not in upload:
                # #     return { 'errors': {'message': 'Oops! something went wrong on our end '}}, 500

                # url = upload['url']

            else:
                url=None


            new_playlist = Playlist (
            name = form.data['name'],
            cover_image_url = url,
            description = form.data['description'],
            user_id= current_user.id
            )
            db.session.add(new_playlist)
            db.session.commit()

            return new_playlist.to_dict()
    print(form.errors)

    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400


@playlist_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_playlist(id):
    """
    Delete a Playlist By Id.
    """
    playlist = Playlist.query.get(id)

    if playlist is None:
        return {'errors': {'message':'Playlist not found'}}, 404
    elif playlist.user_id != current_user.id:
        return {'errors': {'message':"Playlist does not belong to current user"}}, 403

    db.session.delete(playlist)
    db.session.commit()
    return {'message': 'Successfully Deleted'}


@playlist_routes.route('/<int:playlistId>/songs/<int:songId>')
@login_required
def add_song_to_playlist(playlistId, songId):
    """
    Adds like to a selected song. Returns likes for the song as a list of like dictionaries.
    """
    song = Song.query.get(songId)
    playlist = Playlist.query.get(playlistId)

    if song in playlist.songs_on_playlist:
        return { "errors": {"message" : "Song already on playlist"} }, 405

    playlist.songs_on_playlist.append(song)

    db.session.commit()
    return playlist.to_dict()


@playlist_routes.route('/<int:playlistId>/songs/<int:songId>/remove')
@login_required
def remove_song_to_playlist(playlistId, songId):
    """
    Adds like to a selected song. Returns likes for the song as a list of like dictionaries.
    """
    song = Song.query.get(songId)
    playlist = Playlist.query.get(playlistId)

    if song not in playlist.songs_on_playlist:
        return { "errors": {"message" : "Song not in playlist"} }, 405

    idx = playlist.songs_on_playlist.index(song)
    playlist.songs_on_playlist.pop(idx)

    db.session.commit()
    return playlist.to_dict()
