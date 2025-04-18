# Generated by Django 5.1.3 on 2025-02-23 03:32

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("django_backend", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Hobby",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="hobbies",
            field=models.ManyToManyField(
                blank=True, related_name="users", to="django_backend.hobby"
            ),
        ),
    ]
