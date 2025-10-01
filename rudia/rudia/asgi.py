"""
ASGI config for rudia project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.backend.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rudia.settings')

application = get_asgi_application()
