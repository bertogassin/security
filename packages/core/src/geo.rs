//! Geolocation — distance, geofence, bounding box.

use serde::{Deserialize, Serialize};
use std::f64::consts::PI;

const EARTH_RADIUS_KM: f64 = 6371.0;

pub struct GeoService;

impl GeoService {
    pub fn calculate_distance(lat1: f64, lng1: f64, lat2: f64, lng2: f64) -> f64 {
        let lat1_rad = lat1.to_radians();
        let lat2_rad = lat2.to_radians();
        let delta_lat = (lat2 - lat1).to_radians();
        let delta_lng = (lng2 - lng1).to_radians();
        let a = (delta_lat / 2.0).sin().powi(2)
            + lat1_rad.cos() * lat2_rad.cos() * (delta_lng / 2.0).sin().powi(2);
        let c = 2.0 * a.sqrt().asin();
        EARTH_RADIUS_KM * c
    }

    pub fn point_in_geofence(
        point_lat: f64,
        point_lng: f64,
        center_lat: f64,
        center_lng: f64,
        radius_km: f64,
    ) -> bool {
        Self::calculate_distance(point_lat, point_lng, center_lat, center_lng) <= radius_km
    }

    pub fn get_bounding_box(center_lat: f64, center_lng: f64, radius_km: f64) -> BoundingBox {
        let lat_delta = (radius_km / EARTH_RADIUS_KM) * (180.0 / PI);
        let lng_delta = lat_delta / center_lat.to_radians().cos();
        BoundingBox {
            min_lat: center_lat - lat_delta,
            max_lat: center_lat + lat_delta,
            min_lng: center_lng - lng_delta,
            max_lng: center_lng + lng_delta,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BoundingBox {
    pub min_lat: f64,
    pub max_lat: f64,
    pub min_lng: f64,
    pub max_lng: f64,
}
