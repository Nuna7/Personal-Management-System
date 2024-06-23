from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("api.urls")),
    path("external_services/", include("external_services.urls")),
    path("internal_services/",include("internal_services.urls"))
] 