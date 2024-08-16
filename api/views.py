from django.shortcuts import render
from rest_framework.response import Response
from .api_venue_details import api_venue_details
from rest_framework.decorators import api_view

@api_view(['POST'])
def api_venues(request):
    data = request.data
    result = api_venue_details(data)
    return Response(result)
