#!/usr/bin/env python
import csv
import json

geojson = {"type": "FeatureCollection", "features": []}


class geojsonfeature:
    def __init__(
        self,
        name: str,
        category: list[str],
        url: str,
        longitude: float,
        latitude: float,
    ):
        self.data = {
            "type": "Feature",
            "properties": {"name": name, "category": category, "url": url},
            "geometry": {"type": "Point", "coordinates": [longitude, latitude]},
        }


def main():
    with open("sites.csv", newline="", encoding="utf-8-sig") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=",", quotechar='"')
        for row in reader:
            category = row["category"].split(" ")
            feature = geojsonfeature(
                row["name"], category, row["url"], row["longitude"], row["latitude"]
            )
            geojson["features"].append(feature.data)

    with open("geojsonFeatures.json", "w", encoding="utf-8") as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
