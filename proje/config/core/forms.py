from django import forms
from .models import DeliveryPoint


class DeliveryPointForm(forms.ModelForm):
    class Meta:
        model = DeliveryPoint
        fields = [
            "name",
            "address",
            "city",
            "latitude",
            "longitude",
        ]
