//! Guards module — discovery, ranking. Онлайн охранник сразу находится.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::geo::GeoService;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum VerificationLevel {
    None = 0,
    Basic = 1,
    Standard = 2,
    Premium = 3,
    Elite = 4,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Guard {
    pub id: i64,
    pub user_id: i64,
    pub name: String,
    pub phone: String,
    pub avatar_url: Option<String>,
    pub verification_level: VerificationLevel,
    pub rating: f64,
    pub total_reviews: i32,
    pub total_orders: i32,
    pub completed_orders: i32,
    pub latitude: f64,
    pub longitude: f64,
    pub is_available: bool,
    pub is_online: bool,
    pub specializations: Vec<Specialization>,
    pub hourly_rate: i64,
    pub experience_years: i32,
    pub created_at: DateTime<Utc>,
    pub last_active: DateTime<Utc>,
}

impl Guard {
    pub fn calculate_score(&self, user_lat: f64, user_lng: f64) -> f64 {
        let distance = GeoService::calculate_distance(user_lat, user_lng, self.latitude, self.longitude);
        let distance_score = 40.0 / (1.0 + distance * 0.5);
        let rating_score = self.rating * 6.0;
        let verification_score = match self.verification_level {
            VerificationLevel::None => 0.0,
            VerificationLevel::Basic => 5.0,
            VerificationLevel::Standard => 8.0,
            VerificationLevel::Premium => 12.0,
            VerificationLevel::Elite => 15.0,
        };
        let experience_score = (self.experience_years as f64).min(10.0);
        let availability_bonus = if self.is_available && self.is_online { 5.0 } else { 0.0 };
        distance_score + rating_score + verification_score + experience_score + availability_bonus
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Specialization {
    Bodyguard,
    PropertyPatrol,
    EventSecurity,
    VehicleEscort,
    VipProtection,
    CctvOperator,
    K9Handler,
    FirearmsCertified,
    FirstAid,
    MartialArts,
}

pub struct GuardDiscovery;

impl GuardDiscovery {
    /// Find guards near a location — охранник сразу находится
    pub fn find_nearby(
        guards: Vec<Guard>,
        lat: f64,
        lng: f64,
        max_distance_km: f64,
        filters: Option<GuardFilters>,
    ) -> Vec<RankedGuard> {
        let mut results: Vec<RankedGuard> = guards
            .into_iter()
            .filter(|g| {
                let distance = GeoService::calculate_distance(lat, lng, g.latitude, g.longitude);
                if distance > max_distance_km {
                    return false;
                }
                if let Some(ref f) = filters {
                    if let Some(min_rating) = f.min_rating {
                        if g.rating < min_rating {
                            return false;
                        }
                    }
                    if f.available_only && !g.is_available {
                        return false;
                    }
                }
                true
            })
            .map(|g| {
                let distance = GeoService::calculate_distance(lat, lng, g.latitude, g.longitude);
                let score = g.calculate_score(lat, lng);
                RankedGuard {
                    guard: g,
                    distance_km: distance,
                    score,
                }
            })
            .collect();
        results.sort_by(|a, b| b.score.partial_cmp(&a.score).unwrap());
        results
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RankedGuard {
    pub guard: Guard,
    pub distance_km: f64,
    pub score: f64,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct GuardFilters {
    pub min_rating: Option<f64>,
    pub min_verification_level: Option<VerificationLevel>,
    pub specializations: Option<Vec<Specialization>>,
    pub max_hourly_rate: Option<i64>,
    pub available_only: bool,
}
