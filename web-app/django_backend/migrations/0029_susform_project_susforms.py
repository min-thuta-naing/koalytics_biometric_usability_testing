# Generated by Django 4.2.20 on 2025-04-03 08:12

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("django_backend", "0028_rename_context_text_project_consent_text"),
    ]

    operations = [
        migrations.CreateModel(
            name="SUSForm",
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
                ("susform_title", models.CharField(max_length=200)),
                ("susform_description", models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name="project",
            name="susforms",
            field=models.ManyToManyField(
                blank=True, related_name="projects", to="django_backend.susform"
            ),
        ),
    ]
