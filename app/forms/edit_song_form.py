from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired
from ..api.aws_helpers import ALLOWED_AUDIO_EXTENSIONS



class EditSongForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    album_id = IntegerField("Album Id", validators=[DataRequired()])
    track_number = IntegerField("Track Nr", validators=[DataRequired()])
    audio_url = FileField("Audio", validators=[FileAllowed(list(ALLOWED_AUDIO_EXTENSIONS)), FileRequired()])
    song_length = IntegerField("Duration", validators=[DataRequired()])
    
