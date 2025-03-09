import os
import sys

# Ajouter le répertoire du projet au PYTHONPATH
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, "../.."))
sys.path.insert(0, project_root)

# Définir l'environnement pour Netlify
os.environ['NETLIFY'] = 'true'
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ec.settings")

# Importer après avoir défini l'environnement
from mangum import Mangum
from ec.wsgi import application

# Handler function pour Netlify
def handler(event, context):
    # Pour le débogage
    print("Received event:", event)
    
    # Configurer le chemin de base pour les fichiers statiques
    if 'path' in event and event['path'].startswith('/static/'):
        print("Static file request:", event['path'])
    
    # Retourner la réponse de l'application Django
    return Mangum(application, lifespan="off")(event, context)
