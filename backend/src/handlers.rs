//! Обработчики HTTP. Вся логика ответов — здесь; main только собирает роутер.

use axum::{extract::Path, extract::Query, Json};
use security_core::{Guard, GuardDiscovery, GeoService, Specialization, VerificationLevel};
use serde::Deserialize;
use chrono::Utc;

#[derive(Debug, Deserialize)]
pub struct NearbyQuery {
    pub latitude: f64,
    pub longitude: f64,
    pub radius_km: Option<f64>,
    pub limit: Option<u32>,
}

pub async fn health() -> &'static str {
    "OK"
}

pub async fn list_guards() -> Json<serde_json::Value> {
    let guards = mock_guards();
    Json(serde_json::json!({
        "guards": guards.iter().map(|g| guard_json(g, None)).collect::<Vec<_>>(),
        "total": guards.len()
    }))
}

pub async fn get_guard(Path(id): Path<i64>) -> Result<Json<serde_json::Value>, axum::http::StatusCode> {
    let guards = mock_guards();
    let guard = guards.into_iter().find(|g| g.id == id);
    match guard {
        Some(g) => Ok(Json(guard_json(&g, None))),
        None => Err(axum::http::StatusCode::NOT_FOUND),
    }
}

pub async fn nearby_guards(Query(q): Query<NearbyQuery>) -> Json<serde_json::Value> {
    let radius = q.radius_km.unwrap_or(10.0);
    let guards = mock_guards();
    let ranked = GuardDiscovery::find_nearby(guards, q.latitude, q.longitude, radius, None);
    let limit = q.limit.unwrap_or(20) as usize;
    let list: Vec<_> = ranked
        .into_iter()
        .take(limit)
        .map(|r| {
            let mut j = guard_json(&r.guard, Some(r.distance_km));
            j["distance_km"] = serde_json::json!(r.distance_km);
            j["score"] = serde_json::json!(r.score);
            j
        })
        .collect();
    let bbox = GeoService::get_bounding_box(q.latitude, q.longitude, radius);
    Json(serde_json::json!({
        "guards": list,
        "center": { "latitude": q.latitude, "longitude": q.longitude },
        "radius_km": radius,
        "bounding_box": bbox
    }))
}

fn mock_guards() -> Vec<Guard> {
    let now = Utc::now();
    vec![
        Guard {
            id: 1,
            user_id: 1,
            name: "Алексей Охранников".into(),
            phone: "+77071234567".into(),
            avatar_url: None,
            verification_level: VerificationLevel::Premium,
            rating: 4.8,
            total_reviews: 50,
            total_orders: 100,
            completed_orders: 98,
            latitude: 43.24,
            longitude: 76.95,
            is_available: true,
            is_online: true,
            specializations: vec![Specialization::Bodyguard, Specialization::EventSecurity],
            hourly_rate: 5000,
            experience_years: 5,
            created_at: now,
            last_active: now,
        },
        Guard {
            id: 2,
            user_id: 2,
            name: "Дмитрий Сторожев".into(),
            phone: "+77079876543".into(),
            avatar_url: None,
            verification_level: VerificationLevel::Standard,
            rating: 4.5,
            total_reviews: 30,
            total_orders: 60,
            completed_orders: 58,
            latitude: 43.25,
            longitude: 76.96,
            is_available: true,
            is_online: true,
            specializations: vec![Specialization::PropertyPatrol, Specialization::CctvOperator],
            hourly_rate: 4000,
            experience_years: 3,
            created_at: now,
            last_active: now,
        },
    ]
}

fn mock_orders() -> Vec<serde_json::Value> {
    vec![
        serde_json::json!({
            "id": "1",
            "status": "in_progress",
            "service_type": "bodyguard",
            "address": "ул. Абая 150, Алматы",
            "price": 16000,
            "created_at": "2026-02-16T10:00:00Z",
            "guard": { "name": "Алексей П.", "rating": 4.9, "phone": "+77071234567" }
        }),
        serde_json::json!({
            "id": "2",
            "status": "completed",
            "service_type": "event_security",
            "address": "Дворец Республики, Алматы",
            "price": 48000,
            "created_at": "2026-02-15T14:00:00Z",
            "guard": { "name": "Дмитрий К.", "rating": 4.7, "phone": "+77079876543" }
        }),
        serde_json::json!({
            "id": "3",
            "status": "new",
            "service_type": "property_patrol",
            "address": "КП Жетысу, Алматы",
            "price": 9000,
            "scheduled_at": "2026-02-18T09:00:00Z",
            "created_at": "2026-02-16T11:30:00Z"
        }),
    ]
}

pub async fn list_orders() -> Json<serde_json::Value> {
    let orders = mock_orders();
    Json(serde_json::json!({ "orders": orders }))
}

pub async fn get_order(Path(id): Path<String>) -> Result<Json<serde_json::Value>, axum::http::StatusCode> {
    let orders = mock_orders();
    let order = orders.into_iter().find(|o| o.get("id").and_then(|v| v.as_str()) == Some(id.as_str()));
    match order {
        Some(o) => Ok(Json(o)),
        None => Err(axum::http::StatusCode::NOT_FOUND),
    }
}

fn guard_json(g: &Guard, distance_km: Option<f64>) -> serde_json::Value {
    let mut j = serde_json::json!({
        "id": g.id,
        "name": g.name,
        "phone": g.phone,
        "completed_orders": g.completed_orders,
        "avatar_url": g.avatar_url,
        "verification_level": format!("{:?}", g.verification_level).to_lowercase(),
        "rating": g.rating,
        "total_reviews": g.total_reviews,
        "latitude": g.latitude,
        "longitude": g.longitude,
        "is_available": g.is_available,
        "is_online": g.is_online,
        "hourly_rate": g.hourly_rate,
        "experience_years": g.experience_years,
        "specializations": g.specializations.iter().map(|s| format!("{:?}", s).to_lowercase()).collect::<Vec<_>>()
    });
    if let Some(d) = distance_km {
        j["distance_km"] = serde_json::json!(d);
    }
    j
}
