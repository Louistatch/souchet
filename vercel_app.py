import os
from ec.wsgi import application
from whitenoise import WhiteNoise

# Configurer les variables d'environnement pour Vercel
os.environ['VERCEL'] = 'true'

# Wrapping the application with WhiteNoise
whitenoise_app = WhiteNoise(application)

# Add static file handling
whitenoise_app.add_files('staticfiles', prefix='static/')

# Add media file handling
if os.path.exists('media'):
    whitenoise_app.add_files('media', prefix='media/')

# Pour Vercel - point d'entrée de l'application
app = whitenoise_app
