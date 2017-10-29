from django.db import models


class List(models.Model):
    name = models.CharField(max_length=100)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.name


class Item(models.Model):
    list = models.ForeignKey('List', related_name='items')
    text = models.TextField()
    done = models.BooleanField(default=False)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.text
