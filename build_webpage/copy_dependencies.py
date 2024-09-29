import shutil
import os

# Clear folder an recreate
shutil.rmtree("webpage", ignore_errors=True)
os.makedirs("webpage")

# Leaflet
shutil.copytree("node_modules/leaflet/dist/", "webpage/leaflet/")

# Leaflet-ajax
shutil.copytree("node_modules/leaflet-ajax/dist/", "webpage/leaflet-ajax/")

# Leaflet-extra-markers
shutil.copytree(
    "node_modules/leaflet-extra-markers/dist/", "webpage/leaflet-extra-markers/"
)

# Fontawesome
shutil.copytree(
    "node_modules/@fortawesome/fontawesome-free/css/", "webpage/fontawesome/css/"
)
shutil.copytree(
    "node_modules/@fortawesome/fontawesome-free/webfonts/",
    "webpage/fontawesome/webfonts/",
)

# Assests
shutil.copy2("build_webpage/index.html", "webpage/index.html")
shutil.copy2("build_webpage/campsites.css", "webpage/campsites.css")
shutil.copy2("build_webpage/map.js", "webpage/map.js")
