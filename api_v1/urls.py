from django.conf.urls import url

from .views import ProductView


urlpatterns = [
    url(r'^products/$', ProductView.as_view(), name='products')
]