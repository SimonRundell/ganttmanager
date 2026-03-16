<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$taskId = (int) ($receivedData['task_id'] ?? 0);
$resourceId = (int) ($receivedData['resource_id'] ?? 0);
$projectId = (int) ($receivedData['project_id'] ?? 0);

if ($taskId <= 0 || $resourceId <= 0 || $projectId <= 0) {
    send_response('Task, resource, and project IDs required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('DELETE FROM task_resources WHERE task_id = ? AND resource_id = ?');
$stmt->bind_param('ii', $taskId, $resourceId);
$stmt->execute();

send_response('Assignment removed');
