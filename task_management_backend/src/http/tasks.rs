use crate::http::extractor::AuthUser;
use crate::http::{ApiContext, Error, Result};
use axum::extract::{Path, State};
use axum::routing::{get, post, put};
use axum::{Json, Router};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

pub(crate) fn router() -> Router<ApiContext> {
    Router::new()
        .route("/api/tasks", post(create_task).get(get_all_tasks))
        .route(
            "/api/tasks/:id",
            get(get_task).put(update_task).delete(delete_task),
        )
        .route("/api/tasks/complete/:id", put(complete_task))
}

#[derive(Serialize, Deserialize)]
struct TaskBody<T> {
    task: T,
}

#[derive(Serialize, Deserialize)]
struct TasksBody<T> {
    tasks: Vec<T>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct NewTask {
    title: String,
    priority: String,
    label: String,
    status_id: i32,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct UpdateTask {
    id: Uuid,
    title: String,
    priority: String,
    label: String,
    status_id: i32,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Task {
    id: Uuid,
    title: String,
    priority: String,
    label: String,
    status_id: i32,
}

async fn create_task(
    auth_user: AuthUser,
    ctx: State<ApiContext>,
    Json(req): Json<TaskBody<NewTask>>,
) -> Result<Json<TaskBody<Task>>> {
    let task_id = sqlx::query_scalar!(
        r#"insert into task(title, priority, label, status_id, user_id)
        values
        ($1, $2, $3, $4, $5)
        returning id
        "#,
        req.task.title,
        req.task.priority,
        req.task.label,
        req.task.status_id,
        auth_user.user_id
    )
    .fetch_one(&ctx.db)
    .await?;

    Ok(Json(TaskBody {
        task: Task {
            id: task_id,
            title: req.task.title,
            priority: req.task.priority,
            label: req.task.label,
            status_id: req.task.status_id,
        },
    }))
}

async fn update_task(
    ctx: State<ApiContext>,
    Json(req): Json<TaskBody<UpdateTask>>,
) -> Result<Json<TaskBody<Task>>> {
    let updated_task = sqlx::query!(
        r#"
        update task
        set title = $1,
            priority = $2,
            label = $3,
            status_id = $4
        where id = $5
        returning id, title, priority, label, status_id
        "#,
        req.task.title,
        req.task.priority,
        req.task.label,
        req.task.status_id,
        req.task.id
    )
    .fetch_one(&ctx.db)
    .await?;

    Ok(Json(TaskBody {
        task: Task {
            id: updated_task.id,
            title: updated_task.title,
            label: updated_task.label.unwrap_or("".to_owned()),
            status_id: updated_task.status_id,
            priority: updated_task.priority.unwrap_or("1".to_owned()),
        },
    }))
}

async fn get_all_tasks(
    auth_user: AuthUser,
    ctx: State<ApiContext>,
) -> Result<Json<TasksBody<Task>>> {
    let db_tasks = sqlx::query!(
        r#"
        select id, title, label, status_id, priority
        from task
        where user_id = $1
        "#,
        auth_user.user_id
    )
    .fetch_all(&ctx.db)
    .await?;

    Ok(Json(TasksBody {
        tasks: db_tasks
            .iter()
            .map(|db_task| Task {
                id: db_task.id,
                title: db_task.title.clone(),
                priority: db_task.priority.clone().unwrap_or("".to_string()),
                label: db_task.label.clone().unwrap_or("".to_string()),
                status_id: db_task.status_id,
            })
            .collect::<Vec<Task>>(),
    }))
}

async fn get_task(Path(id): Path<Uuid>, ctx: State<ApiContext>) -> Result<Json<TaskBody<Task>>> {
    let optional_task = sqlx::query!(
        r#"
        select id, title, label, status_id, priority
        from task
        where id = $1
        "#,
        id
    )
    .fetch_optional(&ctx.db)
    .await?;

    let task = match optional_task {
        Some(task) => task,
        None => return Err(Error::NotFound),
    };

    Ok(Json(TaskBody {
        task: Task {
            id: task.id,
            title: task.title,
            priority: task.priority.unwrap_or("".to_string()),
            label: task.label.unwrap_or("".to_string()),
            status_id: task.status_id,
        },
    }))
}

async fn delete_task(
    Path(id): Path<Uuid>,
    auth_user: AuthUser,
    ctx: State<ApiContext>,
) -> Result<()> {
    let result = sqlx::query!(
        r#"
        with deleted_task as (
            delete from task
            where user_id = $1 and id = $2
            returning 1
        )
        select
            exists(select 1 from task where id = $2) "existed!",
            exists(select 1 from task) "deleted!"
    "#,
        auth_user.user_id,
        id
    )
    .fetch_one(&ctx.db)
    .await?;

    if result.deleted {
        Ok(())
    } else if result.existed {
        Err(Error::Forbidden)
    } else {
        Err(Error::NotFound)
    }
}

async fn complete_task(Path(id): Path<Uuid>, ctx: State<ApiContext>) -> Result<()> {
    let result = sqlx::query!(
        r#"
        update task
        set completed_at = now()
        where id = $1
        returning completed_at is not null as is_completed
    "#,
        id
    )
    .fetch_one(&ctx.db)
    .await?;

    if result.is_completed.unwrap_or(false) {
        Ok(())
    } else {
        Err(Error::Forbidden)
    }
}
