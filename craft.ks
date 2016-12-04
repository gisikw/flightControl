// Example kOS Script

function serialize {
  parameter data.
  local result is "".
  for key in data:keys {
    set result to result + key + "|" + data[key] + "|".
  }
  return result:substring(0, result:length - 1).
}

function data {
  return lex(
    "altitude", altitude,
    "apoapsis", apoapsis,
    "periapsis", periapsis,
    "timeToApoapsis", eta:apoapsis,
    "timeToPeriapsis", eta:periapsis,
    "heightFromTerrain", alt:radar,
    "inclination", ship:obt:inclination,
    "orbitalVelocity", ship:obt:velocity:orbit:mag,
    "surfaceVelocity", ship:obt:velocity:surface:mag
  ).
}

until 0 {
  open("0:/test.log"):writeln(serialize(data())).
  wait 1.
}
