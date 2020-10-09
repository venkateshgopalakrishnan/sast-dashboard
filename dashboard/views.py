import json

from django.core import serializers
from django.forms.models import model_to_dict, ValidationError
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import ScanResult


def index(request):
    return render(request, "build/index.html")


# Add a scan result to database
@csrf_exempt
def add_scan_result(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            status_time = {data['status']: data['status_time']}
            findings = data.get('findings')
        except (json.decoder.JSONDecodeError, TypeError) as e:
            return HttpResponseBadRequest(f'Error parsing JSON object - {e}')
        try:
            scan_result = ScanResult.objects.create(repo_name=data['repo_name'], status=data['status'],
                                                    findings=findings, queued_at=status_time.get('Queued'),
                                                    scanning_at=status_time.get("In Progress"),
                                                    finished_at=status_time.get("Success") or status_time.get(
                                                        "Failure"))
        except TypeError as e:
            return HttpResponseBadRequest(f'Error adding result in database - {e}')
        return HttpResponse()

# returns all available scan results as a json object
def get_all_scan_results(request):
    try:
        scan_results_list = serializers.serialize("json", ScanResult.objects.all())
    except serializers.BadSerializer as e:
        return HttpResponseBadRequest(f'Error adding object to Model - {e}')
    return HttpResponse(scan_results_list)

# returns particular scan result based on id as a json object
def get_scan_result_by_id(request, id):
    try:
        scan_result = model_to_dict(ScanResult.objects.get(pk=id))
    except ValidationError as e:
        return HttpResponseBadRequest(f'Error getting result by id - {e}')
    return HttpResponse(json.dumps(scan_result, indent=4, sort_keys=True, default=str))
