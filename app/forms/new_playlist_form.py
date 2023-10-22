from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired



class CreatePlaylistForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    cover_image_url = StringField("Cover Image Url")
    description = StringField("Description")
    submit = SubmitField("Submit")
