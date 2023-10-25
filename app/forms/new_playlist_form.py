from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import SubmitField, StringField,IntegerField
from wtforms.validators import DataRequired



class CreatePlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    cover_image_url = FileField("Cover Image Url")
    description = StringField("Description")
    user_id = IntegerField("UserId")
