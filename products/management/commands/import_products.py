import csv
import os

from django.core.management import BaseCommand
from django.conf import settings

from products.models import Product, InventoryItem, Style


class Command(BaseCommand):

    help = 'load products data from products.csv'

    PRODUCTS_DATA_FILE_PATH = os.path.join(settings.BASE_DIR, 'products.csv')
    INVENTORY_DATA_FILE_PATH = os.path.join(settings.BASE_DIR, 'inventory.csv')
    style_names = {}

    def handle(self, *args, **kwargs):
        product_instances = []
        inventory_instances = []
        with open(self.PRODUCTS_DATA_FILE_PATH, 'r') as f:
            reader = self._open_reader(f)
            for row in reader:
                product_instances.append(self._create_product(row))
        with open(self.INVENTORY_DATA_FILE_PATH) as f:
            reader = self._open_reader(f)
            for row in reader:
                inventory_instances.append(self._create_inventory(row))
        Product.objects.bulk_create(product_instances)
        InventoryItem.objects.bulk_create(inventory_instances)


    def _open_reader(self, f):
        reader = csv.reader(f)
        next(reader)
        return reader

    def _create_product(self, data):
        product_id, name, image, *description = data
        description = ''.join(description)
        product = Product(
            id=product_id,
            name=name,
            image=image,
            description=description
        )
        return product

    def _create_inventory(self, data):
        product_id, waist, length, style_name, count = data
        style = self.style_names.get(style_name)
        if style is None:
            style, created = Style.objects.update_or_create(name=style_name.strip())
            self.style_names[style_name] = style

        inventory_item = InventoryItem(
            product_id=product_id,
            waist=int(waist),
            length=int(length),
            style=style,
            count=int(count)
        )
        return inventory_item
