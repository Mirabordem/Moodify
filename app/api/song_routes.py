from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Song, likes
from app.forms import EditSongForm, CreateSongForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.api.aws_helpers import remove_file_from_s3
from icecream import ic

song_routes = Blueprint('song', __name__)



@song_routes.route('/new', methods=['POST'])
@login_required
def create_new_song():
    """
    Creates a new song. Returns a song dictionary.
    """
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_song = Song(
            name = form.data['name'],
            album_id = form.data['album_id'],
            track_number = form.data['track_number'],
            audio_url = form.data['audio_url'],
            song_length = form.data['song_length']
        )

        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    """
    Edits a song. Returns a new song dictionary.
    """
    form = EditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        current_song = Song.query.get(id)

        current_song.name = form.data['name'],
        current_song.album_id = form.data['album_id'],
        current_song.track_number = form.data['track_number'],
        current_song.audio_url = form.data['audio_url'],
        current_song.song_length = form.data['song_length']

        db.session.commit()

        return current_song.to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@song_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_song(id):
    """
    Deletes a song.
    """
    selected_song = Song.query.get(id)

    if selected_song.to_dict()['user_id'] != current_user.id:
        return { 'errors': 'Song not found' }, 404

    remove_file_from_s3(selected_song.to_dict()['audio_url'])

    db.session.delete(selected_song)
    db.session.commit()

    return { 'message': 'Deleted Successfully' }





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
