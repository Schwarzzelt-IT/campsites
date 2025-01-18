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
shutil.copy2("build_webpage/favicon.ico", "webpage/favicon.ico")
shutil.copy2("build_webpage/Bildmarke_Kothe.drawio.svg", "webpage/Bildmarke_Kothe.drawio.svg")
shutil.copy2("build_webpage/Logo_Kothe.drawio.svg", "webpage/Logo_Kothe.drawio.svg")
