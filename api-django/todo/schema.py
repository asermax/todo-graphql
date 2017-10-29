import graphene
from graphene_django.types import DjangoObjectType

from . import models


class ListType(DjangoObjectType):
    class Meta:
        model = models.List


class ItemType(DjangoObjectType):
    class Meta:
        model = models.Item


class Query(object):
    list = graphene.Field(ListType, id=graphene.ID())
    lists = graphene.List(ListType)

    def resolve_list(self, info, id):
        return models.List.objects.get(pk=id)

    def resolve_lists(self, info, **kwargs):
        return models.List.objects.all()


class CreateList(graphene.Mutation):
    list = graphene.Field(ListType, required=True)

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, name):
        list = models.List.objects.create(name=name)

        return CreateList(list=list)


class DeleteList(graphene.Mutation):
    ok = graphene.Boolean(required=True)

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(self, info, id):
        delete_result = models.List.objects.filter(id=id).delete()

        return DeleteList(ok=delete_result[0] == 1)


class CreateItem(graphene.Mutation):
    item = graphene.Field(ItemType, required=True)

    class Arguments:
        list_id = graphene.ID(required=True)
        text = graphene.String(required=True)

    def mutate(self, info, list_id, text):
        item = models.Item.objects.create(list_id=list_id, text=text)

        return CreateItem(item=item)


class ChangeItemText(graphene.Mutation):
    item = graphene.Field(ItemType, required=True)

    class Arguments:
        id = graphene.ID(required=True)
        text = graphene.String(required=True)

    def mutate(self, info, id, text):
        item = models.Item.objects.get(id=id)
        item.text = text
        item.save()

        return ChangeItemText(item=item)


class ToggleItem(graphene.Mutation):
    item = graphene.Field(ItemType, required=True)

    class Arguments:
        id = graphene.ID(required=True)
        done = graphene.Boolean()

    def mutate(self, info, id, done=None):
        item = models.Item.objects.get(id=id)

        if done is not None:
            item.done = done
        else:
            item.done = not item.done

        item.save()

        return ToggleItem(item=item)


class DeleteItem(graphene.Mutation):
    ok = graphene.Boolean(required=True)

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(self, info, id):
        delete_result = models.Item.objects.filter(id=id).delete()

        return DeleteItem(ok=delete_result[0] == 1)


class Mutation(object):
    create_list = CreateList.Field()
    delete_list = DeleteList.Field()
    create_item = CreateItem.Field()
    change_item_text = ChangeItemText.Field()
    toggle_item = ToggleItem.Field()
    delete_item = DeleteItem.Field()
