from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Playlist
from app.forms import CreatePlaylistForm
from app.api.auth_routes import validation_errors_to_error_messages


playlist_routes = Blueprint('playlists', __name__)



@playlist_routes.route('/new', methods=['POST'])
@login_required
def create_new_playlist():
    """
    Creates a new playlist. Returns a playlist dictionary.
    """
    form = CreatePlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_playlist = Playlist(
            name = form.data['name'],
            cover_image_url = form.data['cover_image_url'],
            description = form.data['description'],
            user_id = current_user.id
        )

        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()

    return { 'errors': validation_errors_to_error_messages(form.errors)}, 400





@playlist_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_playlist(id):
    """
    Delete a Playlist By Id.
    """
    playlist = Playlist.query.get(id)

    if playlist is None:
        return {'errors': 'Playlist not found'}, 404
    elif playlist.user_id != current_user.id:
        return {"errors": "Playlist does not belong to current user"}, 403

    db.session.delete(playlist)
    db.session.commit()
    return {'message': 'Successfully Deleted'}
