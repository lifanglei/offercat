import random
from os import SEEK_END
from io import BytesIO
from time import gmtime, strftime
from rest_framework import serializers
from django.core.files.uploadedfile import InMemoryUploadedFile
from pydenticon import Generator
import PIL


def get_default_image():
    # TODO: change the random generator
    width = 200
    height = 200
    padding = [20, 20, 20, 20]
    foreground = ["rgb(45,79,255)",
                  "rgb(254,180,44)",
                  "rgb(226,121,234)",
                  "rgb(30,179,253)",
                  "rgb(232,77,65)",
                  "rgb(49,203,115)",
                  "rgb(141,69,170)"]
    background = "rgb(224,224,224)"
    generator = Generator(5, 5, foreground=foreground, background=background)
    basestr = strftime("%H-%M-%S", gmtime()) + "-" + str(random.uniform(0, 59))
    raw_image = generator.generate(basestr, width, height, padding=padding)
    image_stream = BytesIO(raw_image)
    image = PIL.Image.open(image_stream)
    image_io = BytesIO()
    image.save(image_io, format='PNG')

    # Create a new Django file-like object to be used in models as ImageField using
    # InMemoryUploadedFile.  If you look at the source in Django, a
    # SimpleUploadedFile is essentially instantiated similarly to what is shown here
    image__in_memory_uploaded_file = InMemoryUploadedFile(image_io, None, 'avatar.png', 'image/png',
                                                      image_io.seek(0, SEEK_END),
                                                      None)
    # give your file to InMemoryUploadedFile to create django imagefield object
    return image__in_memory_uploaded_file


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(instance.uuid, ext)
    print(instance.pk)
    print(instance.__dict__)
    return '{0}/{1}'.format(type(instance).__name__.lower(), filename)

def resume_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    ext = filename.split('.')[-1]
    # filename = '{}.{}'.format(instance.user.uuid, ext)
    print(instance.pk)
    print(instance.__dict__)
    return '{0}/{1}/{2}'.format(type(instance).__name__.lower(),instance.user.uuid,filename)

def validate_file_extension(value):
    import os
    from django.core.exceptions import ValidationError
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls']
    if not ext.lower() in valid_extensions:
        raise ValidationError(u'文件格式不支持！')

def validate_resume_extension(value):
    import os
    from django.core.exceptions import ValidationError
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.doc', '.docx',]
    if not ext.lower() in valid_extensions:
        raise ValidationError(u'文件格式不支持！')


class ChoicesDisplayField(serializers.ChoiceField):
    def to_representation(self, value):
        """Used while retrieving value for the field."""
        return self._choices[value]