from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Maloprodaja
from .serializers import MaloprodajaSerializer

def hello_world(request):
    return Response({'message': 'radi!'})



@api_view(['GET'])
def test_api(request):
    return Response({"message": "Hello from Django!"})


@api_view(['GET'])
def get_maloprodaja(request):
    data = Maloprodaja.objects.all()
    serialized = MaloprodajaSerializer(data, many=True)
    return Response(serialized.data)