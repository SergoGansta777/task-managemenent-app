# Builder stage
FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef
WORKDIR /app
RUN apt update && apt install lld clang -y

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json
COPY . .


# Prepare the SQLx query cache
RUN cargo install sqlx-cli --no-default-features --features postgres
RUN cargo sqlx prepare -- --bin task-management_backend
ENV SQLX_OFFLINE true

# Run database creation and migrations
RUN cargo sqlx database create
RUN cargo sqlx migrate run

RUN cargo build --release --bin task-management_backend

# Runtime stage
FROM debian:bookworm-slim AS runtime
WORKDIR /app

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/target/release/task-management_backend task-management_backend
ENTRYPOINT ["./target/release/task_management_backend"]
