from django.conf import settings
from django.db import models
from cryptography.fernet import Fernet
import base64

class EncryptedField(models.TextField):
    def __init__(self, *args, **kwargs):
        self.key = base64.urlsafe_b64encode(settings.SECRET_KEY[:32].encode())
        self.fernet = Fernet(self.key)
        super().__init__(*args, **kwargs)

    def get_prep_value(self, value):
        if value is None:
            return value
        return self.fernet.encrypt(value.encode()).decode()

    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        return self.fernet.decrypt(value.encode()).decode()

    def to_python(self, value):
        if value is None:
            return value
        try:
            return self.fernet.decrypt(value.encode()).decode()
        except:
            return value
