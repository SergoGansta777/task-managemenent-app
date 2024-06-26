# Builder stage
FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef
WORKDIR /app
RUN apt update && apt install lld clang -y

ENV SQLX_OFFLINE true

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
COPY . .
RUN cargo build --release --bin task-management_backend
RUN cargo install sqlx-cli --no-default-features --features postgres

# Runtime stage
FROM debian:bookworm-slim AS runtime
WORKDIR /app

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/task-management_backend ./task_management_backend
COPY --from=builder /usr/local/cargo/bin/sqlx /usr/local/bin/sqlx

EXPOSE 8080

ENTRYPOINT ["/bin/bash", "-c", "sqlx database create && ./task_management_backend"]
