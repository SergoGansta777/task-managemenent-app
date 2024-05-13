use axum::{
    http::{header::WWW_AUTHENTICATE, StatusCode},
    response::{IntoResponse, Response},
};

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("Authentication required")]
    Unauthorized,

    #[error("User may not perform that action")]
    Forbidden,

    #[error("Request path not found")]
    NotFound,

    #[error("An error occured with the database")]
    Sqlx(#[from] sqlx::Error),

    #[error("An internal server error occured")]
    Anyhow(#[from] anyhow::Error),
}

impl Error {
    fn status_code(&self) -> StatusCode {
        match self {
            Self::Unauthorized => StatusCode::UNAUTHORIZED,
            Self::Forbidden => StatusCode::FORBIDDEN,
            Self::NotFound => StatusCode::NOT_FOUND,
            Self::Sqlx(_) | Self::Anyhow(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        match self {
            Self::Unauthorized => {
                return (
                    self.status_code(),
                    [(WWW_AUTHENTICATE, "Token")],
                    self.to_string(),
                )
                    .into_response();
            }
            Self::Sqlx(ref e) => {
                log::error!("Sqlx error: {:?}", e);
            }
            Self::Anyhow(ref e) => {
                log::error!("Generic error: {:?}", e);
            }
            _ => (),
        }

        (self.status_code(), self.to_string()).into_response()
    }
}
