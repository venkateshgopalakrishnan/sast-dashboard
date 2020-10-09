from django.db import models


# Object Relationship Model for storing Scan Result to Database
class ScanResult(models.Model):
    QUEUED = "QUEUED"
    IN_PROGRESS = "IN_PROGRESS"
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"
    # making a dictionary of choices for status field to accordingly update
    status_choices = [(QUEUED, "Queued"), (IN_PROGRESS, "In Progress"), (SUCCESS, "Success"),
                      (FAILURE, "Failure")]
    status = models.CharField(max_length=11, choices=status_choices, default=QUEUED)
    repo_name = models.CharField(max_length=30, null=False)
    # storing findings as a json directly as the content may vary based on the status
    findings = models.JSONField(null=False)
    # time at which the status was updated - will be sent by the client
    # assumption is that only onw timestamp out of the below three would be updated at a time, may be extended
    # to update more than one timestamp in the future
    queued_at = models.DateTimeField(null=True)
    scanning_at = models.DateTimeField(null=True)
    finished_at = models.DateTimeField(null=True)
