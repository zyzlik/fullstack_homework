from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-v1/', include('api_v1.urls')),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns.append(url(r'^__debug__/', include(debug_toolbar.urls)))