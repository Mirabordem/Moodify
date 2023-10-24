from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired



class EditPlaylistForm(FlaskForm):
    name = StringField("Name")
    cover_image_url = FileField("Cover Image Url")
    description = StringField("Description")
