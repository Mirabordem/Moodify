from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import SubmitField, StringField,IntegerField
from wtforms.validators import DataRequired, Length
from ..api.aws_helpers import ALLOWED_IMG_EXTENSIONS



class CreatePlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1,255)])
    cover_image_url = FileField("Cover Image Url")
    description = StringField("Description")
    user_id = IntegerField("UserId")
