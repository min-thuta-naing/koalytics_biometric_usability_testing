# Generated by Django 4.2.20 on 2025-04-20 15:07

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("django_backend", "0038_susform_is_shared"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="susform",
            name="is_shared",
        ),
        migrations.AddField(
            model_name="project",
            name="is_shared",
            field=models.BooleanField(default=False),
        ),
    ]
