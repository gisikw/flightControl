#!/bin/bash
# KSP Craft

echo "KSP Craft Running"
echo "-----------------"
rm log.txt

rand() {
  echo "$RANDOM / 32767" | bc -l
}

altitude=10
apoapsis=72
periapsis=-5
timeToApoapsis=40
timeToPeriapsis=90
heightFromTerrain=40
inclination=0.1
orbitalVelocity=150
surfaceVelocity=0.2
while true; do
  altitude=$(echo "$altitude + $(rand)" | bc)
  apoapsis=$(echo "$apoapsis + $(rand)" | bc)
  periapsis=$(echo "$periapsis + $(rand)" | bc)
  timeToApoapsis=$(echo "$timeToApoapsis + $(rand)" | bc)
  timeToPeriapsis=$(echo "$timeToPeriapsis + $(rand)" | bc)
  heightFromTerrain=$(echo "$heightFromTerrain + $(rand)" | bc)
  inclination=$(echo "$inclination + $(rand)" | bc)
  orbitalVelocity=$(echo "$orbitalVelocity + $(rand)" | bc)
  surfaceVelocity=$(echo "$surfaceVelocity + $(rand)" | bc)
  echo "altitude|$altitude|apoapsis|$apoapsis|periapsis|$periapsis|timeToApoapsis|$timeToApoapsis|timeToPeriapsis|$timeToPeriapsis|heightFromTerrain|$heightFromTerrain|inclination|$inclination|orbitalVelocity|$orbitalVelocity|surfaceVelocity|$surfaceVelocity" | tee -a log.txt
  sleep 0.2
done
