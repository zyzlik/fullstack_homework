from rest_framework import serializers

from products.models import Product, InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    style = serializers.CharField(source='style.name')

    class Meta:
        model = InventoryItem
        fields = ('style', 'waist', 'length', 'count')


class ProductSerializer(serializers.ModelSerializer):
    inventory = InventoryItemSerializer(source='get_inventory', many=True)

    class Meta:
        model = Product
        fields = ('name', 'image', 'description', 'inventory')
