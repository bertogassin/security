//! Конфигурация сервера. Один источник — env, без раздувания.

use std::env;

/// Параметры запуска API. Порт и хост — из переменных или умолчания.
#[derive(Debug, Clone)]
pub struct Config {
    pub host: String,
    pub port: u16,
}

impl Config {
    pub fn from_env() -> Self {
        let host = env::var("SECURITY_HOST").unwrap_or_else(|_| "0.0.0.0".into());
        let port = env::var("SECURITY_PORT")
            .ok()
            .and_then(|p| p.parse().ok())
            .unwrap_or(8080);
        Self { host, port }
    }

    pub fn socket_addr(&self) -> std::net::SocketAddr {
        format!("{}:{}", self.host, self.port)
            .parse()
            .expect("valid host:port")
    }
}
