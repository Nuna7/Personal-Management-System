# Generated by Django 4.2.13 on 2024-06-20 15:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        (
            "external_services",
            "0003_remove_user_news_news_id_remove_user_news_user_id_and_more",
        ),
    ]

    operations = [
        migrations.DeleteModel(
            name="Calendar",
        ),
    ]