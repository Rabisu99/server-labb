package com.musu.vertx.vertx

object Env {
  val isContainer = System.getenv("IS_CONTAINER") != null
  val dbHost = System.getenv("VERTX_DB_HOST") != null
}
