from django.db.models import Prefetch

from rest_framework.generics import ListAPIView

from products.models import Product, InventoryItem
from .serializers import ProductSerializer


class ProductView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        prefetch = Prefetch('inventoryitem_set', queryset=InventoryItem.objects.select_related('style'))
        return Product.objects.prefetch_related(prefetch)
