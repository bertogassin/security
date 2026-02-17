//! Security API — точка входа. Роутинг и конфиг — в модулях, без перегруза.

mod config;
mod handlers;

use axum::routing::get;
use axum::Router;
use config::Config;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    let cfg = Config::from_env();
    let app = Router::new()
        .route("/guards", get(handlers::list_guards))
        .route("/guards/nearby", get(handlers::nearby_guards))
        .route("/guards/:id", get(handlers::get_guard))
        .route("/orders", get(handlers::list_orders))
        .route("/orders/:id", get(handlers::get_order))
        .route("/healthz", get(handlers::health));
    let addr = cfg.socket_addr();
    tracing::info!("Security API on http://{}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.expect("bind");
    axum::serve(listener, app).await.expect("serve");
}
