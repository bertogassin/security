//! Security Core — guard discovery, ranking, geo.
//! Онлайн охранник сразу находится.

pub mod geo;
pub mod guards;

pub use geo::GeoService;
pub use guards::{Guard, GuardDiscovery, GuardFilters, RankedGuard, Specialization, VerificationLevel};

pub const VERSION: &str = env!("CARGO_PKG_VERSION");
