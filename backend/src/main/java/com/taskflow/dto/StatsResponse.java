package com.taskflow.dto;
public record StatsResponse(long total, long todo, long inProgress, long done, int progressPercent) {}
