from rest_framework import serializers
from .models import Maloprodaja

class MaloprodajaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maloprodaja
        fields = '__all__'