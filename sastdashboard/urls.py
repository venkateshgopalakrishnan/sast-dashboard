"""sastdashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from dashboard import views as dashboard

urlpatterns = [
    path("", dashboard.index, name="index"),
    path('add-result/', dashboard.add_scan_result, name='add_scan_result'),
    path('get-all-results/', dashboard.get_all_scan_results, name='get_all_scan_results'),
    path('get-result/<int:id>', dashboard.get_scan_result_by_id, name='get_scan_result_by_id'),
    path('admin/', admin.site.urls),
]
