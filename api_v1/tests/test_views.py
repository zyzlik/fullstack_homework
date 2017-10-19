import json

from django.urls import reverse

from rest_framework.test import APITestCase

from products.models import Product, InventoryItem, Style
from api_v1.serializers import InventoryItemSerializer

class ProductAPITests(APITestCase):

    def setUp(self):
        Style.objects.get_or_create(id=1, name="style one")
        Style.objects.get_or_create(id=2, name="style two")
        Product.objects.get_or_create(
            id=1,
            name='jeans for test',
            image='https://bonobos-prod-s3.imgix.net/products/45563/original/Bottoms_Denim_19430_BLU36_hero1.jpg',
            description='jeans created specifically for testing purposes'
        )
        Product.objects.get_or_create(
            id=2,
            name='pants for test',
            image='https://bonobos-prod-s3.imgix.net/products/42047/original/oyzjif8t7ykc13r2zvd5cgincuo28hvb.jpg',
            description='pants created specifically for testing purposes'
        )
        InventoryItem.objects.get_or_create(
            id=1,
            product_id=1,
            style_id=1,
            waist=26,
            length=32,
            count=10
        )
        InventoryItem.objects.get_or_create(
            product_id=1,
            style_id=1,
            waist=27,
            length=32,
            count=15
        )
        InventoryItem.objects.get_or_create(
            product_id=1,
            style_id=2,
            waist=27,
            length=32,
            count=33
        )
        InventoryItem.objects.get_or_create(
            product_id=2,
            style_id=1,
            waist=28,
            length=34,
            count=3
        )
        InventoryItem.objects.get_or_create(
            product_id=2,
            style_id=1,
            waist=28,
            length=30,
            count=23
        )
        InventoryItem.objects.get_or_create(
            product_id=2,
            style_id=2,
            waist=27,
            length=32,
            count=80
        )

        self.url = reverse('products')

    def test_response(self):
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, 200)

    def test_data_type(self):
        response = self.client.get(self.url)
        self.assertIsInstance(response.data, list)

    def test_data_len(self):
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)

    def test_data_content(self):
        response = self.client.get(self.url)
        product = Product.objects.get(pk=1)
        p = response.data[0]
        self.assertEqual(product.id, p['id'])
        self.assertEqual(product.name, p['name'])
        self.assertEqual(product.description, p['description'])
        self.assertEqual(product.image, p['image'])
        self.assertEqual(product.inventoryitem_set.count(), len(p['inventory']))

    def test_inventory_data(self):
        response = self.client.get(self.url)
        first_product_inventory = response.data[0]['inventory']
        self.assertIsInstance(first_product_inventory, list)

    def test_inventory_object_type(self):
        response = self.client.get(self.url)
        inventory = response.data[0]['inventory'][0]
        self.assertIsInstance(inventory, dict)

    def test_inventory_object_fields(self):
        fields = InventoryItemSerializer().get_fields()
        response = self.client.get(self.url)
        inventory = response.data[0]['inventory'][0]
        for field in fields:
            self.assertIn(field, inventory)

    def test_inventory_object_fields_data(self):
        inv = InventoryItem.objects.get(pk=1)
        response = self.client.get(self.url)
        inventory = response.data[0]['inventory'][0]
        self.assertEquals(inv.style.name, inventory['style'])
        self.assertEquals(inv.waist, inventory['waist'])
        self.assertEquals(inv.length, inventory['length'])
        self.assertEquals(inv.count, inventory['count'])

