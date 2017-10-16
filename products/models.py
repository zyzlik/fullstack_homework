from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Product name")
    image = models.URLField(verbose_name="Image url")
    description = models.TextField("Descripton")

    def get_inventory(self):
        return self.inventoryitem_set.all()


class Style(models.Model):
    name = models.CharField(max_length=255, verbose_name="Style name", unique=True)


class InventoryItem(models.Model):
    product = models.ForeignKey('products.Product', verbose_name="Product")
    style = models.ForeignKey('products.Style')
    waist = models.PositiveSmallIntegerField('Waist', db_index=True)
    length = models.PositiveSmallIntegerField('Length', db_index=True)
    count = models.PositiveIntegerField('Count', default=0)
